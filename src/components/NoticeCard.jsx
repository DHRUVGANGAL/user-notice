import React from 'react';
import ImageCarousel from './ImageCarousel';

const NoticeCard = ({ notice, onClick }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getImageFiles = () => {
    const images = [];
    
    if (notice.fileUrl && notice.fileType === 'image') {
      images.push({
        url: notice.fileUrl,
        originalName: notice.title,
        type: 'image'
      });
    }
    
    if (notice.files && notice.files.length > 0) {
      notice.files.forEach(file => {
        if (file.fileType === 'image' || 
            file.url.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i) ||
            (file.mimetype && file.mimetype.startsWith('image/'))) {
          images.push({
            url: file.url,
            originalName: file.originalName,
            type: 'image'
          });
        }
      });
    }
    
    return images;
  };
  
  const hasAttachments = () => {
    if (!notice.files || notice.files.length === 0) return false;
    
    return notice.files.some(file => 
      file.fileType !== 'image' && 
      !file.url.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i) &&
      !(file.mimetype && file.mimetype.startsWith('image/'))
    );
  };
  
  const handleCardClick = (e) => {
    if (!e.target.closest('button') && !e.target.closest('a')) {
      onClick();
    }
  };
  
  const imageFiles = getImageFiles();
  
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden mb-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={handleCardClick}
    >
      <div className="p-4">
        <div className="flex items-center mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            notice.category === 'Administrative'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {notice.category}
          </span>
          
          {notice.isImportant && (
            <span className="flex items-center text-red-600 text-sm font-medium ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Important
            </span>
          )}
          
          <span className="text-gray-600 text-sm ml-auto">
            {formatDate(notice.createdAt)}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{notice.title}</h3>
        
        {/* Content is removed - will only show in detail view */}
      </div>
      
      {/* Keep the image carousel */}
      {imageFiles.length > 0 && <ImageCarousel images={imageFiles} />}
      
      <div className="p-3 border-t">
        <div className="flex items-center text-gray-500 text-sm">
          {hasAttachments() && (
            <span className="flex items-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              Attachments
            </span>
          )}
          
          <span className="text-indigo-600 ml-auto flex items-center">
            View details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;