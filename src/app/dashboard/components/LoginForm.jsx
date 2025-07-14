// File: src/app/dashboard/components/LoginForm.jsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiLock, FiLogIn, FiAlertCircle, FiHome } from 'react-icons/fi';

export default function LoginForm({ onLogin, errorMessage }) {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fieldError, setFieldError] = useState({ username: '', password: '' });
  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Basic "required" validation
  const validateFields = () => {
    const errors = { username: '', password: '' };
    if (!username.trim()) {
      errors.username = 'Username is required';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    }
    setFieldError(errors);
    return !errors.username && !errors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validateFields()) return;

    setIsLoading(true);
    try {
      await Promise.resolve(onLogin(username, password));
    } catch (err) {
      setSubmitError(err?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Gradient Mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#022f6b]/20 via-gray-900 to-black" />
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
      </div>

      {/* Home Button */}
      <div className="relative z-10 p-6">
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <FiHome className="mr-2 h-5 w-5" />
          Home
        </button>
      </div>

      {/* Form Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-md w-full border border-[#022f6b]/20">
          {/* Icon + Title */}
          <div className="text-center mb-8">
            <div className="bg-[#022f6b] text-white rounded-2xl p-4 w-20 h-20 mx-auto flex items-center justify-center mb-4 shadow-lg">
              <FiLock className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-100 mb-2 tracking-tight">Admin Portal</h2>
            <p className="text-gray-400 font-light">Secure access to dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm text-gray-300 mb-2 font-medium">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`
                  w-full bg-gray-700/60 border ${
                    fieldError.username ? 'border-red-500' : 'border-[#022f6b]/50'
                  } rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500
                  focus:outline-none focus:ring-2 ${
                    fieldError.username ? 'focus:ring-red-500' : 'focus:ring-[#022f6b]'
                  } transition-all duration-200
                `}
                placeholder="admin@example.com"
                autoFocus
              />
              {fieldError.username && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <FiAlertCircle className="mr-2" /> {fieldError.username}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm text-gray-300 font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`
                  w-full bg-gray-700/60 border ${
                    fieldError.password ? 'border-red-500' : 'border-[#022f6b]/50'
                  } rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500
                  focus:outline-none focus:ring-2 ${
                    fieldError.password ? 'focus:ring-red-500' : 'focus:ring-[#022f6b]'
                  } transition-all duration-200
                `}
                placeholder="••••••••"
              />
              {fieldError.password && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <FiAlertCircle className="mr-2" /> {fieldError.password}
                </p>
              )}
            </div>

            {/* Server-side / Custom Error */}
            {(errorMessage || submitError) && (
              <div
                role="alert"
                className="bg-red-900/60 text-red-200 rounded-xl p-3 text-sm flex items-center border border-red-700/50"
              >
                <FiAlertCircle className="mr-3 flex-shrink-0" />
                <span>{errorMessage || submitError}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full bg-[#022f6b] text-white font-medium py-3.5 rounded-xl 
                flex items-center justify-center transition-all duration-300 transform hover:-translate-y-0.5
                focus:outline-none focus:ring-2 focus:ring-[#022f6b] focus:ring-offset-2 focus:ring-offset-gray-800
                shadow-lg hover:bg-[#c2a070] hover:shadow-[#c2a070]/20
                ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}
              `}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  <FiLogIn className="mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer Note */}
          <p className="mt-6 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Admin Portal. Restricted access.
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0) rotate(0); }
          33% { transform: translateY(-20px) translateX(10px) rotate(5deg); }
          66% { transform: translateY(10px) translateX(-15px) rotate(-5deg); }
          100% { transform: translateY(0) translateX(0) rotate(0); }
        }
      `}</style>
    </div>
  );
}
