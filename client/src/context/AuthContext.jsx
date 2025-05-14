import { createContext, useEffect, useState, useContext } from 'react';
import { authApi } from '../api/apiService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const API_URL = 'http://localhost:5000/api/auth'

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

    /**
     * Refreshes access token using refresh token
     */
    const refreshToken = async () => {
        try {
            const response = await axios.post(`${API_URL}/refresh-token`, {}, { withCredentials: true });
            localStorage.setItem('accessToken', response.data.accessToken);
            setAccessToken(response.data.accessToken);
            return response.data.accessToken;
        } catch (error) {
            logout();
            throw error;
        }
    }

    // Axios response interceptor for token refresh
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;

                // If error is 401 and we haven't already retried
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const newAccessToken = await refreshToken();
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return axios(originalRequest);
                    } catch (refreshError) {
                        logout();
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    // Axios request interceptor for adding auth header
    useEffect(() => {
        const interceptor = axios.interceptors.request.use(config => {
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        });

        return () => {
            axios.interceptors.request.eject(interceptor);
        };
    }, [accessToken]);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!accessToken,
                register,
                login,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);