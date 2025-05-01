import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useContext, useEffect } from 'react';
import Dashboard from './Dashboard';

const Home = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    return (
        <div className="text-center mt-24">
            <h1 className="text-4xl font-bold mb-6">
                Welcome to the Todo App
            </h1>
            <p className="text-2xl">
                <Link
                    to="/auth/login"
                    className="text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                    Login
                </Link> or <Link
                    to="/signup"
                    className="text-indigo-text hover:text-indigo-hover hover:underline"
                >
                    Register
                </Link> to get started
            </p>
        </div>
    );
}

export default Home