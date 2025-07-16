import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginForm } from './loginform';
import { SignupForm } from './signupform';
// FIX: The import path is now lowercase to match the actual filename.
import { ThreeJSBackground } from './threejsbackground';
// This component now includes the 3D background and the glassmorphism container.
export const Auth = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    return (_jsxs("div", { className: "relative flex items-center justify-center min-h-screen bg-gray-900 text-white p-4 overflow-hidden", children: [_jsx(ThreeJSBackground, {}), _jsxs("div", { className: "w-full max-w-md p-8 md:p-10 space-y-8 rounded-2xl shadow-2xl", style: {
                    background: 'rgba(25, 28, 36, 0.5)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }, children: [_jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { y: 10, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: -10, opacity: 0 }, transition: { duration: 0.2 }, children: isLoginView ? _jsx(LoginForm, {}) : _jsx(SignupForm, {}) }, isLoginView ? 'login' : 'signup') }), _jsxs("p", { className: "text-sm text-center text-gray-400", children: [isLoginView ? "Don't have an account?" : "Already have an account?", _jsx("button", { onClick: () => setIsLoginView(!isLoginView), className: "ml-1 font-semibold text-purple-400 hover:underline", children: isLoginView ? 'Sign Up' : 'Sign In' })] })] })] }));
};
