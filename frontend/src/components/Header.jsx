import React, { useState } from "react";
import { Search, Menu, X, User, Heart, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import HamburgerMenu from "./HamburgerMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = [
    { name: "Categories", href: "/categories" },
    { name: "Daily Deals", href: "/daily-deals" },
    { name: "Price Alerts", href: "/alerts" },
    { name: "Stores", href: "/stores" },
    { name: "Reviews", href: "/reviews" },
    { name: "Compare", href: "/compare" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Navigate to search results
    }
  };

  return (
    <>
      {/* Top banner */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span>
            🔥 New deals updated daily - Save up to 70% on electronics!
          </span>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button and logo */}
            <div className="flex items-center">
              <div className="md:hidden mr-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </div>

              {/* Logo */}
              <div className="flex-shrink-0">
                <a href="/" className="flex items-center">
                  <span className="text-2xl font-bold text-teal-600">
                    PriceSpy
                  </span>
                  <span className="text-xs text-gray-500 ml-1">NZ</span>
                </a>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 min-w-[18px] h-[18px] flex items-center justify-center">
                  3
                </Badge>
              </Button>

              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs px-1 min-w-[18px] h-[18px] flex items-center justify-center">
                  5
                </Badge>
              </Button>

              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
                <span className="ml-2">Sign In</span>
              </Button>
            </div>

            {/* Mobile icons */}
            <div className="md:hidden flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 min-w-[16px] h-[16px] flex items-center justify-center">
                  3
                </Badge>
              </Button>

              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs px-1 min-w-[16px] h-[16px] flex items-center justify-center">
                  5
                </Badge>
              </Button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex border-t border-gray-200 py-3">
            <div className="flex space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-teal-600 font-medium text-sm transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-2 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:ring-0"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 px-3"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </header>

      {/* Hamburger Menu */}
      <HamburgerMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;
