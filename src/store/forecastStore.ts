import { create } from 'zustand';
import type { ForecastPoint } from '../types/forecast';
import { getMockForecastData } from '../services/forecastService';

type ForecastStore = {
  data: ForecastPoint[];
  loading: boolean;
  error: string | null;
  fetchForecast: () => Promise<void>;
};

export const useForecastStore = create<ForecastStore>((set) => ({
  data: [],
  loading: false,
  error: null,

  fetchForecast: async () => {
    set({ loading: true, error: null });

    try {
      const data = await getMockForecastData();
      set({ data, loading: false });
    } catch (err) {
      set({ error: 'Failed to load forecast data', loading: false });
    }
  },
}));