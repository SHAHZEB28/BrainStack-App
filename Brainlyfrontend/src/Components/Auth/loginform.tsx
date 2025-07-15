import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn, LoginData } from '../../Services/authservice';
import { Button } from '../button'; // Assuming button is styled appropriately

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      setError(null);
      await signIn(data);
      window.location.reload();
    } catch (err: any) {
      setError(err.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">Welcome Back</h1>
        <p className="text-gray-300">Sign in to access your Second Brain.</p>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="login-username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
          <input
            id="login-username"
            type="text"
            {...register("username")}
            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            placeholder="your_username"
          />
          {errors.username && <p className="mt-1 text-xs text-red-400">{errors.username.message}</p>}
        </div>
        <div>
          <label htmlFor="login-password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
          <input
            id="login-password"
            type="password"
            {...register("password")}
            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            placeholder="••••••••"
          />
          {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
        </div>
      </div>
      {error && <p className="text-sm text-center text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50"
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};
