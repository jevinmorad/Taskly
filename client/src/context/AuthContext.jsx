import { createContext, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const API_URL = 'http://localhost:5000/api/auth'

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        initializeAuth();
    }, []);

    const initializeAuth = async () => {
        try {
            // Check if we have an access token in localStorage
            const token = localStorage.getItem('accessToken');
            if (token) {
                // Get user data
                const response = await axios.get(`${API_URL}/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUser(response.data.user)
                setAccessToken(token)
            }
        } catch (error) {
            console.error('Auth initialize error: ', error);
            logout();
        } finally {
            setLoading(false);
        }
    }

    /**
     * Handles user registration
     * @param {Object} formData - User data(name, email, password) 
     */
    const register = async (formData) => {
        try {
            const response = await axios.post(`${API_URL}/register`, formData);
            setUser(response.data.user);
            setAccessToken(response.data.setAccessToken);
            navigate('/dashboard');
        } catch (error) {
            throw error;
        }
    }

    /**
     * Handles user login
     * @param {Object} formData - User data(email, password)
     */
    const login = async (formData) => {
        try {
            console.log(formData);
            const response = await axios.post(`${API_URL}/login`, formData);
            console.log(response);

            localStorage.setItem('accessToken', response.data.accessToken);
            console.log(formData);
            setUser(response.data.user);
            setAccessToken(response.data.token);
            navigate('/dashboard');
        } catch (error) {
            throw error;
        }
    }

    /**
     * Handles user logout
     */
    const logout = async () => {
        try {
            await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
            localStorage.removeItem('accessToken');
            setUser(null);
            setAccessToken(null);
        } catch (error) {
            console.error('Logout error', error);
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
        <AuthContext.Provider value={{ user, accessToken, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);