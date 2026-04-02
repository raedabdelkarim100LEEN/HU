import React, { useState } from 'react';
import { Mail, Key, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

export default function Login({ onLogin }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            // 👈 التعديل هنا: نرسل الإيميل للمدير (App.jsx) ليعرف من الذي دخل
            onLogin(email);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] font-sans flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#EAE4D8]/40 to-transparent -z-10"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#8B7355]/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gray-300/20 rounded-full blur-3xl -z-10"></div>

            <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">

                <div className="w-full md:w-5/12 bg-gray-900 text-white p-12 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=800&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl font-light tracking-widest mb-2">EVA STYLE</h2>
                        <div className="w-12 h-1 bg-[#8B7355] mb-12"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md inline-block mb-6 border border-white/20">
                            <ShieldCheck size={32} className="text-[#D2C4B3]" />
                        </div>
                        <h3 className="text-2xl font-medium mb-4">Your Privacy is Absolute.</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            We process your digital wardrobe securely. Your personal style data, photos, and psychological profiles are strictly confidential and encrypted. Access is restricted to registered members only.
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-7/12 p-12 flex flex-col justify-center bg-white">
                    <div className="max-w-md mx-auto w-full">
                        <div className="flex justify-center mb-8">
                            <div className="p-4 bg-gray-50 rounded-full border border-gray-100 shadow-sm">
                                <Lock size={28} className="text-[#8B7355]" />
                            </div>
                        </div>

                        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-2">
                            {isRegistering ? 'Create Account' : 'Welcome Back'}
                        </h1>
                        <p className="text-center text-gray-500 mb-10">
                            {isRegistering ? 'Start building your sustainable wardrobe.' : 'Enter your credentials to access your closet.'}
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none transition-all"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Key size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#8B7355] hover:bg-[#735F46] text-white py-4 rounded-2xl font-medium transition-all shadow-lg hover:shadow-xl flex justify-center items-center gap-2 mt-4"
                            >
                                {isRegistering ? 'Secure Registration' : 'Secure Login'} <ArrowRight size={18} />
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <button
                                onClick={() => setIsRegistering(!isRegistering)}
                                type="button"
                                className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                            >
                                {isRegistering ? 'Already have an account? Sign in' : "Don't have an account? Register now"}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}