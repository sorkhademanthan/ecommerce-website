import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks';

const AdminRoute = () => {
  const { userInfo } = useAppSelector((state) => state.auth);

  // Check if user is logged in AND is an admin
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
export default AdminRoute;