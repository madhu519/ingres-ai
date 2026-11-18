import numpy as np
import torch
from transformers import TimesFm2_5ModelForPrediction
from india_groundwater_data import resolve_block_profile, get_all_blocks_hierarchy, get_gec15_category


class INGRESTimesFMCausalEngine:
    def __init__(self):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"[TimesFM-Causal] Loading google/timesfm-2.5-200m-transformers on {self.device}...")
        self.model = TimesFm2_5ModelForPrediction.from_pretrained(
            "google/timesfm-2.5-200m-transformers"
        ).to(device=self.device, dtype=torch.float32)
        self.model.eval()
        print("[TimesFM-Causal] Model ready.")

    def _gec15_category(self, stage: float) -> str:
        return get_gec15_category(stage)

    def simulate_trajectory(
        self,
        block_name: str,
        intervention: str,
        adoption_pct: float = 0.35,
        horizon_years: int = 3,
        state: str = None,
        district: str = None,
    ) -> dict:
        profile = resolve_block_profile(block_name, state_hint=state, district_hint=district)
        past_tensor = [torch.tensor(profile["history_stage"], dtype=torch.float32, device=self.device)]

        # 1. Zero-shot baseline forecast using Google TimesFM 2.5
        with torch.no_grad():
            outputs = self.model(past_values=past_tensor, forecast_context_len=64)
            # Extract horizon_years steps from mean_predictions
            raw_forecast = outputs.mean_predictions[0, :horizon_years].cpu().numpy().tolist()

        baseline_forecast = [round(float(val), 2) for val in raw_forecast]
        current_stage = profile["history_stage"][-1]

        # 2. Structural Causal Intervention Effect (do-operator conditioned on aquifer & crop covariates)
        # Accounts for pumping reduction minus alluvial return-flow percolation loss
        max_causal_shift = -48.0 * profile["paddy_share"] + 10.2 * profile["is_alluvial"] * profile["permeability"]
        if intervention == "artificial_recharge_structures":
            max_causal_shift *= 0.65
        elif intervention == "power_subsidy_rationalization":
            max_causal_shift *= 0.80

        intensity = adoption_pct / 0.35
        counterfactual_forecast = []
        for yr_idx, base_val in enumerate(baseline_forecast, start=1):
            # Progressive adoption ramp-up over the horizon
            ramp = min(yr_idx / float(horizon_years), 1.0)
            causal_delta = max_causal_shift * intensity * ramp
            counterfactual_forecast.append(round(max(25.0, base_val + causal_delta), 2))

        final_baseline = baseline_forecast[-1]
        final_counterfactual = counterfactual_forecast[-1]
        net_cate = round(final_counterfactual - final_baseline, 2)
        return_flow_loss = int(round(profile["net_avail_ham"] * 0.092 * intensity))

        return {
            "unit": f"{profile['name']}, {profile['district']}, {profile['state']}",
            "block_name": profile["name"],
            "district": profile["district"],
            "state": profile["state"],
            "aquifer_type": profile["aquifer"],
            "intervention": intervention,
            "adoption_pct": round(adoption_pct * 100, 1),
            "horizon_years": horizon_years,
            "current_stage_pct": current_stage,
            "current_category": self._gec15_category(current_stage),
            "timesfm_baseline_trajectory": baseline_forecast,
            "causal_counterfactual_trajectory": counterfactual_forecast,
            "final_year_baseline_pct": final_baseline,
            "final_year_projected_pct": final_counterfactual,
            "net_causal_effect_pct": net_cate,
            "return_flow_loss_ham": -return_flow_loss,
            "projected_category": self._gec15_category(final_counterfactual),
            "data_source": profile["dataset_source"],
        }


if __name__ == "__main__":
    engine = INGRESTimesFMCausalEngine()
    res = engine.simulate_trajectory("Nakodar", "crop_diversification_and_micro_irrigation", 0.35, 3)
    print("\nTimesFM + Causal Simulation Output:")
    for k, v in res.items():
        print(f"  {k}: {v}")
