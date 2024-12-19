import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Notifications from "./pages/Notifications";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import Login from "./components/auth/Login";
import Layout from "./components/layout/Layout";
import AuthLayout from "./components/layout/AuthLayout";
import EnterPassword from "./components/auth/EnterPassword";
import SignUp from "./components/auth/SignUp";
import ComingSoon from "./pages/ComingSoon";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, username } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  // if (!user.isVerified) {
  //   return <Navigate to="/" replace />;
  // }
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <RedirectAuthenticatedUser>
            <AuthLayout>
              <Login />
            </AuthLayout>
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/enter-password"
        element={
          <RedirectAuthenticatedUser>
            <AuthLayout>
              <EnterPassword />
            </AuthLayout>
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/signup"
        element={
          <RedirectAuthenticatedUser>
            <AuthLayout>
              <SignUp />
            </AuthLayout>
          </RedirectAuthenticatedUser>
        }
      />

      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}
