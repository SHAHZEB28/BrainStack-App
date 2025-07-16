import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signUp } from '../../Services/authservice';
const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
export const SignupForm = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(signupSchema),
    });
    const onSubmit = async (data) => {
        try {
            setError(null);
            setSuccess(null);
            const response = await signUp(data);
            setSuccess(response.message || "Signup successful! Please sign in.");
        }
        catch (err) {
            setError(err.response?.data?.message || "An unexpected error occurred.");
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2", children: "Create Account" }), _jsx("p", { className: "text-gray-300", children: "Join the future of knowledge management." })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "signup-username", className: "block text-sm font-medium text-gray-300 mb-1", children: "Username" }), _jsx("input", { id: "signup-username", type: "text", ...register("username"), className: "w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all", placeholder: "choose_a_username" }), errors.username && _jsx("p", { className: "mt-1 text-xs text-red-400", children: errors.username.message })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "signup-password", className: "block text-sm font-medium text-gray-300 mb-1", children: "Password" }), _jsx("input", { id: "signup-password", type: "password", ...register("password"), className: "w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }), errors.password && _jsx("p", { className: "mt-1 text-xs text-red-400", children: errors.password.message })] })] }), error && _jsx("p", { className: "text-sm text-center text-red-400", children: error }), success && _jsx("p", { className: "text-sm text-center text-green-400", children: success }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50", children: isSubmitting ? "Creating Account..." : "Create Account" })] }));
};
