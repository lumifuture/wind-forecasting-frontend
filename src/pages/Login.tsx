// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const token = await login(username, password);
      setToken(token);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 p-4"> {/* Gradient background */}
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-xl shadow-strong border border-primary-200"> {/* Smoother border, stronger shadow */}
        <h2 className="text-4xl font-extrabold text-center mb-8 text-primary-700">Welcome Back!</h2> {/* Larger, bolder title */}
        <p className="text-center text-secondary-600 mb-6">Sign in to access the Wind Flow Dashboard</p> {/* Subtitle */}

        {error && (
          <div className="bg-danger-100 border border-danger text-danger-700 px-4 py-3 rounded-md relative mb-4 text-sm font-medium" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-secondary-700 text-sm font-semibold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200 ease-in-out text-secondary-800 placeholder-secondary-400"
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <label className="block text-secondary-700 text-sm font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="123456"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200 ease-in-out text-secondary-800 placeholder-secondary-400"
            disabled={loading}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleLogin}
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition duration-200 ease-in-out w-full text-lg shadow-medium"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}