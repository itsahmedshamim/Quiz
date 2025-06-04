'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import LoginForm from './components/LoginForm';
import MobileWarning from './components/MobileWarning';
import SummaryCards from './components/SummaryCards';
import ResultsTable from './components/ResultsTable';

import { FiLogOut } from 'react-icons/fi';

const archetypeColors = {
  Perfectionist: {
    gradient: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-900',
    border: 'border-blue-700',
    text: 'text-blue-200',
  },
  'Quiet Achiever': {
    gradient: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-900',
    border: 'border-purple-700',
    text: 'text-purple-200',
  },
  'People-Pleaser': {
    gradient: 'from-pink-500 to-pink-600',
    bg: 'bg-pink-900',
    border: 'border-pink-700',
    text: 'text-pink-200',
  },
  'Hidden Leader': {
    gradient: 'from-indigo-500 to-indigo-600',
    bg: 'bg-indigo-900',
    border: 'border-indigo-700',
    text: 'text-indigo-200',
  },
  'Bold Believer': {
    gradient: 'from-teal-500 to-teal-600',
    bg: 'bg-teal-900',
    border: 'border-teal-700',
    text: 'text-teal-200',
  },
};

export default function DashboardPage() {
  const router = useRouter();

  // State
  const [checkingSession, setCheckingSession] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [results, setResults] = useState([]);
  const [countsByArchetype, setCountsByArchetype] = useState({});
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All Archetypes');
  const [isMobile, setIsMobile] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Detect small screens and check session on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    fetch('/api/check-session')
      .then((res) => res.json())
      .then((data) => {
        if (data.isAuthenticated) {
          setIsAuthenticated(true);
          loadResults();
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => setCheckingSession(false));

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch protected results
  const loadResults = () => {
    setLoadingData(true);
    fetch('/api/get-results')
      .then((res) => {
        if (res.status === 401) {
          doLogout();
          throw new Error('Not authenticated');
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setResults(data.results);
          const counts = {};
          data.results.forEach((doc) => {
            const key = doc.archetype || 'Unknown';
            counts[key] = (counts[key] || 0) + 1;
          });
          setCountsByArchetype(counts);
        } else {
          throw new Error(data.error || 'Server error');
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoadingData(false));
  };

  // Handle login
  const handleLogin = async (username, password) => {
    setLoginError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.status === 200) {
        setIsAuthenticated(true);
        loadResults();
      } else {
        const data = await res.json();
        setLoginError(data.error || 'Login failed');
      }
    } catch {
      setLoginError('Network error');
    }
  };

  // Handle logout
  const doLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setResults([]);
    setCountsByArchetype({});
    setError(null);
    setFilter('All Archetypes');
    setLoginError('');
  };

  // Handle delete
  const handleDelete = (id) => {
    fetch('/api/delete-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then((res) => {
        if (res.status === 401) {
          doLogout();
          throw new Error('Not authenticated');
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setResults((prev) => prev.filter((r) => r._id !== id));
          setCountsByArchetype((prev) => {
            const updated = { ...prev };
            const archetype = results.find((r) => r._id === id)?.archetype;
            if (archetype && updated[archetype] > 0) {
              updated[archetype] -= 1;
            }
            return updated;
          });
        } else {
          setError(data.error || 'Delete failed');
        }
      })
      .catch((err) => setError(err.message));
  };

  // Filtered results
  const filteredResults =
    filter === 'All Archetypes'
      ? results
      : results.filter((doc) => doc.archetype === filter);

  // **▼ Add this missing line: ▼**  
  const totalCount = results.length;

  // 1) “Desktop only” on small screens
  if (isMobile) {
    return <MobileWarning />;
  }

  // 2) While checking session
  if (checkingSession) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Checking session…</p>
        </div>
      </div>
    );
  }

  // 3) If not authenticated, show LoginForm
  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} errorMessage={loginError} />;
  }

  // 4) If authenticated but data still loading
  if (loadingData) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  // 5) If data returned an error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
        <div className="bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="bg-red-800 text-red-300 rounded-full p-3 w-16 h-16 mx-auto flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-200 mb-2">Error Loading Data</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // 6) Main dashboard UI
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header (fixed) */}
        <div className="fixed top-0 left-0 right-0 bg-gray-900 z-50 shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 max-w-7xl mx-auto">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-100">
                  Dashboard
                </h1>
                <p className="text-gray-400 mt-2">
                  {filteredResults.length}{' '}
                  {filteredResults.length === 1 ? 'result' : 'results'} shown
                </p>
              </div>
            </div>

            {/* Filter & Logout */}
            <div className="mt-4 md:mt-0 flex space-x-3">
              <div className="bg-gray-800 rounded-lg shadow px-4 py-2 flex items-center">
                <span className="text-gray-400 mr-2">Filter:</span>
                <select
                  className="bg-gray-900 text-gray-200 focus:outline-none rounded"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option>All Archetypes</option>
                  {Object.keys(archetypeColors).map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>
              <img
                src="/assets/images/alex-dumas.jpg"       /* ← change to your image path */
                alt="Owner Avatar"
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-600"
              />
              <button
                onClick={doLogout}
                className="bg-red-700 hover:bg-red-800 text-white font-medium py-2 px-4 rounded-lg flex items-center"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Spacer to offset fixed header */}
        <div className="h-20"></div>

        {/* Summary Cards */}
        <SummaryCards
          totalCount={totalCount}
          countsByArchetype={countsByArchetype}
          archetypeColors={archetypeColors}
        />

        {/* Results Table */}
        <ResultsTable
          results={filteredResults}
          archetypeColors={archetypeColors}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
