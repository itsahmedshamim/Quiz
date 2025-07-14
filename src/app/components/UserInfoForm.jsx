'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiUser, FiMail, FiLock } from 'react-icons/fi';

export default function UserInfoForm({ onSubmit, loading }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Please enter your name';
    if (!email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    localStorage.setItem('userEmail', email);
    onSubmit({ name, email });
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-8">
         <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-5">
  <img
    src="/assets/person-photo.png"        /* ← use a 160×160px (or larger) source */
    alt="Profile"
    className="w-full h-full object-cover"
  />
</div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
           What's Your Leadership Archetype?
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            The Confidence Code: What's shaping how you speak up and stand out?
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 text-sm ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 text-sm ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="john@example.com"
              />
            </div>
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
          </div>

       {/* Submit Button */}
<button
  type="submit"
  disabled={loading}
  className={`w-full flex justify-between items-center py-4 px-5 bg-[#022f6b] text-white font-semibold text-sm rounded-xl shadow-lg transition-all duration-200 ${
    loading
      ? "opacity-70 cursor-not-allowed"
      : "hover:bg-[#021e4f] hover:shadow-xl"
  }`}
>
  {loading ? (
    <div className="flex items-center mx-auto">
      <svg
        className="animate-spin mr-2 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        ></path>
      </svg>
      Processing...
    </div>
  ) : (
    <>
      <span>Discover Your Dominant Confidence Archetype</span>
      <FiArrowRight className="ml-2 w-5 h-5" />
    </>
  )}
</button>


          {/* Updated Privacy Notice with Icon */}
          <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
            <FiLock className="flex-shrink-0 mr-1.5 text-gray-400" />
            <span>Your data is secure & used solely for personalization</span>
          </div>
        </form>
      </div>
    </motion.div>
  );
}