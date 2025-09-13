import React, { useState } from 'react';
import { X, ChevronRight, ChevronDown } from 'lucide-react';
import { categories } from '../mock/mockData';

const HamburgerMenu = ({ isOpen, onClose }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Sliding Menu */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-teal-600">
          <h2 className="text-xl font-bold text-white">Categories</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-teal-700 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="overflow-y-auto h-full pb-20">
          
          {/* Quick Links */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Quick Access
            </h3>
            <div className="space-y-2">
              <a href="/daily-deals" className="flex items-center p-3 rounded-lg hover:bg-red-50 transition-colors">
                <span className="text-2xl mr-3">🔥</span>
                <span className="font-medium text-gray-900">Daily Deals</span>
              </a>
              <a href="/price-alerts" className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors">
                <span className="text-2xl mr-3">🔔</span>
                <span className="font-medium text-gray-900">Price Alerts</span>
              </a>
              <a href="/stores" className="flex items-center p-3 rounded-lg hover:bg-green-50 transition-colors">
                <span className="text-2xl mr-3">🏪</span>
                <span className="font-medium text-gray-900">All Stores</span>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Shop by Category
            </h3>
            
            {categories.map((category) => (
              <div key={category.id} className="mb-2">
                
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <span className="text-xl">
                        {category.id === 1 ? '🏷️' : 
                         category.id === 2 ? '🚗' :
                         category.id === 3 ? '💻' :
                         category.id === 4 ? '🏠' :
                         category.id === 5 ? '📱' :
                         category.id === 6 ? '👕' :
                         category.id === 7 ? '🏃' : '💄'}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{category.name}</div>
                      <div className="text-xs text-gray-500">{category.description}</div>
                    </div>
                  </div>
                  {expandedCategory === category.id ? 
                    <ChevronDown className="h-5 w-5 text-gray-400" /> :
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  }
                </button>

                {/* Subcategories */}
                {expandedCategory === category.id && category.subcategories && (
                  <div className="ml-6 mt-2 space-y-1">
                    {category.subcategories.map((subcategory, index) => (
                      <a
                        key={index}
                        href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block p-2 pl-4 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded transition-colors"
                      >
                        {subcategory}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-100 mt-4">
            <div className="space-y-2">
              <a href="/compare" className="flex items-center p-3 rounded-lg hover:bg-purple-50 transition-colors">
                <span className="text-2xl mr-3">⚖️</span>
                <span className="font-medium text-gray-900">Compare Products</span>
              </a>
              <a href="/help" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-2xl mr-3">❓</span>
                <span className="font-medium text-gray-900">Help & Support</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;