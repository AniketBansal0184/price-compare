import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const Advertisement = ({ ads }) => {
  return (
    <div className="py-16 bg-gradient-to-r from-purple-100 to-pink-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-purple-600 mr-2" />
            Special Offers
          </h2>
          <p className="text-gray-600">Don't miss out on these exclusive deals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ads.map((ad, index) => (
            <div 
              key={ad.id} 
              className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
                index === 1 ? 'md:scale-105' : ''
              }`}
            >
              <div className="relative h-64">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">
                    {ad.title}
                  </h3>
                  <p className="text-sm text-gray-200 mb-4 line-clamp-2">
                    {ad.subtitle}
                  </p>
                  <Button 
                    size="sm"
                    className="bg-white text-gray-900 hover:bg-yellow-300 hover:text-gray-900 font-semibold group-hover:scale-105 transition-transform"
                  >
                    {ad.cta}
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-80 group-hover:scale-125 transition-transform"></div>
                <div className="absolute top-8 right-8 w-4 h-4 bg-pink-400 rounded-full opacity-60 group-hover:scale-150 transition-transform delay-100"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advertisement;