import { Navigate, Route, Routes } from "react-router-dom";
import { AuthPage } from "../../pages/auth";
import { ProfilePage } from "../../pages/profile";
import { SignInForm } from "../../features/sign-in";
import { SignUpForm } from "../../features/sign-up";
import { ProtectedRoute } from "./ProtectedRoute";
import { GuestRoute } from "./GuestRoute";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route element={<AuthPage />}>
          <Route path="/login" element={<SignInForm />} />
          <Route path="/register" element={<SignUpForm />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
