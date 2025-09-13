import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Heart, Share2, TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { products } from '../mock/mockData';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id)) || products[0];
  const [selectedStore, setSelectedStore] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <span>Home</span> / <span>Electronics</span> / <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Product Info */}
          <div className="lg:col-span-2">
            
            {/* Product Images and Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              
              {/* Product Image */}
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>

              {/* Product Details */}
              <div>
                <Badge className="mb-4 bg-teal-100 text-teal-800">
                  {product.category}
                </Badge>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-medium">{product.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-600">{product.reviews} reviews</span>
                </div>

                <div className="mb-6">
                  <div className="text-3xl font-bold text-teal-600 mb-2">
                    ${product.minPrice.toLocaleString()}
                  </div>
                  <div className="text-gray-600">
                    Price range: ${product.minPrice.toLocaleString()} - ${product.maxPrice.toLocaleString()}
                  </div>
                </div>

                <div className="flex gap-3 mb-6">
                  <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                    Compare All Stores
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                {/* Price Alert */}
                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="p-4">
                    <div className="flex items-center text-orange-700">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <span className="font-medium">Set Price Alert</span>
                    </div>
                    <p className="text-sm text-orange-600 mt-1">
                      Get notified when this product drops below $1,500
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Specifications */}
            <Card className="mb-8">
              <CardHeader>
                <h3 className="text-xl font-semibold">Specifications</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-700">{key}</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price History */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Price History</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {product.priceHistory.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{entry.date}</span>
                      <div className="flex items-center">
                        <span className="font-bold text-gray-900 mr-2">
                          ${entry.price.toLocaleString()}
                        </span>
                        {index > 0 && (
                          entry.price < product.priceHistory[index - 1].price ? (
                            <TrendingDown className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingUp className="h-4 w-4 text-red-600" />
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Store Comparison */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <h3 className="text-xl font-semibold">Compare Stores</h3>
                <p className="text-gray-600">Find the best deal from trusted retailers</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {product.stores.map((store, index) => (
                    <div 
                      key={index}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedStore === index 
                          ? 'border-teal-500 bg-teal-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedStore(index)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{store.name}</h4>
                        <Badge 
                          variant={store.stock === 'In Stock' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {store.stock}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-2xl font-bold text-teal-600">
                          ${store.price.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">{store.rating}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-3">
                        Delivery: {store.delivery}
                      </div>

                      <Button 
                        className="w-full" 
                        variant={selectedStore === index ? "default" : "outline"}
                      >
                        {selectedStore === index ? "Selected Store" : "Select Store"}
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tip</h4>
                  <p className="text-sm text-blue-800">
                    Prices update daily. Set up price alerts to catch the best deals!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;