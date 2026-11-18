import csv
from pathlib import Path
from typing import Any


_DATASET_FILES = {
    "Delhi": "del_gw_2025.csv",
    "Goa": "goa_gw_2025.csv",
    "Gujarat": "guj_gw_2025.csv",
    "Karnataka": "kar_gw_2025.csv",
    "Maharashtra": "mh_gw_2025.csv",
    "Telangana": "tg_gw_2025.csv",
    "India": "india_gw_2025.csv",
}


def _number(value: str) -> float | None:
    try:
        return float(value.strip())
    except (AttributeError, ValueError):
        return None


def _normalise(value: str) -> str:
    return " ".join(value.strip().lower().split())


def _read_rows(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8-sig", newline="") as file:
        return list(csv.DictReader(file))


def load_groundwater_dataset() -> dict[str, dict[str, dict[str, Any]]]:
    """Load the supplied 2025 state and district groundwater observations."""
    data_root = Path(__file__).resolve().parent.parent
    dataset: dict[str, dict[str, dict[str, Any]]] = {
        "states": {},
        "districts": {},
    }

    for state, filename in _DATASET_FILES.items():
        path = data_root / filename
        if not path.exists():
            continue

        for row in _read_rows(path):
            name = row.get("Name of State/UT") or row.get("Name of District")
            if not name or name.startswith("Total("):
                continue

            observation = {
                "name": name.strip(),
                "stage": _number(row.get("Stage of GW extraction (%)", "")),
                "net_avail_ham": _number(row.get("Net GW availability for future", "")),
                "annual_recharge": _number(row.get("Total annual groundwater recharge", "")),
                "annual_extraction": _number(row.get("Total Annual Extraction", "")),
            }
            if observation["stage"] is None:
                continue

            if state == "India":
                dataset["states"][_normalise(name)] = observation
            else:
                dataset["districts"][_normalise(name)] = {
                    **observation,
                    "state": state,
                }

    return dataset


GROUNDWATER_DATASET = load_groundwater_dataset()


def find_observation(state: str, district: str) -> dict[str, Any] | None:
    """Return a district observation, falling back to its state observation."""
    district_observation = GROUNDWATER_DATASET["districts"].get(_normalise(district))
    if district_observation and district_observation["state"] == state:
        return district_observation
    return GROUNDWATER_DATASET["states"].get(_normalise(state))
