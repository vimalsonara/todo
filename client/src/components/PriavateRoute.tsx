import useUserStore from "@/store/userStore";
import { Navigate, Outlet } from "react-router-dom";

function PriavateRoute() {
  const { user } = useUserStore();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PriavateRoute;
