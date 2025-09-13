import React, { useState } from 'react';
import { Star, MapPin, Truck, Store, Filter, Grid, List } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const StoresPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const stores = [
    {
      id: 1,
      name: "JB Hi-Fi",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop",
      rating: 4.5,
      reviews: 12890,
      description: "Leading electronics and entertainment retailer",
      deliveryOptions: ["Free shipping over $75", "Click & Collect", "Express delivery"],
      categories: ["Electronics", "Computers", "Gaming", "Music", "Movies"],
      location: "Nationwide - 200+ stores",
      website: "jbhifi.co.nz",
      established: 1974,
      phoneNumber: "0800 JB HIFI",
      features: ["Price match guarantee", "Extended warranties", "Trade-in program"]
    },
    {
      id: 2,
      name: "Harvey Norman",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop",
      rating: 4.3,
      reviews: 8976,
      description: "Furniture, electrical and computer superstore",
      deliveryOptions: ["Home delivery", "In-store pickup", "Installation service"],
      categories: ["Electronics", "Home & Garden", "Furniture", "Computers", "Appliances"],
      location: "North Island - 50+ stores",
      website: "harveynorman.co.nz",
      established: 1982,
      phoneNumber: "0800 HARVEY",
      features: ["Interest-free terms", "Professional installation", "Extended warranties"]
    },
    {
      id: 3,
      name: "PB Tech",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop",
      rating: 4.6,
      reviews: 15670,
      description: "New Zealand's technology superstore",
      deliveryOptions: ["Same day delivery", "Free pickup", "Express courier"],
      categories: ["Computers", "Gaming", "Tech Accessories", "Software", "Networking"],
      location: "Auckland - 10+ stores",
      website: "pbtech.co.nz",
      established: 1991,
      phoneNumber: "09 523 8800",
      features: ["Expert advice", "Custom builds", "Repair services"]
    },
    {
      id: 4,
      name: "Mighty Ape",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop",
      rating: 4.4,
      reviews: 9543,
      description: "Online retailer for games, tech and pop culture",
      deliveryOptions: ["Free shipping over $50", "Express delivery", "Click & Collect"],
      categories: ["Gaming", "Electronics", "Toys", "Books", "Collectibles"],
      location: "Online + Auckland warehouse",
      website: "mightyape.co.nz",
      established: 1998,
      phoneNumber: "0800 MIGHTY APE",
      features: ["Fast dispatch", "Reward points", "Pre-order system"]
    },
    {
      id: 5,
      name: "Noel Leeming",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop",
      rating: 4.2,
      reviews: 7234,
      description: "Technology and appliance specialist",
      deliveryOptions: ["Home delivery", "Installation service", "Store pickup"],
      categories: ["Electronics", "Appliances", "Computers", "Mobile", "Home Tech"],
      location: "Nationwide - 70+ stores",
      website: "noelleeming.co.nz",
      established: 1884,
      phoneNumber: "0800 NOEL LEEMING",
      features: ["Lowest price promise", "Tech support", "Trade-in deals"]
    },
    {
      id: 6,
      name: "The Warehouse",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop",
      rating: 4.0,
      reviews: 11250,
      description: "Where everyone gets a bargain",
      deliveryOptions: ["Click & Collect", "Home delivery", "Express pickup"],
      categories: ["Electronics", "Home & Garden", "Fashion", "Toys", "Sports"],
      location: "Nationwide - 90+ stores",
      website: "thewarehouse.co.nz",
      established: 1982,
      phoneNumber: "0800 THE WAREHOUSE",
      features: ["Everyday low prices", "Layby available", "Red Rewards"]
    }
  ];

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || store.categories.includes(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            🏪 Trusted Stores
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Shop with confidence from New Zealand's most trusted retailers. Compare prices and find the best deals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search stores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Computers">Computers</SelectItem>
                <SelectItem value="Gaming">Gaming</SelectItem>
                <SelectItem value="Home & Garden">Home & Garden</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="alphabetical">Alphabetical</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-teal-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-r-lg ${viewMode === 'list' ? 'bg-teal-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredStores.length} of {stores.length} stores
          </p>
        </div>

        {/* Stores Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store) => (
              <Card key={store.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <img
                        src={store.logo}
                        alt={store.name}
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                          {store.name}
                        </h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600 ml-1">
                            {store.rating} ({store.reviews.toLocaleString()})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm">
                    {store.description}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {store.location}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Store className="h-4 w-4 mr-2 text-gray-400" />
                      Est. {store.established}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-500 mb-2">CATEGORIES</p>
                    <div className="flex flex-wrap gap-1">
                      {store.categories.slice(0, 3).map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                      {store.categories.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{store.categories.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      View Store
                    </Button>
                    <Button variant="outline" className="w-full">
                      Browse Products
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredStores.map((store) => (
              <Card key={store.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* Store Info */}
                    <div className="flex items-start lg:w-1/3">
                      <img
                        src={store.logo}
                        alt={store.name}
                        className="w-16 h-16 rounded-lg object-cover mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-2">
                          {store.name}
                        </h3>
                        <div className="flex items-center mb-2">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-gray-600 ml-1">
                            {store.rating} ({store.reviews.toLocaleString()} reviews)
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {store.description}
                        </p>
                      </div>
                    </div>

                    {/* Store Details */}
                    <div className="lg:w-1/3 space-y-3">
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-2">DELIVERY OPTIONS</p>
                        {store.deliveryOptions.slice(0, 2).map((option) => (
                          <div key={option} className="flex items-center text-sm text-gray-600 mb-1">
                            <Truck className="h-3 w-3 mr-2 text-green-500" />
                            {option}
                          </div>
                        ))}
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-2">CATEGORIES</p>
                        <div className="flex flex-wrap gap-1">
                          {store.categories.slice(0, 4).map((category) => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:w-1/3 flex flex-col justify-center space-y-3">
                      <Button className="bg-teal-600 hover:bg-teal-700">
                        Visit Store
                      </Button>
                      <Button variant="outline">
                        Browse Products
                      </Button>
                      <Button variant="outline">
                        Store Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default StoresPage;