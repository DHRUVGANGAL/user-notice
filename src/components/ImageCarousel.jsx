// // src/components/ImageCarousel.js
// import React, { useState } from 'react';

// const ImageCarousel = ({ images }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [showFullImage, setShowFullImage] = useState(false);
  
//   // Handle empty images array
//   if (!images || images.length === 0) {
//     return (
//       <div className="relative bg-gray-200 h-64 w-full flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-6xl font-light text-gray-400">800 × 500</div>
//           <div className="mt-2 text-gray-400">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Navigate to previous image
//   const goToPrevious = (e) => {
//     e.stopPropagation();
//     setCurrentImageIndex(prevIndex => 
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   // Navigate to next image
//   const goToNext = (e) => {
//     e.stopPropagation();
//     setCurrentImageIndex(prevIndex => 
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   // Toggle full image view
//   const toggleFullImage = () => {
//     setShowFullImage(!showFullImage);
//   };

//   // Close full image view on overlay click
//   const closeFullImage = (e) => {
//     e.stopPropagation();
//     setShowFullImage(false);
//   };

//   // Current image to display
//   const currentImage = images[currentImageIndex];

//   return (
//     <>
//       <div 
//         className="relative bg-gray-200 h-64 w-full cursor-pointer"
//         onClick={toggleFullImage}
//       >
//         {/* Current image */}
//         <img 
//           src={currentImage.url} 
//           alt={currentImage.originalName || "Notice image"}
//           className="w-full h-full object-contain" 
//           onError={(e) => {
//             // If image fails to load, show placeholder
//             e.target.onerror = null;
//             e.target.parentNode.classList.add('flex', 'items-center', 'justify-center');
//             e.target.outerHTML = `
//               <div class="text-center">
//                 <div class="text-6xl font-light text-gray-400">800 × 500</div>
//                 <div class="mt-2 text-gray-400">
//                   <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </div>
//               </div>
//             `;
//           }}
//         />
        
//         {/* Navigation arrows - only show if there are multiple images */}
//         {images.length > 1 && (
//           <>
//             <button 
//               className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 z-10"
//               onClick={goToPrevious}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//             <button 
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 z-10"
//               onClick={goToNext}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </>
//         )}
        
//         {/* Pagination indicator */}
//         <div className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-70 text-white text-xs px-2 py-1 rounded">
//           {currentImageIndex + 1} / {images.length}
//         </div>
//       </div>

//       {/* Full-size image overlay */}
//       {showFullImage && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
//           onClick={closeFullImage}
//         >
//           <div className="relative max-w-4xl max-h-screen p-4">
//             <img 
//               src={currentImage.url} 
//               alt={currentImage.originalName || "Notice image"} 
//               className="max-w-full max-h-[90vh] object-contain"
//             />
            
//             <button 
//               className="absolute top-4 right-4 bg-white rounded-full p-2"
//               onClick={closeFullImage}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>

//             {/* Navigation arrows for the full-size view */}
//             {images.length > 1 && (
//               <>
//                 <button 
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-3"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     goToPrevious(e);
//                   }}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </button>
//                 <button 
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-3"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     goToNext(e);
//                   }}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ImageCarousel;




// src/components/ImageCarousel.js
import React, { useState } from 'react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  if (!images || images.length === 0) return null;
  
  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  
  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative bg-gray-100 border-t border-b">
      <div className="relative h-64 md:h-96">
        <img 
          src={images[currentIndex].url} 
          alt={images[currentIndex].originalName || "Notice image"} 
          className="w-full h-full object-contain"
        />
        
        {/* Image counter indicator */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      
      {/* Navigation arrows - only show if there are multiple images */}
      {images.length > 1 && (
        <>
          <button 
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 focus:outline-none"
            aria-label="Previous image"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 focus:outline-none"
            aria-label="Next image"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;