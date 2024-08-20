import { useAuth } from "../../context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RestrictedRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return <Navigate to="/" replace state={{ path: location.pathname }} />;
  } else {
    return <Outlet />;
  }
};

export default RestrictedRoute;
