import os
import sys
from pathlib import Path
import pandas as pd
import plotly.graph_objects as go
import streamlit as st

# Add backend directory to sys.path so modules can be imported directly
backend_dir = Path(__file__).resolve().parent / "backend"
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

# Handle API keys from Streamlit secrets, environment variables, or local .env
try:
    from dotenv import load_dotenv
    load_dotenv()
    load_dotenv(backend_dir / ".env")
except Exception:
    pass

# Synchronize st.secrets into os.environ for backend modules
for key in ["GROQ_API_KEY", "GEMINI_API_KEY"]:
    if key in st.secrets and not os.environ.get(key):
        os.environ[key] = str(st.secrets[key])

# Page configuration
st.set_page_config(
    page_title="INGRES Groundwater Policy Assistant",
    page_icon="💧",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Custom styling
st.markdown(
    """
    <style>
    .main { background-color: #030712; }
    .kpi-card {
        background: #111827;
        border: 1px solid #374151;
        border-radius: 12px;
        padding: 16px;
        text-align: center;
    }
    .kpi-title {
        font-size: 0.75rem;
        color: #9ca3af;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 4px;
    }
    .kpi-value {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 2px;
    }
    .badge-safe { color: #4ade80; background: rgba(22, 101, 52, 0.4); padding: 2px 8px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; }
    .badge-semi { color: #facc15; background: rgba(133, 77, 14, 0.4); padding: 2px 8px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; }
    .badge-critical { color: #fb923c; background: rgba(154, 52, 18, 0.4); padding: 2px 8px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; }
    .badge-over { color: #f87171; background: rgba(153, 27, 27, 0.4); padding: 2px 8px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; }
    </style>
    """,
    unsafe_allow_html=True,
)


@st.cache_resource(show_spinner="Loading Google TimesFM 2.5 + Structural Causal Inference Engine...")
def load_causal_engine():
    from causal_forecaster import INGRESTimesFMCausalEngine
    from llm_router import HybridPolicyOrchestrator
    engine = INGRESTimesFMCausalEngine()
    orchestrator = HybridPolicyOrchestrator(engine)
    return engine, orchestrator


# Load backend modules
try:
    from india_groundwater_data import get_all_blocks_hierarchy, get_flat_block_database, get_gec15_category
    hierarchy = get_all_blocks_hierarchy()
    flat_blocks = get_flat_block_database()
except Exception as e:
    st.error(f"Error loading groundwater data: {e}")
    hierarchy = {}
    flat_blocks = {}

engine, orchestrator = load_causal_engine()


def get_badge_html(category: str) -> str:
    if category == "Safe":
        return f'<span class="badge-safe">{category}</span>'
    elif category == "Semi-Critical":
        return f'<span class="badge-semi">{category}</span>'
    elif category == "Critical":
        return f'<span class="badge-critical">{category}</span>'
    else:
        return f'<span class="badge-over">{category}</span>'


def plot_trajectory_chart(trace: dict):
    history = trace.get("current_stage_pct")
    bau = trace["timesfm_baseline_trajectory"]
    cfact = trace["causal_counterfactual_trajectory"]
    horizon = trace["horizon_years"]
    years = [f"Year {i}" for i in range(1, horizon + 1)]

    fig = go.Figure()

    # Baseline trajectory
    fig.add_trace(go.Scatter(
        x=years,
        y=bau,
        mode="lines+markers",
        name="TimesFM Baseline (BAU)",
        line=dict(color="#facc15", width=3, dash="dot"),
        marker=dict(size=8, color="#facc15"),
    ))

    # Counterfactual trajectory
    fig.add_trace(go.Scatter(
        x=years,
        y=cfact,
        mode="lines+markers",
        name=f"Counterfactual ({trace['intervention'].replace('_', ' ').title()})",
        line=dict(color="#22d3ee", width=3),
        marker=dict(size=8, color="#22d3ee"),
    ))

    # GEC thresholds
    fig.add_hline(y=70, line_dash="dash", line_color="#4ade80", annotation_text="Safe (≤70%)", annotation_position="top right")
    fig.add_hline(y=90, line_dash="dash", line_color="#fb923c", annotation_text="Critical (90%)", annotation_position="top right")
    fig.add_hline(y=100, line_dash="dash", line_color="#f87171", annotation_text="Over-Exploited (>100%)", annotation_position="top right")

    fig.update_layout(
        title=f"Extraction Stage Trajectory: {trace['unit']}",
        xaxis_title="Simulation Timeline",
        yaxis_title="Groundwater Extraction Stage (%)",
        template="plotly_dark",
        plot_bgcolor="#0b1329",
        paper_bgcolor="#111827",
        legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1),
        margin=dict(l=40, r=40, t=60, b=40),
        height=380,
    )
    return fig


def display_simulation_card(trace: dict):
    st.markdown(f"### 📍 {trace['unit']} · *{trace['aquifer_type']}*")

    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.markdown(
            f"""
            <div class="kpi-card">
                <div class="kpi-title">Current Stage</div>
                <div class="kpi-value">{trace['current_stage_pct']}%</div>
                <div>{get_badge_html(trace['current_category'])}</div>
            </div>
            """,
            unsafe_allow_html=True,
        )
    with col2:
        st.markdown(
            f"""
            <div class="kpi-card">
                <div class="kpi-title">TimesFM BAU (Y{trace['horizon_years']})</div>
                <div class="kpi-value" style="color: #facc15;">{trace['final_year_baseline_pct']}%</div>
                <div style="font-size: 0.8rem; color: #9ca3af;">No Intervention</div>
            </div>
            """,
            unsafe_allow_html=True,
        )
    with col3:
        st.markdown(
            f"""
            <div class="kpi-card">
                <div class="kpi-title">Projected (Y{trace['horizon_years']})</div>
                <div class="kpi-value" style="color: #22d3ee;">{trace['final_year_projected_pct']}%</div>
                <div>{get_badge_html(trace['projected_category'])}</div>
            </div>
            """,
            unsafe_allow_html=True,
        )
    with col4:
        delta = trace['net_causal_effect_pct']
        delta_color = "#4ade80" if delta < 0 else "#f87171"
        arrow = "↓" if delta < 0 else "↑"
        st.markdown(
            f"""
            <div class="kpi-card">
                <div class="kpi-title">Net Causal Effect (ΔS)</div>
                <div class="kpi-value" style="color: {delta_color};">{arrow} {delta:+.2f}%</div>
                <div style="font-size: 0.8rem; color: #9ca3af;">{trace['adoption_pct']}% Adoption</div>
            </div>
            """,
            unsafe_allow_html=True,
        )

    st.plotly_chart(plot_trajectory_chart(trace), use_container_width=True)

    # Trajectory breakdown table
    table_data = []
    bau = trace["timesfm_baseline_trajectory"]
    cfact = trace["causal_counterfactual_trajectory"]
    for i, (b, c) in enumerate(zip(bau, cfact), start=1):
        d = round(c - b, 2)
        table_data.append({
            "Timeline": f"Year {i}",
            "TimesFM BAU": f"{b}%",
            "Causal Projected": f"{c}%",
            "Net Policy Effect (Δ)": f"{d:+.2f}%",
        })
    st.table(pd.DataFrame(table_data))

    st.caption(
        f"⚡ **Hydrogeological Trade-off:** Return-flow percolation loss of "
        f"**{abs(trace['return_flow_loss_ham']):,} ham** in *{trace['aquifer_type']}* aquifer. (GEC-2015 Methodology · CGWB)"
    )


# Sidebar controls
with st.sidebar:
    st.title("💧 INGRES Policy")
    st.caption("Central Ground Water Board · AI Simulation")

    # API Keys check
    has_gemini = bool(os.environ.get("GEMINI_API_KEY"))
    has_groq = bool(os.environ.get("GROQ_API_KEY"))

    with st.expander("🔑 API Configuration", expanded=not (has_gemini and has_groq)):
        groq_input = st.text_input("Groq API Key", value=os.environ.get("GROQ_API_KEY", ""), type="password")
        gemini_input = st.text_input("Gemini API Key", value=os.environ.get("GEMINI_API_KEY", ""), type="password")
        if groq_input:
            os.environ["GROQ_API_KEY"] = groq_input.strip()
        if gemini_input:
            os.environ["GEMINI_API_KEY"] = gemini_input.strip()
        st.caption("Keys are stored safely in session or `st.secrets` for Streamlit Cloud.")

    sim_mode = st.radio("Simulation Mode", ["💬 Natural Language Chat", "🎛️ Direct Parameter Simulator"])

    if sim_mode == "🎛️ Direct Parameter Simulator":
        st.subheader("Scenario Parameters")
        states = list(hierarchy.keys())
        selected_state = st.selectbox("State", states, index=states.index("Punjab") if "Punjab" in states else 0)

        districts = list(hierarchy.get(selected_state, {}).keys())
        selected_district = st.selectbox("District", districts, index=districts.index("Jalandhar") if "Jalandhar" in districts else 0)

        blocks = hierarchy.get(selected_state, {}).get(selected_district, [])
        selected_block = st.selectbox("Administrative Block", blocks, index=blocks.index("Nakodar") if "Nakodar" in blocks else 0)

        intervention_options = {
            "Crop Diversification & Micro-Irrigation": "crop_diversification_and_micro_irrigation",
            "Artificial Recharge Structures": "artificial_recharge_structures",
            "Power Subsidy Rationalization": "power_subsidy_rationalization",
        }
        chosen_label = st.selectbox("Policy Intervention", list(intervention_options.keys()))
        selected_intervention = intervention_options[chosen_label]

        adoption_pct = st.slider("Adoption Level (%)", min_value=5, max_value=100, value=35, step=5) / 100.0
        horizon_years = st.slider("Forecast Horizon (Years)", min_value=1, max_value=5, value=3)

        run_direct_btn = st.button("🚀 Run Simulation", type="primary", use_container_width=True)

    st.divider()
    st.markdown("### 📊 GEC-2015 Categories")
    st.markdown(
        """
        - 🟢 **Safe:** ≤ 70%
        - 🟡 **Semi-Critical:** 70% – 90%
        - 🟠 **Critical:** 90% – 100%
        - 🔴 **Over-Exploited:** > 100%
        """
    )


# Main Content Area
st.title("INGRES Causal Policy Assistant")
st.markdown(
    "Neuro-symbolic groundwater policy simulator for India powered by "
    "**Google TimesFM 2.5**, **Structural Causal Inference**, and **Gemini**."
)

if sim_mode == "🎛️ Direct Parameter Simulator":
    if 'run_direct_btn' in locals() and run_direct_btn:
        with st.spinner("Executing TimesFM 2.5 + Structural Causal simulation..."):
            sim_res = engine.simulate_trajectory(
                block_name=selected_block,
                intervention=selected_intervention,
                adoption_pct=adoption_pct,
                horizon_years=horizon_years,
                state=selected_state,
                district=selected_district,
            )
            display_simulation_card(sim_res)
    else:
        st.info("👈 Select your parameters in the sidebar and click **Run Simulation**.")

else:
    # Chat mode
    if "messages" not in st.session_state:
        st.session_state.messages = [
            {
                "role": "assistant",
                "content": (
                    "Hello! I am the **INGRES Groundwater Policy Assistant**. "
                    "I simulate counterfactual groundwater policies across Indian administrative blocks using "
                    "**Google TimesFM 2.5** and **Structural Causal Inference**.\n\n"
                    "Ask me any scenario, or click a suggestion below!"
                ),
            }
        ]

    # Preset suggestions
    suggestions = [
        "In Nakodar (Punjab), what happens if 35% of paddy shifts to micro-irrigation over 3 years?",
        "Simulate power subsidy rationalization in Bagalkot (Karnataka) with 40% adoption.",
        "What is the groundwater status of Kolar district in Karnataka?",
        "Recommend a policy for Over-Exploited blocks in Rajasthan.",
    ]

    cols = st.columns(len(suggestions))
    for i, s in enumerate(suggestions):
        if cols[i].button(s, key=f"sugg_{i}", use_container_width=True):
            st.session_state.queued_query = s

    # Display existing chat history
    for msg in st.session_state.messages:
        with st.chat_message(msg["role"]):
            st.markdown(msg["content"])
            if "causal_trace" in msg:
                display_simulation_card(msg["causal_trace"])

    # Handle input
    prompt = st.chat_input("Ask about any groundwater block or policy scenario...")
    if "queued_query" in st.session_state:
        prompt = st.session_state.pop("queued_query")

    if prompt:
        st.session_state.messages.append({"role": "user", "content": prompt})
        with st.chat_message("user"):
            st.markdown(prompt)

        with st.chat_message("assistant"):
            with st.spinner("Analyzing scenario and running TimesFM 2.5 simulation..."):
                response = orchestrator.run(prompt)
                answer = response.get("answer", "")
                trace = response.get("causal_trace")

                st.markdown(answer)
                if trace:
                    display_simulation_card(trace)

                st.session_state.messages.append({
                    "role": "assistant",
                    "content": answer,
                    "causal_trace": trace,
                })
