import { Navigate, useLocation, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'
import { useEffect, useMemo } from "react";

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = JSON.parse(sessionStorage.getItem('login'));

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

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
}