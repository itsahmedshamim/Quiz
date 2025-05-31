// src/app/components/UserInfoForm.jsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function UserInfoForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="relative min-h-[500px] w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] 
          bg-cover bg-center"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/70 to-pink-900/60"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-indigo-600/20 backdrop-blur-sm"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-purple-600/20 backdrop-blur-sm"></div>
      
      <motion.div 
        className="relative z-10 px-8 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="text-center mb-10">
          <motion.div 
            className="mx-auto mb-6 flex items-center justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-600/80 to-purple-600/80 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Discover Your Personality
          </motion.h2>
          
          <motion.p 
            className="text-indigo-100 text-xl max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Enter your details to begin your journey of self-discovery
          </motion.p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <label htmlFor="name" className="block text-sm font-medium text-indigo-100 mb-2">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl 
                  focus:ring-2 focus:outline-none transition-all placeholder:text-indigo-200
                  ${errors.name 
                    ? "border-red-400 focus:ring-red-200" 
                    : "focus:ring-indigo-200 focus:border-indigo-300"}`}
                disabled={loading}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-200" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {errors.name && (
              <p className="mt-2 text-sm text-red-300">{errors.name}</p>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <label htmlFor="email" className="block text-sm font-medium text-indigo-100 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={`w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl 
                  focus:ring-2 focus:outline-none transition-all placeholder:text-indigo-200
                  ${errors.email 
                    ? "border-red-400 focus:ring-red-200" 
                    : "focus:ring-indigo-200 focus:border-indigo-300"}`}
                disabled={loading}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-200" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-300">{errors.email}</p>
            )}
          </motion.div>
          
          <motion.div 
            className="mt-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <motion.button
              whileHover={!loading ? { scale: 1.03 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              type="submit"
              disabled={loading}
              className={`
                w-full flex items-center justify-center
                px-8 py-4
                text-white font-bold rounded-xl
                transition-all duration-300
                focus:outline-none focus:ring-4 focus:ring-indigo-300/50
                ${
                  loading 
                    ? "bg-gray-500/50 cursor-not-allowed" 
                    : "bg-gradient-to-r from-indigo-600/90 to-purple-600/90 hover:from-indigo-700 hover:to-purple-700 shadow-xl"
                }
              `}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-lg">Processing...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">Start Personality Quiz</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-4 h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="text-center text-sm text-indigo-200 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <p>We respect your privacy. Your information is securely stored and never shared.</p>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}