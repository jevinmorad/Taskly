import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import authServices from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('token'));
            if (userData && userData.token) {
                const decoded = jwtDecode(userData.token);
                const currentTime = Date.now() / 1000;

                if (decoded.exp < currentTime) {
                    logout();
                    return;
                }

                // Fetch user data
                const user = await authServices.getMe(userData.token);
                setUser(user);
            }
        } catch (error) {
            logout();
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    // Signup user
    const signup = async (formData) => {
        try {
            console.log(formData);
            const user = await authServices.signup(formData);
            setUser(user);
            setIsLoading(false);
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    }

    // Login user
    const login = async (formData) => {
        try {
            const user = await authServices.login(formData);
            setUser(user);
            setIsLoading(false);
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    }

    // Logout user
    const logout = () => {
        authServices.logout();
        setUser(null);
        navigate('/auth/login');
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, error, signup, login, logout, setError }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext