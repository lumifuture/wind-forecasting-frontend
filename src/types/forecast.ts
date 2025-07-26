// src/types/forecast.ts
export type ForecastPoint = {
  timestamp: string;
  predicted_power: number;
  actual_power?: number;
};
