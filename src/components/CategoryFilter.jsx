import React, { useState, useEffect } from 'react';

const CategoryFilter = ({ categories = [], selectedCategory = 'All', onCategoryChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  

  const uniqueCategories = ['All', ...new Set(Array.isArray(categories) ? categories : [])];
  

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); 
    };
    
 
    checkScreenSize();
    
 
    window.addEventListener('resize', checkScreenSize);
    

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  

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
  

  const getCategoryButtonClass = (category) => {
    if (category === 'All') {
      return selectedCategory === 'All' 
        ? 'bg-indigo-600 text-white' 
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
    }
    
    const categoryColorMap = {
      'Administrative': selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      'Academic': selectedCategory === category ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200',
      'Events': selectedCategory === category ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      // 'Exam': selectedCategory === category ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-800 hover:bg-orange-200',
      'Examinations': selectedCategory === category ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-800 hover:bg-orange-200',
      'Placements': selectedCategory === category ? 'bg-teal-600 text-white' : 'bg-teal-100 text-teal-800 hover:bg-teal-200',
    };
    
    return categoryColorMap[category] || (
      selectedCategory === category 
        ? 'bg-indigo-600 text-white' 
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    );
  };
  

  if (isMobile) {
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium">Filter by Category</h2>
          <button
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
            onClick={() => setIsModalOpen(true)}
            aria-label="Open filter options"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
            Filter
          </button>
        </div>
        
       
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryButtonClass(selectedCategory)}`}
            onClick={() => setIsModalOpen(true)}
          >
            {selectedCategory}
          </button>
        </div>
        
       
        {isModalOpen && (
          <div 
            className="fixed inset-0 bg-white z-50" 
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-modal-title"
          >
            <div className="flex flex-col h-full">
              
              <div className="flex items-center justify-between p-4 border-b">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close filter modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                <h2 id="filter-modal-title" className="text-xl font-semibold">Notice Categories</h2>
                <div className="w-6"></div> 
              </div>
              
            
              <div className="flex-grow overflow-y-auto p-4">
                <h3 className="text-xl font-semibold mb-4">Categories</h3>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-lg">All Categories</span>
                    <input
                      type="checkbox"
                      checked={selectedCategories.length === 0}
                      onChange={() => setSelectedCategories([])}
                      className="h-6 w-6 rounded border-gray-300"
                      aria-label="Select all categories"
                    />
                  </div>
                  
                  
                  {Array.from(new Set(['Academic', 'Events', 'Examinations', 'Placements', 'Administrative', 
                    ...(Array.isArray(categories) ? categories : []).filter(cat => 
                      !['Academic', 'Events', 'Exam', 'Examinations', 'Placements', 'Administrative'].includes(cat)
                    )
                  ])).filter(Boolean).map(category => (
                    <div key={category} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-lg">{category}</span>
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-6 w-6 rounded border-gray-300"
                        aria-label={`Filter by ${category} category`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
          
              <div className="p-4">
                <button
                  className="w-full py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors"
                  onClick={handleSave}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-2">Filter by Category</h2>
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${getCategoryButtonClass('All')}`}
          onClick={() => onCategoryChange('All')}
          aria-pressed={selectedCategory === 'All'}
        >
          All
        </button>
        {(Array.isArray(categories) ? categories : []).filter(Boolean).map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${getCategoryButtonClass(category)}`}
            onClick={() => onCategoryChange(category)}
            aria-pressed={selectedCategory === category}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;