// src/services/modelService.ts
import axios from 'axios';
import type { Model } from '../store/modelStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export async function getAvailableModels(): Promise<Model[]> {
  try {
    // --- Mock for tutorial ---
    await new Promise((r) => setTimeout(r, 500)); // Simulate API delay
    return [
      { id: 'wind_model_v1', name: 'Wind LSTM Model V1', accuracy: 0.89 },
      { id: 'wind_model_v2', name: 'Wind Transformer Model V2', accuracy: 0.93 },
      { id: 'wind_model_v3', name: 'Hybrid Wind Model V3', accuracy: 0.91 },
    ];
    // --- End Mock ---

    // For real API:
    // const response = await axios.get<Model[]>(`${API_URL}/models`);
    // return response.data;
  } catch (error) {
    console.error('Error fetching models:', error);
    throw new Error('Failed to fetch available models.');
  }
}