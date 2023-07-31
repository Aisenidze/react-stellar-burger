import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { FC, ReactElement, useEffect, useMemo } from "react";

interface ProtectedRouteProps {
  children: ReactElement;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = JSON.parse(sessionStorage.getItem('login') || '{}');

  const login = useMemo(() => {
    return location?.pathname === '/register' || location?.pathname === '/login' || location?.pathname === '/reset-password' || location?.pathname === '/forgot-password'
  }, [location?.pathname])

  const notLogin = useMemo(() => {
    return location?.pathname === '/profile'
  }, [location?.pathname]);

  useEffect(() => {
    if (auth && login) {
      navigate('/');
    }
  }, [auth, login, navigate]);

  useEffect(() => {
    if (!auth && notLogin) {
      navigate('/login')
    }
  }, [notLogin, auth, navigate])

  if (!auth && !login) {
    return <Navigate to={location} state={{ from: location}} />
  }

  return children;
}
