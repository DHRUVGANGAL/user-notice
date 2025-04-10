// src/pages/NoticePage.js - Updated with a new back button
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNotices } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import NoticeCard from '../components/NoticeCard';
import NoticeDetail from '../components/NoticeDetail';

const NoticePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for detail view
  const [selectedNoticeIndex, setSelectedNoticeIndex] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);

  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  // Fetch notices from the API
  useEffect(() => {
    const getNotices = async () => {
      try {
        setLoading(true);
        const response = await fetchNotices();
        
        if (response.success) {
          setNotices(response.data);
          
          // Extract unique categories from notices
          const uniqueCategories = [...new Set(
            response.data
              .filter(notice => notice.category)
              .map(notice => notice.category)
          )];
          
          setCategories(uniqueCategories);
        } else {
          setError('Failed to fetch notices');
        }
      } catch (error) {
        setError('Error fetching notices: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      getNotices();
    }
  }, [isAuthenticated]);

  // Filter notices by selected category
  const filteredNotices = selectedCategory === 'All'
    ? notices
    : notices.filter(notice => notice.category === selectedCategory);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Reset detail view when changing categories
    setShowDetailView(false);
    setSelectedNoticeIndex(null);
  };

  // Open notice detail view
  const openNoticeDetail = (index) => {
    setSelectedNoticeIndex(index);
    setShowDetailView(true);
  };

  // Handle navigation in detail view
  const goToPreviousNotice = () => {
    setSelectedNoticeIndex(prev => 
      prev === 0 ? filteredNotices.length - 1 : prev - 1
    );
  };

  const goToNextNotice = () => {
    setSelectedNoticeIndex(prev => 
      prev === filteredNotices.length - 1 ? 0 : prev + 1
    );
  };

  // Close detail view
  const closeDetailView = () => {
    setShowDetailView(false);
    setSelectedNoticeIndex(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Department Notices</h1>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          {/* Category filters */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Filter by Category</h2>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === 'All' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => handleCategoryChange('All')}
              >
                All
              </button>
              
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category 
                      ? (category === 'Administrative' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white')
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* No notices message */}
          {filteredNotices.length === 0 && (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-gray-500">No notices available{selectedCategory !== 'All' ? ` in category "${selectedCategory}"` : ''}.</p>
            </div>
          )}

          {/* Detail View */}
          {showDetailView && selectedNoticeIndex !== null && (
            <div className="mb-6">
              {/* Updated Back to notices button */}
              <button 
                onClick={closeDetailView}
                className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-5 w-5 mr-1"
                >
                  <path d="M19 12H5"></path>
                  <path d="M12 19l-7-7 7-7"></path>
                </svg>
                Back to notices
              </button>
              
              <NoticeDetail 
                notice={filteredNotices[selectedNoticeIndex]}
                onPrevious={goToPreviousNotice}
                onNext={goToNextNotice}
                currentIndex={selectedNoticeIndex}
                totalCount={filteredNotices.length}
              />
            </div>
          )}

          {/* Notices List - Full width */}
          {!showDetailView && (
            <div className="space-y-6">
              {filteredNotices.map((notice, index) => (
                <NoticeCard 
                  key={notice._id || index} 
                  notice={notice} 
                  onClick={() => openNoticeDetail(index)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NoticePage;