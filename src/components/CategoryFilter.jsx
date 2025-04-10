import React, { useState, useEffect } from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  // Check if we're on mobile screen
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is standard md breakpoint
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Update selected categories when selectedCategory prop changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([selectedCategory]);
    }
  }, [selectedCategory]);
  
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      // For simplicity, we'll just allow selecting one category at a time
      setSelectedCategories([category]);
    }
  };
  
  const handleSave = () => {
    if (selectedCategories.length === 0) {
      onCategoryChange('All');
    } else {
      onCategoryChange(selectedCategories[0]);
    }
    setIsModalOpen(false);
  };
  
  // Get category button color based on category
  const getCategoryButtonClass = (category) => {
    if (category === 'All') {
      return selectedCategory === 'All' 
        ? 'bg-indigo-600 text-white' 
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
    }
    
    return selectedCategory === category 
      ? (category === 'Administrative' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white')
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
  };
  
  // For mobile: filter button that opens modal
  if (isMobile) {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium">Filter by Category</h2>
          <button
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
            onClick={() => setIsModalOpen(true)}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
            Filter
          </button>
        </div>
        
        {/* Only show the selected category */}
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryButtonClass(selectedCategory)}`}
            onClick={() => setIsModalOpen(true)}
          >
            {selectedCategory}
          </button>
        </div>
        
        {/* Modal overlay */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-white z-50" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
            <div className="flex flex-col h-full">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 border-b">
                <button onClick={() => setIsModalOpen(false)}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                <h2 className="text-xl font-semibold">Notice Categories</h2>
                <div className="w-6"></div> {/* Spacer for centering */}
              </div>
              
              {/* Modal body */}
              <div className="flex-grow overflow-y-auto p-4">
                <h3 className="text-xl font-semibold mb-4">Categories</h3>
                
                <div className="space-y-6">
                  {['Academic', 'Events', 'Exam', 'Placements', ...categories.filter(cat => 
                    !['Academic', 'Events', 'Exam', 'Placements'].includes(cat)
                  )].map(category => (
                    <div key={category} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-lg">{category}</span>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-6 w-6 rounded border-gray-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Modal footer */}
              <div className="p-4">
                <button
                  className="w-full py-3 bg-blue-500 text-white rounded-md font-medium"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // For desktop: buttons view
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-2">Filter by Category</h2>
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryButtonClass('All')}`}
          onClick={() => onCategoryChange('All')}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryButtonClass(category)}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;