import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';


// AuthChecker component to handle authentication redirection
const AuthChecker = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If not logged in AND trying to access a protected route, redirect to login
    if (!isLoggedIn && location.pathname !== '/login') {
      navigate('/login');
    }
    // If logged in AND on the login page, redirect to dashboard
    else if (isLoggedIn && location.pathname === '/login') {
      navigate('/');
    }
  }, [isLoggedIn, navigate, location.pathname]);

  // Render the child routes. If not logged in, the navigate will handle redirection.
  // If logged in, Outlet will render the protected content.
  return <Outlet />;
};

export default AuthChecker;