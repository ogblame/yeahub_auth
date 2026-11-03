import { Navigate, Route, Routes } from "react-router-dom";
import { AuthPage } from "../../pages/auth/index";
import { SignInForm } from "../../features/sign-in";
import { SignUpForm } from "../../features/sign-up";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AuthPage />}>
        <Route path="/login" element={<SignInForm />} />
        <Route path="/register" element={<SignUpForm />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
