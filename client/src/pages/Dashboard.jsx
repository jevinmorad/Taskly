import Navbar from '../components/Navbar';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex h-screen bg-gray-200 dark:bg-gray-900">
        <Navbar />
      </div>
      <div className="min-h-screen flex flex-col">
        {/* AppBar */}
        <header className="bg-indigo-600 text-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo/Title */}
              <div className="flex-grow">
                <Link
                  to="/"
                  className="text-xl font-semibold hover:text-white no-underline"
                >
                  Todo App
                </Link>
              </div>

              {/* Navigation Links */}
              <nav className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout()
                  }}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Logout
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 flex-grow max-w-4xl">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
