import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Filter, User, Calendar, ShoppingBag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Avatar } from '../components/ui/avatar';

const ReviewsPage = () => {
  const [sortBy, setSortBy] = useState('recent');
  const [filterRating, setFilterRating] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const reviews = [
    {
      id: 1,
      productName: "iPhone 15 Pro 128GB",
      productImage: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
      reviewer: {
        name: "Sarah Mitchell",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
        verified: true,
        totalReviews: 23
      },
      rating: 5,
      title: "Outstanding camera quality and performance",
      content: "I've been using this phone for 3 months now and I'm thoroughly impressed. The camera system is phenomenal - the 48MP main camera captures incredible detail and the new Action mode for video is a game changer. Battery life easily gets me through a full day of heavy use. The titanium build feels premium and the phone is noticeably lighter than my previous iPhone 14 Pro Max.",
      date: "2024-02-15",
      verified: true,
      helpfulCount: 47,
      category: "Electronics",
      purchaseStore: "Apple Store",
      pros: ["Excellent camera", "Great battery life", "Premium build quality"],
      cons: ["Expensive", "No significant design changes"]
    },
    {
      id: 2,
      productName: "Samsung Galaxy S24 Ultra",
      productImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      reviewer: {
        name: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        verified: true,
        totalReviews: 156
      },
      rating: 4,
      title: "Great phone but battery could be better",
      content: "The S24 Ultra is an impressive device with an amazing display and the S Pen is incredibly useful for note-taking and editing. The camera zoom capabilities are unmatched - 100x zoom is genuinely useful. However, I find the battery life inconsistent. Some days it lasts all day, other days I need to charge by evening. The AI features are hit or miss but show promise.",
      date: "2024-02-10",
      verified: true,
      helpfulCount: 32,
      category: "Electronics",
      purchaseStore: "JB Hi-Fi",
      pros: ["Amazing display", "S Pen functionality", "Excellent zoom camera"],
      cons: ["Inconsistent battery", "Expensive", "AI features need work"]
    },
    {
      id: 3,
      productName: "MacBook Air M3 13\"",
      productImage: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop",
      reviewer: {
        name: "Emily Chen",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        verified: false,
        totalReviews: 8
      },
      rating: 5,
      title: "Perfect for students and professionals",
      content: "As a graphic design student, this MacBook Air has been perfect for my needs. The M3 chip handles Adobe Creative Suite beautifully, and the battery life is incredible - I can go 2 days without charging with normal use. The fanless design means it's completely silent, which is great for library work. The only downside is limited ports, but that's expected with the Air series.",
      date: "2024-02-08",
      verified: false,
      helpfulCount: 28,
      category: "Computers & Accessories",
      purchaseStore: "PB Tech",
      pros: ["Excellent performance", "Amazing battery life", "Completely silent"],
      cons: ["Limited ports", "Only 8GB base RAM"]
    },
    {
      id: 4,
      productName: "Sony WH-1000XM5 Headphones",
      productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      reviewer: {
        name: "Michael Brown",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        verified: true,
        totalReviews: 67
      },
      rating: 5,
      title: "Best noise cancelling headphones I've owned",
      content: "These headphones are incredible. The noise cancelling is so good that I sometimes forget I'm wearing them in noisy environments. Sound quality is exceptional across all genres - crisp highs, detailed mids, and punchy bass without being overwhelming. The battery life of 30 hours is exactly as advertised. Comfort is excellent for long listening sessions.",
      date: "2024-02-05",
      verified: true,
      helpfulCount: 56,
      category: "Electronics",
      purchaseStore: "Harvey Norman",
      pros: ["Outstanding noise cancelling", "Excellent sound quality", "Great battery life"],
      cons: ["Expensive", "Touch controls can be sensitive"]
    },
    {
      id: 5,
      productName: "Nintendo Switch OLED",
      productImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      reviewer: {
        name: "Lisa Anderson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
        verified: true,
        totalReviews: 34
      },
      rating: 4,
      title: "Great upgrade but still has Joy-Con issues",
      content: "The OLED screen is a significant improvement over the original Switch - colors are vibrant and blacks are truly black. The improved kickstand is much more stable. However, I'm disappointed that Nintendo didn't fix the Joy-Con drift issue. My left Joy-Con started drifting after just 6 months. The console itself is great for both handheld and docked play.",
      date: "2024-01-30",
      verified: true,
      helpfulCount: 23,
      category: "Electronics",
      purchaseStore: "EB Games",
      pros: ["Beautiful OLED display", "Better kickstand", "Great game library"],
      cons: ["Joy-Con drift still an issue", "No performance improvements"]
    }
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating;
    const matchesCategory = filterCategory === 'all' || review.category === filterCategory;
    return matchesRating && matchesCategory;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            ⭐ Product Reviews
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Real reviews from real customers. Make informed decisions based on genuine experiences.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Review Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-gray-600">Total Reviews</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.6</div>
              <div className="text-gray-600">Average Rating</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Verified Purchases</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">24h</div>
              <div className="text-gray-600">Response Time</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
              <SelectItem value="rating-high">Highest Rating</SelectItem>
              <SelectItem value="rating-low">Lowest Rating</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterRating} onValueChange={setFilterRating}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Computers & Accessories">Computers</SelectItem>
              <SelectItem value="Home & Garden">Home & Garden</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  
                  {/* Product Info */}
                  <div className="lg:w-1/4">
                    <img
                      src={review.productImage}
                      alt={review.productName}
                      className="w-full lg:w-32 h-32 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {review.productName}
                    </h3>
                    <Badge className="mb-2">{review.category}</Badge>
                    <div className="text-sm text-gray-600">
                      Bought at: {review.purchaseStore}
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="lg:w-3/4">
                    
                    {/* Reviewer Info */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <img
                          src={review.reviewer.avatar}
                          alt={review.reviewer.name}
                          className="w-12 h-12 rounded-full mr-3"
                        />
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium text-gray-900 mr-2">
                              {review.reviewer.name}
                            </h4>
                            {review.reviewer.verified && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                ✓ Verified
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {review.reviewer.totalReviews} reviews
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center mb-1">
                          {renderStars(review.rating)}
                        </div>
                        <div className="text-sm text-gray-600">{review.date}</div>
                      </div>
                    </div>

                    {/* Review Title */}
                    <h3 className="font-semibold text-lg text-gray-900 mb-3">
                      {review.title}
                    </h3>

                    {/* Review Content */}
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {review.content}
                    </p>

                    {/* Pros and Cons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {review.pros.length > 0 && (
                        <div>
                          <h5 className="font-medium text-green-600 mb-2">👍 Pros:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {review.pros.map((pro, index) => (
                              <li key={index} className="flex items-center">
                                <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {review.cons.length > 0 && (
                        <div>
                          <h5 className="font-medium text-red-600 mb-2">👎 Cons:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {review.cons.map((con, index) => (
                              <li key={index} className="flex items-center">
                                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Review Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Helpful ({review.helpfulCount})
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <ThumbsDown className="h-4 w-4 mr-2" />
                          Not Helpful
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {review.verified && (
                          <Badge className="bg-blue-100 text-blue-800">
                            <ShoppingBag className="h-3 w-3 mr-1" />
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Write Review CTA */}
        <Card className="mt-8 bg-gradient-to-r from-teal-50 to-green-50 border-teal-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Share Your Experience
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Help other shoppers make informed decisions by writing honest reviews about your purchases.
            </p>
            <Button className="bg-teal-600 hover:bg-teal-700 px-8 py-3">
              Write a Review
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ReviewsPage;