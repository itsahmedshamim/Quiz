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
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-indigo-100/50 backdrop-blur-sm z-0"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-purple-100/50 backdrop-blur-sm z-0"></div>
      
      <motion.div 
        className="relative z-10 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Form header with beautiful background image */}
        <div className="relative p-8 bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden">
          {/* Background image with overlay */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] 
              bg-cover bg-center opacity-20"
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90"></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center">
              <motion.div 
                className="mx-auto mb-6 flex items-center justify-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.div>
              
              <h2 className="text-3xl font-bold text-white mb-3">Begin Your Journey</h2>
              <p className="text-indigo-100 text-lg">
                Enter your details to discover your unique personality
              </p>
            </div>
          </div>
        </div>
        
        {/* Form content */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
                  className={`w-full px-4 py-3 pl-12 bg-gray-50 border rounded-xl focus:ring-2 focus:outline-none transition-all
                    ${errors.name 
                      ? "border-red-300 focus:ring-red-100" 
                      : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-400"}`}
                  disabled={loading}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-500">{errors.name}</p>
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                  className={`w-full px-4 py-3 pl-12 bg-gray-50 border rounded-xl focus:ring-2 focus:outline-none transition-all
                    ${errors.email 
                      ? "border-red-300 focus:ring-red-100" 
                      : "border-gray-200 focus:ring-indigo-100 focus:border-indigo-400"}`}
                  disabled={loading}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-500">{errors.email}</p>
              )}
            </motion.div>
            
            <motion.div 
              className="pt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <motion.button
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                type="submit"
                disabled={loading}
                className={`
                  w-full flex items-center justify-center
                  px-6 py-4
                  text-white font-medium rounded-xl
                  transition-all duration-300
                  focus:outline-none focus:ring-4 focus:ring-indigo-200
                  ${
                    loading 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg"
                  }
                `}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Getting Ready...
                  </>
                ) : (
                  <>
                    Start Personality Quiz
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-3 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
          
          <motion.div 
            className="text-center text-sm text-gray-500 mt-8 pt-6 border-t border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <p>Your privacy is important. We'll never share your information.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}