import { Navigate } from 'react-router-dom';

const RoleBasedRoutes = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  // If user role does not match requiredRole, redirect to home
  if (user && !requiredRole.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleBasedRoutes;
