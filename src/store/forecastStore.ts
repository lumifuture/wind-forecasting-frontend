// src/store/forecastStore.ts
import { create } from 'zustand';
import type { ForecastPoint } from '../types/forecast';
// import { getForecastData } from '../services/forecastService'; // Use for real API

type ForecastsCache = Record<string, ForecastPoint[]>; // modelId -> forecast data

type ForecastStore = {
  forecasts: ForecastsCache;
  historicalData: ForecastPoint[];
  loadingForecast: boolean;
  errorForecast: string | null;
  loadingHistorical: boolean;
  errorHistorical: string | null;

  setForecast: (modelId: string, data: ForecastPoint[]) => void;
  setHistoricalData: (data: ForecastPoint[]) => void;
  setLoadingForecast: (loading: boolean) => void;
  setErrorForecast: (error: string | null) => void;
  setLoadingHistorical: (loading: boolean) => void;
  setErrorHistorical: (error: string | null) => void;
};

// Load cached forecasts from localStorage on initialization
const loadCachedForecasts = (): ForecastsCache => {
  const cache: ForecastsCache = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('cached_forecast_')) {
      try {
        cache[key.replace('cached_forecast_', '')] = JSON.parse(localStorage.getItem(key) || '[]');
      } catch (e) {
        console.error(`Error parsing cached forecast for ${key}:`, e);
        localStorage.removeItem(key); // Clear bad cache
      }
    }
  }
  return cache;
};

const loadCachedHistoricalData = (): ForecastPoint[] => {
  try {
    const data = localStorage.getItem('cached_historical_data');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error parsing cached historical data:", e);
    localStorage.removeItem('cached_historical_data');
    return [];
  }
};


export const useForecastStore = create<ForecastStore>((set) => ({
  forecasts: loadCachedForecasts(),
  historicalData: loadCachedHistoricalData(),
  loadingForecast: false,
  errorForecast: null,
  loadingHistorical: false,
  errorHistorical: null,

  setForecast: (modelId, data) => {
    // Cache forecast data in localStorage
    localStorage.setItem(`cached_forecast_${modelId}`, JSON.stringify(data));
    set((state) => ({
      forecasts: { ...state.forecasts, [modelId]: data },
    }));
  },
  setHistoricalData: (data) => {
    // Cache historical data in localStorage
    localStorage.setItem('cached_historical_data', JSON.stringify(data));
    set({ historicalData: data });
  },
  setLoadingForecast: (loading) => set({ loadingForecast: loading }),
  setErrorForecast: (error) => set({ errorForecast: error }),
  setLoadingHistorical: (loading) => set({ loadingHistorical: loading }),
  setErrorHistorical: (error) => set({ errorHistorical: error }),
}));