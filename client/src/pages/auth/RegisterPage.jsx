import { useState } from 'react';
import { Mail, Lock, User, ArrowRight, CheckSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { name, email, password } = formData;
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ name, email, password });
            navigate('/');
        } catch (error) {
            console.log('Registration failed. Please try again.');
            throw error;
        }
        await register({ name, email, password });
    }

    const handleGoogleLogin = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/google`,
            "_self"
        )
    }

    return (
        <div className="flex h-screen w-full overflow-hidden bg-white">
            {/* Left Side - Logo & Branding */}
            <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 px-8 py-8 text-white">
                <div className="mb-6 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white p-4">
                        <CheckSquare className="h-12 w-12 text-blue-600" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold">Taskly</h1>
                <p className="mt-2 text-xl font-light">Organize your tasks with ease</p>

                <div className="mt-10 max-w-md">
                    <div className="mb-6 flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                            <CheckSquare className="h-4 w-4" />
                        </div>
                        <p className="text-lg">Create and manage tasks effortlessly</p>
                    </div>
                    <div className="mb-6 flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                            <CheckSquare className="h-4 w-4" />
                        </div>
                        <p className="text-lg">Track your productivity with ease</p>
                    </div>
                    <div className="mb-6 flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                            <CheckSquare className="h-4 w-4" />
                        </div>
                        <p className="text-lg">Collaborate with your team</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Authentication Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    {/* Logo for Mobile */}
                    <div className="mb-12 flex md:hidden items-center justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 p-3">
                            <CheckSquare className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="ml-3 text-3xl font-bold text-gray-800">Taskly</h1>
                    </div>

                    <h2 className="mb-2 text-3xl font-bold text-gray-800">Create Account</h2>
                    <p className="mb-8 text-gray-600">
                        Sign up to start organizing your tasks
                    </p>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Name Field - Only for Signup */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <User className="h-5 w-5 text-blue-500" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={name}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail className="h-5 w-5 text-blue-500" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
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
                                    <Lock className="h-5 w-5 text-blue-500" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type='password'
                                    value={password}
                                    onChange={handleChange}
                                    autoComplete='new-password'
                                    required
                                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    placeholder='Create password'
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-3 px-4 text-sm font-medium text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                        >
                            <span className="text-base">Create account</span>
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                    </form>

                    {/* Or Divider */}
                    <div className="relative mt-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="gap-3 mt-5">
                        {/* Google Login */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-3 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
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

                    {/* Switch to Login */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?
                        <Link
                            to={'/auth/login'}
                            className="ml-1 font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage