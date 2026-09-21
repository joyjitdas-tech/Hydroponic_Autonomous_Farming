from pathlib import Path

import pandas as pd

from config import HEALTH_FEATURES


DATA_PATH = Path(__file__).resolve().parent / "data" / "IoTData --Raw--.csv"


class EnvironmentSimulator:
    def __init__(self):
        if not DATA_PATH.exists():
            raise FileNotFoundError(
                f"Dataset not found: {DATA_PATH}"
            )

        self.df = pd.read_csv(DATA_PATH)

        # Keep only the sensor columns needed by the Environment service.
        self.sensor_df = self.df[HEALTH_FEATURES].copy()

        # Remove rows with missing sensor values.
        self.sensor_df = self.sensor_df.dropna().reset_index(drop=True)

        if self.sensor_df.empty:
            raise ValueError("No valid sensor rows found in the dataset.")

    def simulate_random(self) -> dict:
        """Select one random recorded sensor observation."""

        row = self.sensor_df.sample(
            n=1
        ).iloc[0]

        return self._row_to_dict(row)

    def simulate_row(self, row_index: int) -> dict:
        """Select a specific row from the cleaned dataset."""

        if row_index < 0 or row_index >= len(self.sensor_df):
            raise ValueError(
                f"row_index must be between 0 and {len(self.sensor_df) - 1}"
            )

        row = self.sensor_df.iloc[row_index]

        return self._row_to_dict(row)

    def _row_to_dict(self, row) -> dict:
        return {
            "pH": float(row["pH"]),
            "TDS": float(row["TDS"]),
            "water_level": float(row["water_level"]),
            "DHT_temp": float(row["DHT_temp"]),
            "DHT_humidity": float(row["DHT_humidity"]),
            "water_temp": float(row["water_temp"]),
        }

    def dataset_info(self) -> dict:
        return {
            "dataset": DATA_PATH.name,
            "total_valid_rows": len(self.sensor_df),
            "features": HEALTH_FEATURES,
        }