import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

<<<<<<< HEAD
const PrivateRoute = () => {
    const { isAuthenticated, loading } = useAuth();
=======
const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useAuth;
>>>>>>> 2b500f0 (on check)

    if (loading) return null

<<<<<<< HEAD
    return isAuthenticated ? <Outlet /> : <Navigate to='/auth/login' />
=======
    return user ? children : <Navigate to='/auth/login' />
>>>>>>> 2b500f0 (on check)
}

export default PrivateRoute;