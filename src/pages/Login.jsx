import React, { useState } from 'react';

export default function Login({ onLogin }) {
    const [isRegistering, setIsRegistering] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        profilePicture: null
    });

    // دالة لتحويل الصورة المرفوعة إلى نص Base64 ليتم حفظها
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profilePicture: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // إرسال البيانات إلى App.jsx
        onLogin({
            name: isRegistering ? (formData.name || 'User') : 'User',
            email: formData.email,
            profilePicture: formData.profilePicture
        });
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* القسم الأيسر - المظلم */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#1A1F2C] text-white flex-col justify-center px-16 relative">
                <div className="mb-8">
                    <h1 className="text-3xl font-light tracking-widest mb-2">EVA STYLE</h1>
                    <div className="w-12 h-1 bg-[#8C7A6B]"></div>
                </div>
                <div className="w-16 h-16 border border-gray-600 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-[#8C7A6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                </div>
                <h2 className="text-4xl font-bold mb-4">Your Privacy is Absolute.</h2>
                <p className="text-gray-400 leading-relaxed max-w-md">
                    We process your digital wardrobe securely. Your personal style data, photos, and psychological profiles are strictly confidential and encrypted. Access is restricted to registered members only.
                </p>
            </div>

            {/* القسم الأيمن - نموذج التسجيل */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 py-12">
                <div className="w-full max-w-md">

                    <div className="text-center mb-10">
                        <div className="w-16 h-16 border rounded-full flex items-center justify-center mx-auto mb-4 text-[#8C7A6B]">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {isRegistering ? 'Create Account' : 'Welcome Back'}
                        </h2>
                        <p className="text-gray-500">
                            {isRegistering ? 'Start building your sustainable wardrobe.' : 'Sign in to access your digital wardrobe.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* إظهار حقول الاسم والصورة فقط في حالة إنشاء حساب جديد */}
                        {isRegistering && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8C7A6B]"
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#8C7A6B] file:text-white hover:file:bg-[#7A6A5C]"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8C7A6B]"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                placeholder="........"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8C7A6B]"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#8C7A6B] hover:bg-[#7A6A5C] text-white font-semibold py-3 rounded-xl transition duration-300 flex justify-center items-center"
                        >
                            {isRegistering ? 'Secure Registration' : 'Sign In'}
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setIsRegistering(!isRegistering)}
                            className="text-gray-600 hover:text-[#8C7A6B] font-medium transition duration-200"
                        >
                            {isRegistering ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}