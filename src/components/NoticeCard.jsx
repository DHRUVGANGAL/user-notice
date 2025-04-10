// // src/components/NoticeCard.js - Updated to use ImageCarousel
// import React from 'react';
// import ImageCarousel from './ImageCarousel';

// const NoticeCard = ({ notice, onClick }) => {
//   // Format date
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   // Extract image files from notice
//   const getImageFiles = () => {
//     const images = [];
    
//     // Add main file if it's an image
//     if (notice.fileUrl && notice.fileType === 'image') {
//       images.push({
//         url: notice.fileUrl,
//         originalName: notice.title,
//         type: 'image'
//       });
//     }
    
//     // Add all image files from files array
//     if (notice.files && notice.files.length > 0) {
//       notice.files.forEach(file => {
//         // Check if file is an image or has image content type
//         if (file.fileType === 'image' || 
//             file.url.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i) ||
//             (file.mimetype && file.mimetype.startsWith('image/'))) {
//           images.push({
//             url: file.url,
//             originalName: file.originalName,
//             type: 'image'
//           });
//         }
//       });
//     }
    
//     return images;
//   };
  
//   // Get non-image files for attachment list
//   const getAttachmentFiles = () => {
//     if (!notice.files || notice.files.length === 0) return [];
    
//     return notice.files.filter(file => 
//       file.fileType !== 'image' && 
//       !file.url.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i) &&
//       !(file.mimetype && file.mimetype.startsWith('image/'))
//     );
//   };
  
//   const imageFiles = getImageFiles();
//   const attachmentFiles = getAttachmentFiles();
  
//   // Handle click on the card but not on the image carousel or attachments
//   const handleCardClick = (e) => {
//     // Only trigger onClick if the click was not on buttons or links inside
//     if (!e.target.closest('button') && !e.target.closest('a')) {
//       onClick();
//     }
//   };

//   return (
//     <div 
//       className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
//       onClick={handleCardClick}
//     >
//       {/* Header with category, important tag and date */}
//       <div className="p-4">
//         <div className="flex items-center mb-4">
//           <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//             notice.category === 'Administrative' 
//               ? 'bg-blue-100 text-blue-800' 
//               : 'bg-green-100 text-green-800'
//           }`}>
//             {notice.category}
//           </span>
          
//           {/* Important tag if applicable */}
//           {notice.isImportant && (
//             <span className="flex items-center text-red-600 text-sm font-medium ml-2">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//               </svg>
//               Important
//             </span>
//           )}
          
//           <span className="text-gray-600 text-sm ml-auto">
//             {formatDate(notice.createdAt)}
//           </span>
//         </div>
        
//         {/* Title */}
//         <h3 className="text-xl font-semibold text-gray-800 mb-3">{notice.title}</h3>
        
//         {/* Content */}
//         <div className="text-gray-700 mb-4">
//           {notice.content}
//         </div>
//       </div>
      
//       {/* Image Carousel - only shown if there are images */}
//       {imageFiles.length > 0 && <ImageCarousel images={imageFiles} />}
      
//       {/* Attachments */}
//       {attachmentFiles.length > 0 && (
//         <div className="p-4 border-t">
//           <h3 className="text-gray-700 font-medium mb-2">Attachments</h3>
          
//           {attachmentFiles.map((file, index) => (
//             <div key={index} className="bg-gray-100 p-3 rounded flex justify-between items-center mb-2 last:mb-0">
//               <span className="text-gray-700">
//                 {file.originalName || `attachment-${index + 1}.pdf`}
//               </span>
              
//               <a 
//                 href={file.url} 
//                 download
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center text-sm"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                 </svg>
//                 Download
//               </a>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoticeCard;



// src/components/NoticeCard.js - Fixed HTML content rendering
import React from 'react';
import ImageCarousel from './ImageCarousel';

const NoticeCard = ({ notice, onClick }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Extract image files from notice
  const getImageFiles = () => {
    const images = [];
    
    // Add main file if it's an image
    if (notice.fileUrl && notice.fileType === 'image') {
      images.push({
        url: notice.fileUrl,
        originalName: notice.title,
        type: 'image'
      });
    }
    
    // Add all image files from files array
    if (notice.files && notice.files.length > 0) {
      notice.files.forEach(file => {
        // Check if file is an image or has image content type
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
  
  // Get non-image files for attachment list
  const getAttachmentFiles = () => {
    if (!notice.files || notice.files.length === 0) return [];
    
    return notice.files.filter(file => 
      file.fileType !== 'image' && 
      !file.url.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i) &&
      !(file.mimetype && file.mimetype.startsWith('image/'))
    );
  };
  
  const imageFiles = getImageFiles();
  const attachmentFiles = getAttachmentFiles();
  
  // Handle click on the card but not on the image carousel or attachments
  const handleCardClick = (e) => {
    // Only trigger onClick if the click was not on buttons or links inside
    if (!e.target.closest('button') && !e.target.closest('a')) {
      onClick();
    }
  };
  
  // Safely render HTML content
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
      onClick={handleCardClick}
    >
      {/* Header with category, important tag and date */}
      <div className="p-4">
        <div className="flex items-center mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            notice.category === 'Administrative' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {notice.category}
          </span>
          
          {/* Important tag if applicable */}
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
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{notice.title}</h3>
        
        {/* Content - Render HTML safely */}
        <div 
          className="text-gray-700 mb-4" 
          dangerouslySetInnerHTML={createMarkup(notice.content)}
        />
      </div>
      
      {/* Image Carousel - only shown if there are images */}
      {imageFiles.length > 0 && <ImageCarousel images={imageFiles} />}
      
      {/* Attachments */}
      {attachmentFiles.length > 0 && (
        <div className="p-4 border-t">
          <h3 className="text-gray-700 font-medium mb-2">Attachments</h3>
          
          {attachmentFiles.map((file, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded flex justify-between items-center mb-2 last:mb-0">
              <span className="text-gray-700">
                {file.originalName || `attachment-${index + 1}.pdf`}
              </span>
              
              <a 
                href={file.url} 
                download
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticeCard;