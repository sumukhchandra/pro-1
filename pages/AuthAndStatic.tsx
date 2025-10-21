import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../types';
import { MOCK_USERS, Logo } from '../constants';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Please enter a valid email.');
            return;
        }

        const result = login(email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.error || 'Login failed.');
        }
    };

    return (
        <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="mb-10 text-center">
                    <Logo className="justify-center"/>
                </div>
                <div className="bg-black/30 border border-[#D4AF37]/30 rounded-2xl shadow-2xl shadow-black/50 p-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full bg-transparent border-0 border-b-2 border-gray-600 focus:border-[#D4AF37] focus:ring-0 text-white p-2 transition duration-300"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-400">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full bg-transparent border-0 border-b-2 border-gray-600 focus:border-[#D4AF37] focus:ring-0 text-white p-2 transition duration-300"
                                placeholder="••••••••"
                            />
                        </div>
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                        <div className="flex items-center justify-between">
                            <a href="#" className="text-sm text-[#D4AF37] hover:text-[#FFD700]">Forgot password?</a>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-black bg-[#D4AF37] hover:bg-[#FFD700] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD700] transition-transform hover:scale-105 duration-300"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-[#D4AF37] hover:text-[#FFD700]">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export function RegistrationPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const result = register(email, password);
        if (result.success) {
            navigate('/'); // Navigate to home on successful registration and auto-login
        } else {
            setError(result.error || 'Registration failed.');
        }
    };

    return (
        <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="mb-10 text-center">
                    <Logo className="justify-center"/>
                </div>
                <div className="bg-black/30 border border-[#D4AF37]/30 rounded-2xl shadow-2xl shadow-black/50 p-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-6">Create Account</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full bg-transparent border-0 border-b-2 border-gray-600 focus:border-[#D4AF37] focus:ring-0 text-white p-2 transition duration-300"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-400">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full bg-transparent border-0 border-b-2 border-gray-600 focus:border-[#D4AF37] focus:ring-0 text-white p-2 transition duration-300"
                                placeholder="••••••••"
                            />
                        </div>
                         <div>
                            <label htmlFor="confirm-password" className="text-sm font-medium text-gray-400">Confirm Password</label>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="mt-1 block w-full bg-transparent border-0 border-b-2 border-gray-600 focus:border-[#D4AF37] focus:ring-0 text-white p-2 transition duration-300"
                                placeholder="••••••••"
                            />
                        </div>
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-black bg-[#D4AF37] hover:bg-[#FFD700] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD700] transition-transform hover:scale-105 duration-300"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-[#D4AF37] hover:text-[#FFD700]">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

const StaticPageLayout = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="min-h-screen bg-[#111111] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link to="/" className="text-[#D4AF37] hover:text-[#FFD700] transition-colors">&larr; Back to Library</Link>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-[#D4AF37] font-serif mb-8">{title}</h1>
                <div className="bg-black/30 p-8 rounded-lg border border-[#D4AF37]/20 space-y-4 text-gray-300 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    </div>
);

type StaticPageType = 'contact' | 'terms';

export function StaticPage({ type }: { type: StaticPageType }) {
    const pageContent = {
        contact: {
            title: 'Contact Us',
            content: (
                <>
                    <p>If you have any questions or need assistance, feel free to reach out to us.</p>
                    <p><strong>Email:</strong> name@gmail.com</p>
                    <p><strong>Phone:</strong> +1 (XXX) XXX-XXXX</p>
                </>
            ),
        },
        terms: {
            title: 'Terms & Conditions',
            content: <p>Hello world</p>,
        },
    };

    const { title, content } = pageContent[type];

    return <StaticPageLayout title={title}>{content}</StaticPageLayout>;
}

export function NotFoundPage() {
    return (
        <div className="min-h-screen bg-[#111111] text-white flex flex-col items-center justify-center">
            <h1 className="text-9xl font-bold text-[#D4AF37] font-serif">404</h1>
            <p className="text-2xl mt-4 text-gray-300">Page Not Found</p>
            <Link to="/" className="mt-8 px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#FFD700] transition-colors">
                Return to the Library
            </Link>
        </div>
    );
}
