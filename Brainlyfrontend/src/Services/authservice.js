import { api } from './api'; // FIX: Changed to a named import to match the updated api.ts file.
import { z } from 'zod';
// Zod schema for login credentials for runtime validation
const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});
// Zod schema for signup credentials
const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
/**
 * Handles the user sign-in process.
 * @param credentials - The user's login credentials (username and password).
 * @returns The JWT token if login is successful.
 */
export const signIn = async (credentials) => {
    // Validate input at runtime
    loginSchema.parse(credentials);
    const { data } = await api.post('/signin', credentials);
    // Store the token in localStorage for session persistence
    if (data.token) {
        localStorage.setItem('token', data.token);
    }
    return data;
};
/**
 * Handles the user sign-up process.
 * @param userData - The new user's data (username and password).
 * @returns The response message from the server.
 */
export const signUp = async (userData) => {
    // Validate input at runtime
    signupSchema.parse(userData);
    const { data } = await api.post('/signup', userData);
    return data;
};
/**
 * Logs the user out by removing the token from localStorage.
 */
export const signOut = () => {
    localStorage.removeItem('token');
};
