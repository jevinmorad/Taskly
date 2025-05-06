import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
<<<<<<< HEAD
import PrivateRoute from "./components/PrivateRoute";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CallbackPage from "./pages/auth/CallbackPage.jsx";
=======
import HomePage from "./pages/HomePage.jsx";
import PrivateRoute from "./components/PrivateRoute";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
>>>>>>> 2b500f0 (on check)

export default function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />} >
              <Route path="/" element={<Dashboard />} />
            </Route>
            <Route path='/auth/register' element={<RegisterPage />} />
            <Route path='/auth/login' element={<LoginPage />} />
            <Route path='/auth/callback' element={<CallbackPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </GoogleOAuthProvider>
=======
      <AuthProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/auth/register' element={<RegisterPage />} />
          <Route path='/auth/login' element={<LoginPage />} />
          <Route element={<PrivateRoute />} >
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
>>>>>>> 2b500f0 (on check)
    </BrowserRouter>
  );
}