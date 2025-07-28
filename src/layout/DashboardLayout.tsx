// src/layout/DashboardLayout.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuthStore } from '../store/authStore';
import { Navigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div>
      {/* Sidebar for md+ screens */}
      <aside>
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div>
          <div onClick={() => setSidebarOpen(false)} />
          <div>
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div>
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
