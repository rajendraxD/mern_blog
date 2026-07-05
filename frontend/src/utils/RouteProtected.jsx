import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Loading = () => <h2>Loading</h2>;

export const PublicRoute = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const { isLoading: userLoading } = useSelector((state) => state.user);
  if (isLoading || userLoading) {
    return <Loading />;
  }
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export const ProtectedRoute = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const { isLoading: userLoading } = useSelector((state) => state.user);
  if (isLoading || userLoading) {
    return <Loading />;
  }
  if (user) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};
