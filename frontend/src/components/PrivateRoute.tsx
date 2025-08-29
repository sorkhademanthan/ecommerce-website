import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks';

const PrivateRoute = () => {
  const { userInfo } = useAppSelector((state) => state.auth);

  // If userInfo exists, the user is logged in, so render the child route.
  // Otherwise, redirect to the login page.
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;