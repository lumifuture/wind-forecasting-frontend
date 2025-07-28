// src/components/Header.tsx
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useModelStore } from '../store/modelStore';
import { useState, useEffect } from 'react';

interface HeaderProps {} // Empty interface as no props are currently passed

function Header({}: HeaderProps) {
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const models = useModelStore((state) => state.models);
  const activeModelId = useModelStore((state) => state.activeModelId);
  const activeModelName = models.find((m) => m.id === activeModelId)?.name || 'N/A';

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleLogout = () => logout();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 py-3">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-2xl font-extrabold text-blue-700 hover:text-blue-800">
          🌬️ WindFlow Dashboard
        </Link>
        <span className="hidden sm:inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold select-none">
          Active Model: {activeModelName}
        </span>
      </div>

      <div className="flex items-center space-x-6 text-sm text-gray-600">
        <span className="select-none">
          📅 {formattedDate}, 🕒 {formattedTime}
        </span>

        {isLoggedIn ? (
          <>
            <span className="hidden sm:inline">Welcome, <strong>Admin</strong></span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow transition"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;