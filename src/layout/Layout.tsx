// src/layout/Layout.tsx

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';


function Layout() { // Layout component is now defined before App
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen font-inter antialiased"> {/* Main container is now flex row */}
      {/* The script and link tags were removed from here as they are not valid in React component JSX.
          The Canvas environment is expected to handle global CSS/font loading. */}

      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} /> {/* Sidebar remains on the left */}
      <div className="flex flex-col flex-1"> {/* This div now contains Header and main content, stacked vertically */}
        <Header /> {/* Header component is now inside this flex-col container */}
        <main className="flex-1 overflow-auto bg-gray-50 flex flex-col"> {/* main content takes remaining height, added flex-col */}
          <div className="flex-1"> {/* This div will contain the page content and take up available space */}
            <Outlet /> {/* Outlet renders the child routes */}
          </div>
          <Footer /> {/* Footer component added here */}
        </main>
      </div>
    </div>
  );
}

export default Layout;