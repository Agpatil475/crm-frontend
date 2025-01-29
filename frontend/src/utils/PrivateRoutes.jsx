import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  
  // If there is no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoutes;
