import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

// Get all todos
const getTodos = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config);

    return response.data;
}

// Create new todo
const createTodo = async (todoData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, todoData, config);
}

// Update todo
const updateTodo = async (todoId, todoData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}/${todoId}`, todoData, config);

    return response.data;
}

// Delete todo
const deleteTodo = async (todoId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(`${API_URL}/${todoId}`, config);

    return response.data;
}

export default { getTodos, createTodo, updateTodo, deleteTodo }