import React, { useState } from 'react';
import { Bell, Plus, X, TrendingDown, Mail, Smartphone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';

const PriceAlertsPage = () => {
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [email, setEmail] = useState('');

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      productName: "iPhone 15 Pro 128GB",
      currentPrice: 1599,
      targetPrice: 1500,
      isActive: true,
      createdAt: "2024-01-15",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
      store: "JB Hi-Fi",
      priceDrop: 99,
      category: "Electronics"
    },
    {
      id: 2,
      productName: "MacBook Air M3 13\"",
      currentPrice: 1999,
      targetPrice: 1800,
      isActive: true,
      createdAt: "2024-01-20",
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop",
      store: "Apple Store",
      priceDrop: 199,
      category: "Computers"
    },
    {
      id: 3,
      productName: "Sony WH-1000XM5 Headphones",
      currentPrice: 399,
      targetPrice: 350,
      isActive: false,
      createdAt: "2024-01-10",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      store: "PB Tech",
      priceDrop: 49,
      category: "Electronics"
    },
    {
      id: 4,
      productName: "Samsung Galaxy S24 Ultra",
      currentPrice: 1799,
      targetPrice: 1600,
      isActive: true,
      createdAt: "2024-02-01",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      store: "Samsung Store",
      priceDrop: 199,
      category: "Electronics"
    }
  ]);

  const toggleAlert = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const deleteAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const addAlert = () => {
    if (searchQuery && targetPrice) {
      const newAlert = {
        id: Date.now(),
        productName: searchQuery,
        currentPrice: Math.floor(Math.random() * 1000) + 100,
        targetPrice: parseInt(targetPrice),
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0],
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop",
        store: "Various stores",
        priceDrop: 0,
        category: "Electronics"
      };
      setAlerts([newAlert, ...alerts]);
      setSearchQuery('');
      setTargetPrice('');
      setShowAddAlert(false);
    }
  };

  const activeAlerts = alerts.filter(alert => alert.isActive);
  const inactiveAlerts = alerts.filter(alert => !alert.isActive);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            🔔 Price Alerts
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Never miss a great deal! Get notified instantly when your favorite products drop to your target price.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {activeAlerts.length}
              </div>
              <div className="text-green-700 font-medium">Active Alerts</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                ${alerts.reduce((sum, alert) => sum + alert.priceDrop, 0)}
              </div>
              <div className="text-blue-700 font-medium">Total Savings</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                3
              </div>
              <div className="text-orange-700 font-medium">Price Drops</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                24h
              </div>
              <div className="text-purple-700 font-medium">Avg Response</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Alert Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Your Price Alerts</h2>
          <Button 
            onClick={() => setShowAddAlert(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Alert
          </Button>
        </div>

        {/* Active Alerts */}
        {activeAlerts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-green-600">🟢 Active Alerts ({activeAlerts.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeAlerts.map((alert) => (
                <Card key={alert.id} className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start">
                        <img
                          src={alert.image}
                          alt={alert.productName}
                          className="w-16 h-16 object-cover rounded-lg mr-4"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                            {alert.productName}
                          </h4>
                          <Badge className="mb-2">
                            {alert.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={alert.isActive}
                          onCheckedChange={() => toggleAlert(alert.id)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteAlert(alert.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Current Price:</span>
                        <span className="font-bold text-lg">${alert.currentPrice}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Target Price:</span>
                        <span className="font-bold text-lg text-purple-600">${alert.targetPrice}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Price Difference:</span>
                        <div className="flex items-center">
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                          <span className="font-bold text-red-500">
                            ${alert.currentPrice - alert.targetPrice} to go
                          </span>
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Created: {alert.createdAt}</span>
                          <span className="text-gray-500">Store: {alert.store}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Inactive Alerts */}
        {inactiveAlerts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-500">⚫ Inactive Alerts ({inactiveAlerts.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inactiveAlerts.map((alert) => (
                <Card key={alert.id} className="border-l-4 border-l-gray-300 opacity-75 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start">
                        <img
                          src={alert.image}
                          alt={alert.productName}
                          className="w-16 h-16 object-cover rounded-lg mr-4 grayscale"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-600 mb-2 line-clamp-2">
                            {alert.productName}
                          </h4>
                          <Badge variant="secondary">
                            {alert.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={alert.isActive}
                          onCheckedChange={() => toggleAlert(alert.id)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteAlert(alert.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex justify-between">
                        <span>Target Price:</span>
                        <span>${alert.targetPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span>Paused</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* How it works */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <h3 className="text-xl font-bold text-gray-900">How Price Alerts Work</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">Set Your Alert</h4>
                <p className="text-sm text-gray-600">
                  Choose a product and set your desired target price
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingDown className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-semibold mb-2">We Monitor</h4>
                <p className="text-sm text-gray-600">
                  Our system tracks prices across all stores 24/7
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">Get Notified</h4>
                <p className="text-sm text-gray-600">
                  Instant email and SMS alerts when price drops
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Alert Modal */}
      {showAddAlert && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowAddAlert(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Add Price Alert
                </h3>
                <button
                  onClick={() => setShowAddAlert(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Search for a product..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Price ($)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter your target price"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddAlert(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={addAlert}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    Create Alert
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default PriceAlertsPage;