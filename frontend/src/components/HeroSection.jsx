import React from 'react';
import { Search, TrendingUp, Shield, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-teal-500 via-blue-500 to-indigo-600 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-orange-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-pink-300/20 rounded-full blur-lg"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-28">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Compare over{' '}
            <span className="text-yellow-300">1.7 million</span>{' '}
            prices
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            from over <strong className="text-yellow-300">1,000</strong> NZ shops.
          </p>
          
          {/* Hero search bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Input
                type="text"
                placeholder="Hi, what are you looking for today?"
                className="w-full pl-6 pr-16 py-4 text-lg border-0 rounded-xl shadow-2xl focus:ring-4 focus:ring-yellow-300/50 bg-white/95 backdrop-blur-sm"
              />
              <Button 
                size="lg"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 px-6 rounded-full shadow-lg h-[2.3rem] w-14 p-0"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <TrendingUp className="h-8 w-8 text-yellow-300 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Price History</h3>
              <p className="text-blue-100 text-sm">Track price changes and find the best time to buy</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Shield className="h-8 w-8 text-yellow-300 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Trusted Reviews</h3>
              <p className="text-blue-100 text-sm">Real reviews from verified customers</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Clock className="h-8 w-8 text-yellow-300 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Price Alerts</h3>
              <p className="text-blue-100 text-sm">Get notified when prices drop on your wishlist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;