// src/services/authService.ts
import axios from 'axios';

// Ensure VITE_API_URL is set in your .env file
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export async function login(username: string, password: string): Promise<string> {
  try {
    // Simulate an API call
    // const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    // return response.data.token;

    // --- Mock for tutorial ---
    await new Promise((res) => setTimeout(res, 800)); // Simulated delay
    if (username === 'admin' && password === '123456') {
      return 'mock-jwt-token-1234567890abcdef'; // A fake token
    } else {
      throw new Error('Invalid credentials');
    }
    // --- End Mock ---

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('Network error or unexpected login failure');
  }
}