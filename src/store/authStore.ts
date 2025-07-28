// src/store/authStore.ts
import { create } from 'zustand';

type AuthStore = {
  token: string | null;
  isLoggedIn: boolean;
  setToken: (token: string | null) => void;
  logout: () => void;
};

// Check localStorage for a token on initialization
const initialToken = localStorage.getItem('authToken');

export const useAuthStore = create<AuthStore>((set) => ({
  token: initialToken,
  isLoggedIn: !!initialToken, // Convert token presence to boolean
  setToken: (token) => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
    set({ token, isLoggedIn: !!token });
  },
  logout: () => {
    localStorage.removeItem('authToken');
    set({ token: null, isLoggedIn: false });
  },
}));