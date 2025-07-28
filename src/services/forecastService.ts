// src/services/forecastService.ts
import axios from 'axios';
import type { ForecastPoint } from '../types/forecast'; // Make sure this is imported from types/forecast

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// This function would fetch actual forecast data for a given model
export async function getForecastByModel(modelId: string): Promise<ForecastPoint[]> {
  try {
    // --- Mock for tutorial ---
    await new Promise((res) => setTimeout(res, 700)); // Simulate API delay

    const now = Date.now();
    const mockData: ForecastPoint[] = Array.from({ length: 24 }, (_, i) => {
      const timestamp = new Date(now + i * 3600 * 1000).toISOString(); // Hourly forecast for next 24 hours
      let predictedPower = 0;

      // Simulate different prediction patterns for different models
      if (modelId === 'wind_model_v1') {
        predictedPower = parseFloat((Math.sin(i / 4) * 10 + 20 + Math.random() * 5).toFixed(2));
      } else if (modelId === 'wind_model_v2') {
        predictedPower = parseFloat((Math.cos(i / 3) * 12 + 25 + Math.random() * 3).toFixed(2));
      } else { // default or model_v3
        predictedPower = parseFloat((Math.sin(i / 5) * 8 + 18 + Math.random() * 7).toFixed(2));
      }
      return { timestamp, predictedPower: Math.max(0, predictedPower) }; // Ensure power is not negative
    });
    return mockData;
    // --- End Mock ---

    // For real API:
    // const response = await axios.get<ForecastPoint[]>(`${API_URL}/forecast/${modelId}`);
    // return response.data;
  } catch (error) {
    console.error(`Error fetching forecast for model ${modelId}:`, error);
    throw new Error(`Failed to load forecast data for ${modelId}.`);
  }
}

// This function would fetch actual historical data
export async function getHistoricalData(): Promise<ForecastPoint[]> {
  try {
    // --- Mock for tutorial ---
    await new Promise((res) => setTimeout(res, 600)); // Simulate API delay

    const now = Date.now();
    const mockData: ForecastPoint[] = Array.from({ length: 24 }, (_, i) => {
      const timestamp = new Date(now - (24 - i) * 3600 * 1000).toISOString(); // Historical data for past 24 hours
      const actualPower = parseFloat((Math.sin((24 - i) / 4) * 15 + 20 + Math.random() * 8).toFixed(2));
      return { timestamp, actualPower: Math.max(0, actualPower) };
    });
    return mockData;
    // --- End Mock ---

    // For real API:
    // const response = await axios.get<ForecastPoint[]>(`${API_URL}/historical`);
    // return response.data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw new Error('Failed to load historical data.');
  }
}

// Example for other services if needed (e.g., Data Comparison, Reports, Weather)
// src/services/dataComparisonService.ts
// src/services/reportService.ts
// src/services/weatherService.ts