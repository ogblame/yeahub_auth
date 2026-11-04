import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../providers/store/store";

export function GuestRoute() {
  const accessToken = useSelector(
    (state: RootState) => state.session.accessToken,
  );

  if (accessToken) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}
