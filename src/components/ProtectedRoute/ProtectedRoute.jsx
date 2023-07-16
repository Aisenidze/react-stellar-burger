import { Route, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const login = JSON.parse(sessionStorage.getItem('login'));
  return (
    <Route
      render={() =>
        login ? (
          children
        ) : (navigate('/login'))
      }
    />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
}