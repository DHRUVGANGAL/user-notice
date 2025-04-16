import React from 'react';
import ImageCarousel from './ImageCarousel';

const NoticeDetail = ({ notice, onPrevious, onNext, currentIndex, totalCount }) => {
  if (!notice) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">Notice not found or data is unavailable.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date unavailable';
    }
  };

  const getImageFiles = () => {
    const images = [];
    try {
      if (notice.fileUrl && notice.fileType === 'image') {
        images.push({
          url: notice.fileUrl,
          originalName: notice.title || 'Main image',
          type: 'image'
        });
      }
      if (notice.files && Array.isArray(notice.files) && notice.files.length > 0) {
        notice.files.forEach(file => {
          if (
            file && (
              (file.fileType === 'image') ||
              (file.url && file.url.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i)) ||
              (file.mimetype && file.mimetype.startsWith('image/'))
            )
          ) {
            images.push({
              url: file.url,
              originalName: file.originalName || `Image ${images.length + 1}`,
              type: 'image'
            });
          }
        });
      }
    } catch (error) {
      console.error('Error processing image files:', error);
    }
    return images;
  };

  const getAttachmentFiles = () => {
    if (!notice.files || !Array.isArray(notice.files) || notice.files.length === 0) {
      return [];
    }
    try {
      return notice.files.filter(file =>
        file &&
        file.url &&
        file.fileType !== 'image' &&
        !file.url.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i) &&
        !(file.mimetype && file.mimetype.startsWith('image/'))
      );
    } catch (error) {
      console.error('Error processing attachment files:', error);
      return [];
    }
  };

  const imageFiles = getImageFiles();
  const attachmentFiles = getAttachmentFiles();

  const createMarkup = (htmlContent) => {
    try {
      if (typeof htmlContent === 'string') {
        return { __html: htmlContent };
      }
      return { __html: '' };
    } catch (error) {
      console.error('Error creating markup:', error);
      return { __html: '' };
    }
  };

  const getCategoryClasses = (category) => {
    switch(category) {
      case 'Administrative':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'Events':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100';
      case 'Academic':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'Examinations':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center mb-4">
          {notice.category && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryClasses(notice.category)}`}>
              {notice.category}
            </span>
          )}
          {notice.isImportant && (
            <span className="flex items-center text-red-600 dark:text-red-400 text-sm font-medium ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Important
            </span>
          )}
          {notice.createdAt && (
            <span className="text-gray-600 dark:text-gray-400 text-sm ml-auto">{formatDate(notice.createdAt)}</span>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">{notice.title || 'Untitled Notice'}</h2>
        {notice.content && (
          <div
            className="text-gray-700 dark:text-gray-300 mb-4 prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={createMarkup(notice.content)}
          />
        )}
      </div>
      {imageFiles.length > 0 && (
        <ImageCarousel images={imageFiles} />
      )}
      {attachmentFiles.length > 0 && (
        <div className="p-4 border-t dark:border-gray-700">
          <h3 className="text-gray-700 dark:text-gray-300 font-medium mb-2">Attachments</h3>
          <div className="space-y-2">
            {attachmentFiles.map((file, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-700 p-3 rounded flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300 truncate max-w-xs">
                  {file.originalName || `attachment-${index + 1}.pdf`}
                </span>
                <a
                  href={file.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-between p-3 bg-gray-100 dark:bg-gray-700 border-t dark:border-gray-600 mt-4">
        <button
          className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 px-2 py-1"
          onClick={onPrevious}
          aria-label="Previous notice"
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
            className="h-4 w-4 mr-1"
          >
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
          Previous Notice
        </button>
        {typeof currentIndex === 'number' && typeof totalCount === 'number' && (
          <div className="text-gray-600 dark:text-gray-400 text-sm self-center">
            {currentIndex + 1} / {totalCount}
          </div>
        )}
        <button
          className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 px-2 py-1"
          onClick={onNext}
          aria-label="Next notice"
        >
          Next Notice
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
            className="h-4 w-4 ml-1"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NoticeDetail;


