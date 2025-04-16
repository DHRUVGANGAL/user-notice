import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNotices } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import NoticeCard from '../components/NoticeCard';
import NoticeDetail from '../components/NoticeDetail';
import CategoryFilter from '../components/CategoryFilter';

const NoticePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [selectedNoticeIndex, setSelectedNoticeIndex] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const getNotices = async () => {
      try {
        setLoading(true);
        const response = await fetchNotices();
        
        if (response.success) {
          setNotices(response.data);
          
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
  
  const filteredNotices = selectedCategory === 'All'
    ? notices
    : notices.filter(notice => notice.category === selectedCategory);
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowDetailView(false);
    setSelectedNoticeIndex(null);
  };
  
  const openNoticeDetail = (index) => {
    setSelectedNoticeIndex(index);
    setShowDetailView(true);
  };

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

  const closeDetailView = () => {
    setShowDetailView(false);
    setSelectedNoticeIndex(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 ">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 dark:text-white">Department Notices</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
         
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryChange} 
          />
          
          {filteredNotices.length === 0 && (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p className="text-gray-500">No notices available{selectedCategory !== 'All' ? ` in category "${selectedCategory}"` : ''}.</p>
            </div>
          )}
          
          {showDetailView && selectedNoticeIndex !== null && (
            <div className="mb-6">
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