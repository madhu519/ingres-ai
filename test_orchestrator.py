import sys
sys.path.append('backend')
from causal_forecaster import INGRESTimesFMCausalEngine
from llm_router import HybridPolicyOrchestrator

engine = INGRESTimesFMCausalEngine()
orch = HybridPolicyOrchestrator(engine)

query = "In Nakodar block, if we shift 35% of paddy to maize with micro-irrigation, can it drop below Critical in 3 years?"
res = orch.run(query)

print("\n--- SIMULATION SUCCESS ---")
print("Tool Payload:", res["tool_payload"])
print("\nAnswer:\n", res["answer"])
