// src/store/authStore.ts
import { create } from 'zustand';
import { login } from '../services/authService';


type AuthStore = {
  token: string | null;
  isLoggedIn: boolean;
  setToken: (token: string | null) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

// Check localStorage for a token on initialization
const initialToken = localStorage.getItem('authToken');

export const useAuthStore = create<AuthStore>((set) => ({
  token: initialToken,
  isLoggedIn: !!initialToken, // Convert token presence to boolean
  login: async (username: string, password: string) => {
    const token = await login(username, password); // Call authService
    set((state) => {
      localStorage.setItem('authToken', token);
      return { token, isLoggedIn: true };
    });
  },
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