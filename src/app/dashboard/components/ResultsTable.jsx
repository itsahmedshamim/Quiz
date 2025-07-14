'use client';

import React, { useState, useEffect } from 'react';
import { FiTrash2, FiEye, FiEyeOff, FiClipboard } from 'react-icons/fi';

export default function ResultsTable({
  results = [],
  archetypeColors,
  onDelete,
}) {
  const [expandedRow, setExpandedRow] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [revealedEmails, setRevealedEmails] = useState({});
  const [sortedResults, setSortedResults] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' or 'oldest'
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Initialize and sort results when prop changes or sortOrder changes
  useEffect(() => {
    const sorted = [...results].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    setSortedResults(sorted);
    setCurrentPage(1); // reset to first page when data or sort changes
  }, [results, sortOrder]);

  const totalPages = Math.ceil(sortedResults.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedResults = sortedResults.slice(startIndex, startIndex + rowsPerPage);

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
    setDeleteConfirm(null);
  };

  const toggleEmailVisibility = (id) => {
    setRevealedEmails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email).catch(() => {
      // Ignore errors
    });
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleConfirmDelete = (id) => {
    setDeletingId(id);
    // Delay actual deletion to allow spinner to show
    setTimeout(() => {
      onDelete(id);
      setDeletingId(null);
      setDeleteConfirm(null);
      setExpandedRow(null);
    }, 500);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setExpandedRow(null);
    setDeleteConfirm(null);
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <label htmlFor="sortOrder" className="text-sm text-gray-300 mr-2">
            Sort by:
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={handleSortChange}
            className="bg-gray-700 text-gray-200 text-sm rounded px-2 py-1"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      {sortedResults.length === 0 ? (
        <div className="p-6 text-center text-gray-400">
          No results found.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Archetype
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Details / Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {displayedResults.map((doc, idx) => {
                  const {
                    _id,
                    userName,
                    userEmail,
                    archetype,
                    totalQuestions,
                    archetypeScores,
                    createdAt,
                  } = doc;

                  const colorObj = archetypeColors[archetype] || {
                    gradient: 'from-gray-500 to-gray-600',
                    bg: 'bg-gray-700',
                    border: 'border-gray-600',
                    text: 'text-gray-300',
                  };

                  const isEmailRevealed = !!revealedEmails[_id];

                  // Masked version: show first char + asterisks + domain placeholder
                  const maskedEmail = userEmail
                    ? userEmail.replace(/^(.)(.*)(@.*)$/, (_m, p1, p2, p3) => {
                        return p1 + '*'.repeat(p2.length) + p3;
                      })
                    : '';

                  const displayIndex = startIndex + idx + 1;

                  return (
                    <React.Fragment key={_id}>
                      {/* Main row */}
                      <tr
                        className="hover:bg-gray-700 cursor-pointer"
                        onClick={() => toggleRow(_id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {displayIndex}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="bg-indigo-700 text-indigo-200 rounded-full w-10 h-10 flex items-center justify-center font-medium">
                              {userName ? userName.charAt(0) : 'U'}
                            </div>
                            <div className="flex flex-col">
                              <div className="text-sm font-medium text-gray-100">
                                {userName || 'Anonymous'}
                              </div>
                              <div className="flex items-center text-sm text-gray-400">
                                {isEmailRevealed ? (
                                  <>
                                    <span className="truncate max-w-xs">{userEmail}</span>
                                    <FiClipboard
                                      className="ml-2 h-4 w-4 text-gray-300 hover:text-gray-100 cursor-pointer"
                                      title="Copy email"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCopyEmail(userEmail);
                                      }}
                                    />
                                    <FiEyeOff
                                      className="ml-2 h-4 w-4 text-gray-300 hover:text-gray-100 cursor-pointer"
                                      title="Hide email"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleEmailVisibility(_id);
                                      }}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <span className="truncate max-w-xs">{maskedEmail}</span>
                                    <FiEye
                                      className="ml-2 h-4 w-4 text-gray-300 hover:text-gray-100 cursor-pointer"
                                      title="Show email"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleEmailVisibility(_id);
                                      }}
                                    />
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorObj.bg} ${colorObj.text}`}
                          >
                            {archetype}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          <div>{new Date(createdAt).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          <div className="flex items-center space-x-4">
                            <span>{totalQuestions} Qs</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirm(_id);
                              }}
                              className="text-red-500 hover:text-red-300 transition text-sm font-medium"
                              title="Delete entry"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded details row */}
                      {expandedRow === _id && (
                        <tr className="bg-gray-700">
                          <td colSpan="5" className="px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Archetype Scores */}
                              <div>
                                <h3 className="text-sm font-medium text-gray-100 mb-3">
                                  Archetype Scores
                                </h3>
                                <div className="space-y-3">
                                  {Object.entries(archetypeScores || {})
                                    .sort((a, b) => b[1] - a[1])
                                    .map(([type, score]) => {
                                      const percentage = Math.round(
                                        (score / totalQuestions) * 100
                                      );
                                      const typeColor = archetypeColors[type] || {
                                        gradient: 'from-gray-500 to-gray-600',
                                        text: 'text-gray-300',
                                      };

                                      return (
                                        <div key={type}>
                                          <div className="flex justify-between text-xs mb-1">
                                            <span
                                              className={`font-medium ${typeColor.text}`}
                                            >
                                              {type}
                                            </span>
                                            <span className="text-gray-400">
                                              {score} ({percentage}%
                                            )</span>
                                          </div>
                                          <div className="w-full bg-gray-600 rounded-full h-2">
                                            <div
                                              className={`h-2 rounded-full bg-gradient-to-r ${typeColor.gradient}`}
                                              style={{ width: `${percentage}%` }}
                                            />
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>

                              {/* Viewed Archetypes & Details */}
                              <div>
                               

                                <h3 className="text-sm font-medium text-gray-100 mb-3">
                                  Assessment Details
                                </h3>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div className="text-gray-400">User ID:</div>
                                  <div className="text-gray-200 font-mono truncate">
                                    {String(_id).slice(-8)}
                                  </div>

                                  <div className="text-gray-400">Completed:</div>
                                  <div className="text-gray-200">
                                    {new Date(createdAt).toLocaleString()}
                                  </div>

                                  <div className="text-gray-400">Questions:</div>
                                  <div className="text-gray-200">
                                    {totalQuestions}
                                  </div>
                                </div>

                                {/* Delete Confirmation */}
                                {deleteConfirm === _id && (
                                  <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                                    <p className="text-gray-200 mb-3">
                                      Are you sure you want to delete this result?
                                    </p>
                                    <div className="flex space-x-3">
                                      <button
                                        onClick={() => setDeleteConfirm(null)}
                                        className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-1 px-3 rounded"
                                        disabled={deletingId === _id}
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        onClick={() => handleConfirmDelete(_id)}
                                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded flex items-center"
                                        disabled={deletingId === _id}
                                      >
                                        {deletingId === _id ? (
                                          <svg
                                            className="animate-spin h-5 w-5 mr-2 text-white"
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
                                            />
                                            <path
                                              className="opacity-75"
                                              fill="currentColor"
                                              d="M4 12a8 8 0 018-8v8z"
                                            />
                                          </svg>
                                        ) : null}
                                        {deletingId === _id ? ' Deleting...' : ' Confirm Delete'}
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
         <div className="px-6 py-4 bg-gray-800 flex justify-center space-x-2">
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className={`px-3 py-1 rounded ${
      currentPage === 1
        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
        : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
    }`}
  >
    Previous
  </button>

  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={`px-3 py-1 rounded ${
        currentPage === page
          ? 'bg-[#022f6b] text-white'
          : 'bg-gray-700 text-gray-200 hover:bg-[#c2a070]'
      }`}
    >
      {page}
    </button>
  ))}

  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    className={`px-3 py-1 rounded ${
      currentPage === totalPages
        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
        : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
    }`}
  >
    Next
  </button>
</div>

          )}
        </>
      )}
    </div>
  );
}
