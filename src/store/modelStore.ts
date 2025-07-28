// src/store/modelStore.ts
import { create } from 'zustand';

export type Model = {
  id: string;
  name: string;
  accuracy: number;
};

type ModelStore = {
  models: Model[];
  activeModelId: string | null;
  setActiveModel: (id: string) => void;
  setModels: (models: Model[]) => void;
};

// Load active model ID from localStorage on initialization
const savedActiveModelId = localStorage.getItem('activeModelId');

export const useModelStore = create<ModelStore>((set) => ({
  models: [],
  activeModelId: savedActiveModelId, // Initialize from localStorage
  setActiveModel: (id) => {
    localStorage.setItem('activeModelId', id); // Save to localStorage
    set({ activeModelId: id });
  },
  setModels: (models) => set({ models }),
}));