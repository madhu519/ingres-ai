from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from causal_forecaster import INGRESTimesFMCausalEngine
from llm_router import HybridPolicyOrchestrator
from india_groundwater_data import get_all_blocks_hierarchy

state = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    engine = INGRESTimesFMCausalEngine()
    state["engine"] = engine
    state["orchestrator"] = HybridPolicyOrchestrator(engine)
    yield
    state.clear()


app = FastAPI(title="INGRES TimesFM + Causal Policy API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    query: str = Field(..., min_length=5)


class DirectSimulationRequest(BaseModel):
    block_name: str = "Nakodar"
    state: str | None = None
    district: str | None = None
    intervention: str = "crop_diversification_and_micro_irrigation"
    adoption_pct: float = Field(0.35, ge=0.05, le=1.0)
    horizon_years: int = Field(3, ge=1, le=10)


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "engine_loaded": "engine" in state,
        "orchestrator_loaded": "orchestrator" in state,
    }


@app.get("/api/hierarchy")
def get_hierarchy():
    return get_all_blocks_hierarchy()


@app.post("/api/simulate")
def simulate(req: QueryRequest):
    if "orchestrator" not in state:
        raise HTTPException(status_code=503, detail="Backend initializing")
    return state["orchestrator"].run(req.query)


@app.post("/api/simulate-direct")
def simulate_direct(req: DirectSimulationRequest):
    if "engine" not in state:
        raise HTTPException(status_code=503, detail="Causal engine not initialized.")
    return state["engine"].simulate_trajectory(
        block_name=req.block_name,
        intervention=req.intervention,
        adoption_pct=req.adoption_pct,
        horizon_years=req.horizon_years,
        state=req.state,
        district=req.district,
    )
