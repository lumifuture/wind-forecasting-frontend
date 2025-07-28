// src/types/forecast.ts
export type ForecastPoint = {
  timestamp: string;
  predictedPower: number;
  actualPower?: number; // Optional for historical data
};