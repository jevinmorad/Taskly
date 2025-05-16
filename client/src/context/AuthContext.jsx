import { createContext, useEffect, useState, useContext } from 'react';
import { authApi } from '../api/apiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState(null);

    const validateSession = async () => {
        setLoading(true);
        try {
            const response = await authApi.checkSession();
            setUser(response.data.user);
            setAccessToken(response.data.accessToken);
        } catch (error) {
            setUser(null)
            setAccessToken(null)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        validateSession();
    }, []);

    /**
     * Handles user registration
     * @param {Object} formData - User data(name, email, password) 
     */
    const register = async (formData) => {
        try {
            const response = await authApi.register(formData);
            setUser(response.data.user);
            setAccessToken(response.data.accessToken);
        } catch (error) {
            await authApi.logout();
            throw error;
        } finally {
            setLoading(false);
        }
    }

    /**
     * Handles user login
     * @param {Object} formData - User data(email, password)
     */
    const login = async (formData) => {
        setLoading(true);
        try {
            const response = await authApi.login(formData);
            setUser(response.data.user);
            setAccessToken(response.data.accessToken);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    /**
     * Handles user logout
     */
    const logout = async () => {
        try {
            await authApi.logout();
            setUser(null);
            setAccessToken(null);
        } catch (error) {
            console.error('Logout error', error)
            throw error;
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!accessToken,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);