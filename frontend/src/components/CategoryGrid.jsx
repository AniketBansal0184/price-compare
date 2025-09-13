import React from 'react';
import { 
  Percent, 
  Car, 
  Laptop, 
  Home, 
  Smartphone, 
  ShirtIcon as Shirt,
  ArrowRight 
} from 'lucide-react';
import { Card, CardContent } from './ui/card';

const CategoryGrid = ({ categories }) => {
  const iconMap = {
    percent: Percent,
    car: Car,
    laptop: Laptop,
    home: Home,
    smartphone: Smartphone,
    shirt: Shirt
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover millions of products across all categories. Compare prices and find the best deals from trusted NZ retailers.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon];
            
            return (
              <Card 
                key={category.id} 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50"
              >
                <CardContent className="p-6 text-center">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${category.color}15` }}
                  >
                    {IconComponent && (
                      <IconComponent 
                        className="h-8 w-8 transition-colors duration-300" 
                        style={{ color: category.color }}
                      />
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                    {category.name}
                  </h3>
                  
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-center text-teal-600 group-hover:text-teal-700 transition-colors">
                    <span className="text-xs font-medium">Explore</span>
                    <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View all categories */}
        <div className="text-center mt-12">
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
            View All Categories
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;