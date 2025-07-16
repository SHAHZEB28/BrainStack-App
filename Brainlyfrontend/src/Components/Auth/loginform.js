import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from '../../Services/authservice';
const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});
export const LoginForm = () => {
    const [error, setError] = useState(null);
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(loginSchema),
    });
    const onSubmit = async (data) => {
        try {
            setError(null);
            await signIn(data);
            window.location.reload();
        }
        catch (err) {
            setError(err.response?.data?.message || "An unexpected error occurred.");
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2", children: "Welcome Back" }), _jsx("p", { className: "text-gray-300", children: "Sign in to access your Second Brain." })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "login-username", className: "block text-sm font-medium text-gray-300 mb-1", children: "Username" }), _jsx("input", { id: "login-username", type: "text", ...register("username"), className: "w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all", placeholder: "your_username" }), errors.username && _jsx("p", { className: "mt-1 text-xs text-red-400", children: errors.username.message })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "login-password", className: "block text-sm font-medium text-gray-300 mb-1", children: "Password" }), _jsx("input", { id: "login-password", type: "password", ...register("password"), className: "w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }), errors.password && _jsx("p", { className: "mt-1 text-xs text-red-400", children: errors.password.message })] })] }), error && _jsx("p", { className: "text-sm text-center text-red-400", children: error }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50", children: isSubmitting ? "Signing In..." : "Sign In" })] }));
};
