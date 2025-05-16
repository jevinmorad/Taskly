import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null

    return isAuthenticated ? <Outlet /> : <Navigate to='/auth/login' />
}

export default PrivateRoute;