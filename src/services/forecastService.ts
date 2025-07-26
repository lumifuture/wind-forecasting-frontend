import type { ForecastPoint } from '../types/forecast';

export async function getMockForecastData(): Promise<ForecastPoint[]> {
  // Simulated delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock data (next 6 timestamps)
  return [
    {
      timestamp: '2025-07-23 08:00',
      actual_power: 1200,
      predicted_power: 1150,
    },
    {
      timestamp: '2025-07-23 09:00',
      actual_power: 1300,
      predicted_power: 1280,
    },
    {
      timestamp: '2025-07-23 10:00',
      actual_power: 1400,
      predicted_power: 1370,
    },
    {
      timestamp: '2025-07-23 11:00',
      actual_power: 1500,
      predicted_power: 1495,
    },
    {
      timestamp: '2025-07-23 12:00',
      actual_power: 1600,
      predicted_power: 1580,
    },
    {
      timestamp: '2025-07-23 13:00',
      actual_power: 1550,
      predicted_power: 1575,
    },
  ];
}