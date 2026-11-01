import { Route, Routes } from "react-router-dom";
import { SignInPage } from "../../pages/sign-in";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<SignInPage />} />
    </Routes>
  );
}
