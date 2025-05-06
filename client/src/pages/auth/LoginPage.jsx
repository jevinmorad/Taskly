import { useEffect, useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { email, password } = formData;
    const { login } = useAuth();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (user) {
    //         navigate('/dashboard');
    //     }
    // }, [user, navigate]);

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            navigate('/dashboard');
        } catch (error) {
            console.log('Login failed. Please check your credentials.');
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleGoogleLogin = () => {
        console.log('Google login clicked');
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 text-white">
                    <h2 className="text-3xl font-bold">Welcome Back</h2>
                    <p className="mt-2 text-blue-100">
                        Sign in to access your account
                    </p>
                </div>

                {/* Form Container */}
                <form className="p-8" onSubmit={handleSubmit}>
                    <div className="space-y-5">

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type='password'
                                    value={password}
                                    onChange={handleChange}
                                    autoComplete='current-password'
                                    required
                                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder='••••••••'
                                />
                            </div>
                        </div>

                        <div className="text-right">
                            <button
                                type="button"
                                className="text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 py-3 px-4 text-sm font-medium text-white shadow-md hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <span>Sign In</span>
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </button>

                        {/* Or Divider */}
                        <div className="relative mt-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 186.69 190.5">
                                <g transform="translate(1184.583 765.171)">
                                    <path fill="#4285f4" d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z" />
                                    <path fill="#34a853" d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z" />
                                    <path fill="#fbbc05" d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z" />
                                    <path fill="#ea4335" d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z" />
                                </g>
                            </svg>
                            <span>Google</span>
                        </button>
                    </div>

                    {/* Switch between Login and Signup */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?
                        <button
                            onClick={() => navigate('/auth/register')}
                            className="ml-1 font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
                        >
                            Sign up
                        </button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage