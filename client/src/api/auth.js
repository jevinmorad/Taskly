import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Signup user
const signup = async (credentials) => {
    const response = await axios.post(`${API_URL}/signup`, credentials);

    return response.data;
}

// Login user
const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);

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
const logout = async () => {
    await axios.post(`${API_URL}/logout`);
}

const authServices = { signup, login, getMe, logout }

export default authServices