import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useAuth;

    if (isLoading) {
        return <div> Loading... </div>
    }

    return user ? children : <Navigate to='/auth/login' />
}

export default PrivateRoute;