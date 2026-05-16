import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem('finSmart_token');

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;