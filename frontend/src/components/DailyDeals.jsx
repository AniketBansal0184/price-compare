import React from 'react';
import { Clock, Star, Tag } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const DailyDeals = ({ deals }) => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              🔥 Daily Deals
            </h2>
            <p className="text-gray-600">Limited time offers - grab them before they're gone!</p>
          </div>
          <Button variant="outline" className="hidden md:flex">
            View All Deals
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <Card key={deal.id} className="group hover:shadow-2xl transition-all duration-300 border border-red-100 hover:border-red-200 bg-gradient-to-br from-white to-red-50/30">
              <CardContent className="p-6">
                {/* Deal badge */}
                <div className="flex justify-between items-start mb-4">
                  <Badge className="bg-red-500 text-white font-bold px-2 py-1">
                    -{deal.discount}%
                  </Badge>
                  <div className="flex items-center text-orange-600 text-xs font-semibold">
                    <Clock className="h-3 w-3 mr-1" />
                    {deal.timeLeft}
                  </div>
                </div>

                {/* Product image */}
                <div className="relative mb-4">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <Tag className="h-5 w-5 text-red-500" />
                  </div>
                </div>

                {/* Product details */}
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                  {deal.name}
                </h3>

                <div className="flex items-center mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600 ml-1">
                    {deal.rating}
                  </span>
                </div>

                {/* Pricing */}
                <div className="space-y-1 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-red-600">
                      ${deal.salePrice}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${deal.originalPrice}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    at {deal.store}
                  </div>
                </div>

                <Button 
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold"
                  size="sm"
                >
                  Grab This Deal
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile view all button */}
        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" className="w-full">
            View All Daily Deals
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DailyDeals;