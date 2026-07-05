import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";

export const PublicRoute = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const { isLoading: userLoading } = useSelector((state) => state.user);
  if (isLoading || userLoading) {
    return <LoadingSpinner />;
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
    return <LoadingSpinner />;
  }
  if (user) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};
