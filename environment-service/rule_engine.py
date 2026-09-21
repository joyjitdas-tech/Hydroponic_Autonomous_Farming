from config import HEALTH_THRESHOLDS


class RuleEngine:
    def check(self, sensor_data: dict) -> dict:
        results = {}

        for sensor, limits in HEALTH_THRESHOLDS.items():
            value = sensor_data[sensor]

            if value < limits["min"]:
                status = "below_range"
            elif value > limits["max"]:
                status = "above_range"
            else:
                status = "within_range"

            results[sensor] = {
                "value": value,
                "status": status,
            }

        # water_level is contextual only.
        # It is not part of the current reference-range rules.
        results["water_level"] = {
            "value": sensor_data["water_level"],
        }

        return results