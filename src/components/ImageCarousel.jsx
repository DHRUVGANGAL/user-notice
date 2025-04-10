import React, { useState, useEffect } from 'react';

const ImageCarousel = ({ images }) => {
  // Deduplicate images based on URL
  const uniqueImages = images ? [...new Map(images.map(img => [img.url, img])).values()] : [];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const zoomRef = React.useRef(null);
  
  if (!uniqueImages || uniqueImages.length === 0) return null;
  
  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? uniqueImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  
  const goToNext = () => {
    const isLastImage = currentIndex === uniqueImages.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const toggleZoom = (e) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };
  
  useEffect(() => {
    if (isZoomed) {
      document.addEventListener('keydown', handleKeyDown);
      if (zoomRef.current) {
        zoomRef.current.focus();
      }
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isZoomed]);
  
  const handleZoomClick = (e) => {
    if (!e.target.closest('button')) {
      setIsZoomed(false);
    }
  };
  
  const handleKeyDown = (e) => {
    if (isZoomed) {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape') {
        setIsZoomed(false);
      }
    }
  };
  
  // Check if we need to show image counter
  const showCounter = uniqueImages.length > 1;
  
  return (
    <div className="relative bg-gray-100 border-t border-b">
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={handleZoomClick}
          tabIndex="0"
          ref={zoomRef}
        >
          <div className="relative max-w-5xl max-h-screen p-4">
            <img
              src={uniqueImages[currentIndex].url}
              alt={uniqueImages[currentIndex].originalName || "Notice image"}
              className="max-w-full max-h-[90vh] object-contain cursor-zoom-out"
              onClick={toggleZoom}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
              }}
              className="absolute top-4 right-4 bg-white bg-opacity-25 hover:bg-opacity-50 rounded-full p-2 focus:outline-none"
              aria-label="Close zoom view"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {showCounter && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 focus:outline-none"
                  aria-label="Previous image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 focus:outline-none"
                  aria-label="Next image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                  {currentIndex + 1} / {uniqueImages.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      <div className="relative h-64 md:h-96">
        <img
          src={uniqueImages[currentIndex].url}
          alt={uniqueImages[currentIndex].originalName || "Notice image"}
          className="w-full h-full object-contain cursor-zoom-in"
          onClick={toggleZoom}
        />
        {showCounter && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
            {currentIndex + 1} / {uniqueImages.length}
          </div>
        )}
      </div>
      
      {showCounter && (
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