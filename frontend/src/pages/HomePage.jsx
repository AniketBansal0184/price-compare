import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CategoryGrid from '../components/CategoryGrid';
import TouchCarousel from '../components/ProductCarousel';
import DailyDeals from '../components/DailyDeals';
import Advertisement from '../components/Advertisement';
import Footer from '../components/Footer';
import { categories, products, dailyDeals, advertisements } from '../mock/mockData';

const HomePage = () => {
  // Filter products by category for different carousels
  const electronics = products.filter(p => p.category === 'Electronics');
  const computers = products.filter(p => p.category === 'Computers & Accessories');
  const featuredProducts = products.slice(0, 8); // More products for better carousel demo
  const trendingProducts = products.slice(4, 12); // Different set for trending

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      
      {/* Categories section */}
      <CategoryGrid categories={categories} />
      
      {/* Featured products carousel */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TouchCarousel 
          products={featuredProducts} 
          title="🌟 Featured Products" 
        />
      </div>

      {/* Daily deals */}
      <DailyDeals deals={dailyDeals} />
      
      {/* Electronics carousel */}
      <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
        <TouchCarousel 
          products={electronics} 
          title="📱 Latest Electronics" 
        />
      </div>

      {/* Advertisement section */}
      <Advertisement ads={advertisements} />
      
      {/* Trending products carousel */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TouchCarousel 
          products={trendingProducts} 
          title="📈 Trending Now" 
        />
      </div>

      {/* Computers carousel */}
      <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
        <TouchCarousel 
          products={computers} 
          title="💻 Computers & Tech" 
        />
      </div>

      {/* Trust indicators */}
      <div className="bg-teal-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose PriceSpy?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <div className="text-3xl font-bold text-teal-600 mb-2">1.7M+</div>
              <div className="text-gray-600">Products Tracked</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-teal-600 mb-2">1000+</div>
              <div className="text-gray-600">Trusted Stores</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-teal-600 mb-2">500K+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-teal-600 mb-2">24/7</div>
              <div className="text-gray-600">Price Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;