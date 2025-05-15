import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />} >
              <Route path="/" element={<Dashboard />} />
            </Route>
            <Route path='/auth/register' element={<RegisterPage />} />
            <Route path='/auth/login' element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}