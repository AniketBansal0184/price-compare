import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUp 
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Back to top button */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <Button
          onClick={scrollToTop}
          className="bg-teal-600 hover:bg-teal-700 rounded-full w-12 h-12 shadow-lg"
          size="icon"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company info */}
          <div>
            <h3 className="text-2xl font-bold text-teal-400 mb-4">PriceSpy NZ</h3>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              New Zealand's leading price comparison website. Compare prices from over 1,000 stores and save money on every purchase.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-teal-600/20">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-teal-600/20">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-teal-600/20">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-teal-600/20">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/categories" className="text-gray-400 hover:text-teal-400 transition-colors">All Categories</a></li>
              <li><a href="/daily-deals" className="text-gray-400 hover:text-teal-400 transition-colors">Daily Deals</a></li>
              <li><a href="/price-alerts" className="text-gray-400 hover:text-teal-400 transition-colors">Price Alerts</a></li>
              <li><a href="/stores" className="text-gray-400 hover:text-teal-400 transition-colors">All Stores</a></li>
              <li><a href="/reviews" className="text-gray-400 hover:text-teal-400 transition-colors">Product Reviews</a></li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/help" className="text-gray-400 hover:text-teal-400 transition-colors">Help Center</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-teal-400 transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-teal-400 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-teal-400 transition-colors">Terms of Service</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-teal-400 transition-colors">About Us</a></li>
            </ul>
            
            {/* Contact info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-gray-400 text-sm">
                <Phone className="h-4 w-4 mr-2 text-teal-400" />
                0800 PRICE SPY
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Mail className="h-4 w-4 mr-2 text-teal-400" />
                help@pricespy.co.nz
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <MapPin className="h-4 w-4 mr-2 text-teal-400" />
                Auckland, New Zealand
              </div>
            </div>
          </div>

          {/* Newsletter signup */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest deals and price drops delivered to your inbox.
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-teal-500"
              />
              <Button className="w-full bg-teal-600 hover:bg-teal-700">
                Subscribe
              </Button>
            </div>
            
            {/* Download app */}
            <div className="mt-6">
              <h5 className="font-medium mb-3 text-white text-sm">Download Our App</h5>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="text-xs border-gray-600 text-gray-300 hover:bg-gray-800">
                  App Store
                </Button>
                <Button variant="outline" size="sm" className="text-xs border-gray-600 text-gray-300 hover:bg-gray-800">
                  Google Play
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 PriceSpy New Zealand. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/sitemap" className="text-gray-400 hover:text-teal-400 transition-colors">Sitemap</a>
              <a href="/cookies" className="text-gray-400 hover:text-teal-400 transition-colors">Cookies</a>
              <a href="/accessibility" className="text-gray-400 hover:text-teal-400 transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;