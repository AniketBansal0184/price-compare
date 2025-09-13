import React, { useState } from 'react';
import { Clock, Star, Tag, Filter } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { dailyDeals } from '../mock/mockData';

const DailyDealsPage = () => {
  const [sortBy, setSortBy] = useState('time-left');
  const [categoryFilter, setCategoryFilter] = useState('all');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            🔥 Daily Deals
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto mb-8">
            Limited time offers on the best products. Grab them before they're gone!
          </p>
          
          {/* Deal Counter */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
            <div className="text-white text-center">
              <div className="text-sm font-medium mb-2">Next deals refresh in:</div>
              <div className="text-3xl font-bold">
                <span className="bg-white/20 px-3 py-1 rounded-lg mr-2">23</span>
                <span className="text-lg">:</span>
                <span className="bg-white/20 px-3 py-1 rounded-lg mx-2">45</span>
                <span className="text-lg">:</span>
                <span className="bg-white/20 px-3 py-1 rounded-lg ml-2">12</span>
              </div>
              <div className="text-sm mt-2 opacity-90">Hours : Minutes : Seconds</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">
              {dailyDeals.length} active deals
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="time-left">Time Remaining</SelectItem>
                <SelectItem value="discount">Biggest Discount</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="home">Home & Garden</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Deal */}
        <Card className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="bg-red-500 text-white mb-4 text-lg px-4 py-2">
                  🚨 FLASH DEAL
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {dailyDeals[0].name}
                </h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-bold text-red-600">
                    ${dailyDeals[0].salePrice}
                  </div>
                  <div className="text-xl text-gray-500 line-through">
                    ${dailyDeals[0].originalPrice}
                  </div>
                  <Badge className="bg-red-500 text-white text-xl px-3 py-1">
                    -{dailyDeals[0].discount}%
                  </Badge>
                </div>
                <div className="flex items-center text-red-600 text-lg font-semibold mb-6">
                  <Clock className="h-5 w-5 mr-2" />
                  Only {dailyDeals[0].timeLeft} left!
                </div>
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg">
                  Grab This Deal Now
                </Button>
              </div>
              <div>
                <img
                  src={dailyDeals[0].image}
                  alt={dailyDeals[0].name}
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* All Deals Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">All Daily Deals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyDeals.map((deal) => (
              <Card key={deal.id} className="group hover:shadow-2xl transition-all duration-300 border border-red-100 hover:border-red-200 bg-gradient-to-br from-white to-red-50/30">
                <CardContent className="p-6">
                  
                  {/* Deal badges */}
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-red-500 text-white font-bold px-3 py-1">
                      -{deal.discount}%
                    </Badge>
                    <div className="flex items-center text-orange-600 text-sm font-semibold">
                      <Clock className="h-4 w-4 mr-1" />
                      {deal.timeLeft}
                    </div>
                  </div>

                  {/* Product image */}
                  <div className="relative mb-4">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Tag className="h-6 w-6 text-red-500" />
                    </div>
                  </div>

                  {/* Product details */}
                  <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {deal.name}
                  </h3>

                  <div className="flex items-center mb-4">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1 font-medium">
                      {deal.rating}
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-red-600">
                        ${deal.salePrice}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ${deal.originalPrice}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      at {deal.store}
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      You save ${deal.originalPrice - deal.salePrice}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold text-lg py-3"
                    size="lg"
                  >
                    Grab This Deal
                  </Button>

                  {/* Progress bar for urgency */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Limited time</span>
                      <span>Hurry!</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.random() * 40 + 30}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Never Miss a Deal!
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Subscribe to our daily deals newsletter and get notified about the best offers before anyone else.
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:border-teal-500 focus:ring-0"
              />
              <Button className="bg-teal-600 hover:bg-teal-700 px-8 py-3">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default DailyDealsPage;