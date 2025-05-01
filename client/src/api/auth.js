import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Signup user
const signup = async (userData) => {
    const response = await axios.post(`${API_URL}/signup`, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

// Login user
const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);

    if (response.data) {
        localStorage.setItem('token', JSON.stringify(response.data));
    }

    return response.data;
}

// Get user data
const getMe = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.get(`${API_URL}/me`, config);

    return response.data;
}

// Logout user
const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token')
}

const authServices = { signup, login, getMe, logout }

export default authServices