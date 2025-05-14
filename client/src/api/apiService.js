import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

let accessToken = null;

// Axios request interceptor for adding auth header
axios.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

// Axios response interceptor for token refresh
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't already retried
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh tokens
                const { data } = await api.post('/auth/refresh-token');
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

                // Retry original request
                return axios(originalRequest);
            } catch (refreshError) {
                await api.post('/auth/logout');
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
)

/**
 * Auth API methods
 */
export const authApi = {
    getUser: () => api.get('/auth/me'),
    register: (userData) => api.post('/auth/register', userData),
    login: (userData) => api.post('/auth/login', userData),
    logout: () => api.post('/auth/logout'),
    checkSession: () => api.get('/auth/check-session'),
    refreshToken: () => api.post('/auth/refresh-token'),
}

export default api