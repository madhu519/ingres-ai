import json
import os
import re
from pathlib import Path
from dotenv import load_dotenv
from groq import Groq
from google import genai
from causal_forecaster import INGRESTimesFMCausalEngine

# Load .env from script dir and cwd
load_dotenv()
load_dotenv(Path(__file__).resolve().parent / ".env")

GROQ_TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "simulate_water_policy",
            "description": "Forecasts baseline groundwater extraction using TimesFM 2.5 and simulates a counterfactual policy intervention.",
            "parameters": {
                "type": "object",
                "properties": {
                    "block_name": {"type": "string", "description": "Indian administrative block name (e.g., Nakodar, Bagalkot)"},
                    "intervention": {
                        "type": "string",
                        "enum": [
                            "crop_diversification_and_micro_irrigation",
                            "artificial_recharge_structures",
                            "power_subsidy_rationalization",
                        ],
                    },
                    "adoption_pct": {"type": "number", "description": "Adoption fraction from 0.05 to 1.0"},
                    "horizon_years": {"type": "integer", "description": "Forecast horizon in years (1 to 5)"},
                },
                "required": ["block_name", "intervention", "adoption_pct"],
            },
        },
    }
]

# Known blocks for keyword fallback extraction
KNOWN_BLOCKS = [
    "Nakodar", "Jalandhar", "Phagwara", "Kapurthala", "Sultanpur Lodhi",
    "Bagalkot", "Bijapur", "Vijayapura", "Hubli", "Dharwad",
    "Jaipur", "Ajmer", "Bikaner", "Jodhpur", "Kota",
    "Lucknow", "Kanpur", "Agra", "Allahabad", "Varanasi",
    "Patna", "Gaya", "Muzaffarpur", "Bhagalpur",
    "Bhopal", "Indore", "Gwalior", "Jabalpur",
    "Hyderabad", "Warangal", "Nizamabad", "Karimnagar",
    "Chennai", "Coimbatore", "Madurai", "Salem",
    "Pune", "Nashik", "Aurangabad", "Nagpur",
    "Delhi", "Faridabad", "Gurgaon",
    "Ahmedabad", "Surat", "Rajkot", "Vadodara",
]

INTERVENTION_KEYWORDS = {
    "crop_diversification_and_micro_irrigation": ["crop", "diversif", "micro", "drip", "sprinkler", "irrigation", "paddy", "wheat", "maize"],
    "artificial_recharge_structures": ["recharge", "check dam", "percolation", "pond", "borewell recharge", "injection"],
    "power_subsidy_rationalization": ["power", "subsidy", "electric", "tariff", "flat rate", "metering"],
}


def _keyword_extract_args(query: str, defaults: dict) -> dict:
    """Keyword-based fallback when Groq tool-calling fails."""
    q_lower = query.lower()
    result = defaults.copy()

    # Block name
    for block in KNOWN_BLOCKS:
        if block.lower() in q_lower:
            result["block_name"] = block
            break

    # Intervention
    best_intervention = None
    best_score = 0
    for intervention, keywords in INTERVENTION_KEYWORDS.items():
        score = sum(1 for kw in keywords if kw in q_lower)
        if score > best_score:
            best_score = score
            best_intervention = intervention
    if best_intervention and best_score > 0:
        result["intervention"] = best_intervention

    # Adoption percentage: look for patterns like "40%", "40 percent", "0.4"
    pct_match = re.search(r"(\d+)\s*%", query)
    frac_match = re.search(r"0\.\d+", query)
    if pct_match:
        result["adoption_pct"] = int(pct_match.group(1)) / 100.0
    elif frac_match:
        result["adoption_pct"] = float(frac_match.group(0))

    # Horizon years: look for "3 year", "5 years", etc.
    yr_match = re.search(r"(\d+)\s*year", query, re.IGNORECASE)
    if yr_match:
        result["horizon_years"] = max(1, min(5, int(yr_match.group(1))))

    return result


class HybridPolicyOrchestrator:
    def __init__(self, engine: INGRESTimesFMCausalEngine):
        self.engine = engine
        self.groq_api_key = os.environ.get("GROQ_API_KEY", "").strip()
        self.gemini_api_key = os.environ.get("GEMINI_API_KEY", "").strip()

        self.groq_client = Groq(api_key=self.groq_api_key) if self.groq_api_key else None
        self.gemini_client = genai.Client(api_key=self.gemini_api_key) if self.gemini_api_key else None

    def run(self, user_query: str) -> dict:
        defaults = {
            "block_name": "Nakodar",
            "intervention": "crop_diversification_and_micro_irrigation",
            "adoption_pct": 0.35,
            "horizon_years": 3,
        }

        args = defaults.copy()

        # 1. Fast intent & parameter extraction via Groq (tool calling)
        groq_succeeded = False
        if self.groq_client:
            try:
                groq_resp = self.groq_client.chat.completions.create(
                    model="llama-3.3-70b-versatile",   # ✅ Valid Groq model
                    messages=[
                        {
                            "role": "system",
                            "content": (
                                "You are a parameter extractor for a groundwater policy simulator. "
                                "Always call the simulate_water_policy tool with ALL required parameters. "
                                "If the user mentions a percentage, use it as adoption_pct (e.g., 40% → 0.40). "
                                "If no block is mentioned, use 'Nakodar'."
                            ),
                        },
                        {"role": "user", "content": user_query},
                    ],
                    tools=GROQ_TOOLS,
                    tool_choice="required",   # Force tool call
                    temperature=0.0,
                    max_tokens=512,
                )

                msg = groq_resp.choices[0].message
                print(f"[LLMRouter] Groq raw message: {msg}")
                if msg.tool_calls:
                    parsed_args = json.loads(msg.tool_calls[0].function.arguments)
                    args.update(parsed_args)
                    groq_succeeded = True
                    print(f"[LLMRouter] Groq extracted args: {args}")
                else:
                    print("[LLMRouter] Groq returned no tool calls; falling back to keyword extraction.")
            except Exception as e:
                print(f"[LLMRouter] Groq error: {e}; falling back to keyword extraction.")

        # 2. Keyword-based fallback if Groq failed or was unavailable
        if not groq_succeeded:
            args = _keyword_extract_args(user_query, defaults)
            print(f"[LLMRouter] Keyword-extracted args: {args}")

        # 3. Execute TimesFM 2.5 + Structural Causal Intervention Engine
        sim_result = self.engine.simulate_trajectory(
            block_name=args.get("block_name", "Nakodar"),
            intervention=args.get("intervention", "crop_diversification_and_micro_irrigation"),
            adoption_pct=float(args.get("adoption_pct", 0.35)),
            horizon_years=int(args.get("horizon_years", 3)),
            state=args.get("state"),
            district=args.get("district"),
        )
        print(f"[LLMRouter] TimesFM+Causal sim_result: {json.dumps(sim_result, indent=2)}")

        # 4. Build trajectory table for explicit grounding in the prompt
        trajectory_lines = []
        bau = sim_result["timesfm_baseline_trajectory"]
        cfact = sim_result["causal_counterfactual_trajectory"]
        for i, (b, c) in enumerate(zip(bau, cfact), start=1):
            cat = "→" if c < b else "↑"
            trajectory_lines.append(f"  Year {i}: BAU={b}%  Counterfactual={c}%  ({cat} {round(c-b,2):+.2f}%)")
        trajectory_table = "\n".join(trajectory_lines)

        # 5. Evidence-grounded synthesis via Gemini
        synthesis_prompt = f"""You are the INGRES Causal Policy Assistant for India's Central Ground Water Board (CGWB).
A user asked: "{user_query}"

The following data was produced by Google TimesFM 2.5 (zero-shot time-series forecasting) and a Structural Causal Inference engine.
You MUST ground your entire answer in THESE EXACT NUMBERS. Do not invent or modify any figures.

=== SIMULATION RESULTS ===
Block / Unit   : {sim_result['unit']}
Aquifer Type   : {sim_result['aquifer_type']}
Intervention   : {sim_result['intervention'].replace('_', ' ').title()}
Adoption Level : {sim_result['adoption_pct']}%
Horizon        : {sim_result['horizon_years']} year(s)

Current GEC-2015 Stage : {sim_result['current_stage_pct']}%  →  Category: {sim_result['current_category']}
Final BAU (Year {sim_result['horizon_years']})  : {sim_result['final_year_baseline_pct']}%  →  Category: {self._get_category_label(sim_result['final_year_baseline_pct'])}
Final Projected        : {sim_result['final_year_projected_pct']}%  →  Category: {sim_result['projected_category']}
Net Causal Effect (ΔS) : {sim_result['net_causal_effect_pct']:+.2f}%
Return-Flow Loss       : {sim_result['return_flow_loss_ham']:,} ham (hectare-metre)

Year-by-Year Trajectory (TimesFM BAU vs. Causal Counterfactual):
{trajectory_table}

GEC-2015 Categories: Safe ≤70% | Semi-Critical 70–90% | Critical 90–100% | Over-Exploited >100%
=== END SIMULATION ===

Write a clear, structured policy brief that:
1. States the DIRECT ANSWER to the user's question using the exact numbers above.
2. Shows the year-by-year trajectory comparison with the actual values.
3. Notes the GEC-2015 category before and after the intervention.
4. Explains the hydrogeological trade-off (return-flow percolation loss in {sim_result['aquifer_type']} aquifers).
5. Gives a concrete CGWB-aligned recommendation.

Format using short paragraphs and bullet points. Keep it under 350 words."""

        final_answer = ""
        if self.gemini_client:
            try:
                gemini_resp = self.gemini_client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=synthesis_prompt,
                )
                final_answer = gemini_resp.text
                print(f"[LLMRouter] Gemini synthesis succeeded ({len(final_answer)} chars)")
            except Exception as e:
                print(f"[LLMRouter] Gemini error: {e}")

        # Fallback: structured text answer directly from sim_result numbers
        if not final_answer:
            traj_text = "\n".join(
                f"  • Year {i}: BAU {b}% → Projected {c}% (Δ{round(c-b,2):+.2f}%)"
                for i, (b, c) in enumerate(zip(bau, cfact), start=1)
            )
            final_answer = (
                f"**Policy Simulation: {sim_result['unit']}**\n\n"
                f"**Current Status:** {sim_result['current_stage_pct']}% extraction → _{sim_result['current_category']}_ (GEC-2015)\n\n"
                f"**TimesFM 2.5 Forecast vs. Causal Counterfactual ({sim_result['adoption_pct']}% adoption):**\n{traj_text}\n\n"
                f"**Final Year Result:**\n"
                f"- BAU (no policy): {sim_result['final_year_baseline_pct']}%\n"
                f"- With {sim_result['intervention'].replace('_',' ').title()}: {sim_result['final_year_projected_pct']}% → _{sim_result['projected_category']}_\n"
                f"- Net Causal Effect: **{sim_result['net_causal_effect_pct']:+.2f}%**\n\n"
                f"**Trade-off:** Return-flow percolation loss of {sim_result['return_flow_loss_ham']:,} ham in {sim_result['aquifer_type']} aquifer.\n\n"
                f"_Powered by Google TimesFM 2.5 + Structural Causal Inference_"
            )

        return {
            "answer": final_answer,
            "tool_payload": args,
            "causal_trace": sim_result,
        }

    @staticmethod
    def _get_category_label(stage_pct: float) -> str:
        if stage_pct <= 70:
            return "Safe"
        elif stage_pct <= 90:
            return "Semi-Critical"
        elif stage_pct <= 100:
            return "Critical"
        else:
            return "Over-Exploited"
