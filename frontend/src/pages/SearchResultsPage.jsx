import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, Star, SlidersHorizontal } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TouchCarousel from '../components/TouchCarousel';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';
import { products } from '../mock/mockData';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [notification, setNotification] = useState('');
  const [addedProducts, setAddedProducts] = useState(() => {
    const compared = JSON.parse(localStorage.getItem('comparedProducts') || '[]');
    return new Set(compared.map((p) => p.id));
  });

  const searchResults = useMemo(() => 
    products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    ), [query]);

  const brands = [...new Set(products.map(p => p.name.split(' ')[0]))];
  const categories = [...new Set(products.map(p => p.category))];
  const maxPrice = Math.max(...products.map(p => p.minPrice), 3000);

  const filteredResults = useMemo(() => 
    searchResults.filter(product => {
      const matchesPrice = product.minPrice >= priceRange[0] && product.minPrice <= priceRange[1];
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.some(brand => 
        product.name.toLowerCase().includes(brand.toLowerCase())
      );
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesRating = product.rating >= minRating;
      return matchesPrice && matchesBrand && matchesCategory && matchesRating;
    }), [searchResults, priceRange, selectedBrands, selectedCategories, minRating]);

  const sortedResults = useMemo(() => 
    [...filteredResults].sort((a, b) => {
      if (sortBy === 'relevance') return 0;
      if (sortBy === 'price-low') return a.minPrice - b.minPrice;
      if (sortBy === 'price-high') return b.minPrice - a.minPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popularity') return b.rating - a.rating;
      return 0;
    }), [filteredResults, sortBy]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleCompare = (product) => {
    try {
      const compared = JSON.parse(localStorage.getItem('comparedProducts') || '[]');
      const productForCompare = { 
        id: product.id,
        name: product.name,
        image: product.image,
        minPrice: product.minPrice,
        rating: product.rating,
        specs: product.specifications 
      };
      if (!compared.find(p => p.id === product.id) && compared.length < 4) {
        const updated = [...compared, productForCompare];
        localStorage.setItem('comparedProducts', JSON.stringify(updated));
        setAddedProducts((prev) => new Set([...prev, product.id]));
        showNotification(`Added to compare (${updated.length}/3)`);
      } else {
        showNotification(
          compared.find((p) => p.id === product.id)
            ? 'Product already added.'
            : 'Max 3 products reached.'
        );
      }
    } catch (error) {
      console.error('Error adding to compare:', error);
      showNotification('Failed to add product to compare. Please try again.');
    }
  };

  const handleAddToCompare = (product) => {
    try {
      const compared = JSON.parse(localStorage.getItem('comparedProducts') || '[]');
      const productForCompare = { 
        id: product.id,
        name: product.name,
        image: product.image,
        minPrice: product.minPrice,
        rating: product.rating,
        specs: product.specifications 
      };
      if (!compared.find(p => p.id === product.id) && compared.length < 4) {
        const updated = [...compared, productForCompare];
        localStorage.setItem('comparedProducts', JSON.stringify(updated));
        setAddedProducts((prev) => new Set([...prev, product.id]));
        showNotification(`Added to compare (${updated.length}/3)`);
      } else {
        showNotification(
          compared.find((p) => p.id === product.id)
            ? 'Product already added.'
            : 'Max 3 products reached.'
        );
      }
    } catch (error) {
      console.error('Error adding to compare:', error);
      showNotification('Failed to add product to compare. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Search Results for "{query}"
              </h1>
              <p className="text-gray-600 mt-1">
                {sortedResults.length} products found
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-teal-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-r-lg ${viewMode === 'list' ? 'bg-teal-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h3>
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={maxPrice}
                    step={50}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Brands</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map(brand => (
                      <div key={brand} className="flex items-center">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => handleBrandChange(brand)}
                        />
                        <label htmlFor={brand} className="ml-2 text-sm text-gray-700 cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <label htmlFor={category} className="ml-2 text-sm text-gray-700 cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={minRating === rating}
                          onCheckedChange={() => setMinRating(minRating === rating ? 0 : rating)}
                        />
                        <label htmlFor={`rating-${rating}`} className="ml-2 flex items-center cursor-pointer">
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="ml-1 text-sm text-gray-700">& up</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setPriceRange([0, maxPrice]);
                    setSelectedBrands([]);
                    setSelectedCategories([]);
                    setMinRating(0);
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="lg:w-3/4">
            {notification && (
              <div className="fixed top-4 right-4 bg-teal-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out">
                {notification}
              </div>
            )}
            {query && (
              <div className="mb-6">
                <h3 className="font-medium mb-3">Related Searches:</h3>
                <div className="flex flex-wrap gap-2">
                  {['smartphones', 'laptops', 'headphones', 'tablets'].map(term => (
                    <Badge key={term} variant="secondary" className="cursor-pointer hover:bg-teal-100">
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {sortedResults.length > 0 && (
              <div className="mb-8">
                <TouchCarousel 
                  products={sortedResults.slice(0, 8)} 
                  title="🔥 Trending from your search"
                />
              </div>
            )}
            {sortedResults.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedResults.map((product) => (
                    <Card key={product.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
                        />
                        <Badge className="mb-2">{product.category}</Badge>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600 ml-1">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                        <div className="text-lg font-bold text-teal-600 mb-2">
                          ${product.minPrice.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                          from {product.stores.length} stores
                        </div>
                        <Button
                          className="w-full bg-teal-600 hover:bg-teal-700"
                          onClick={() => handleCompare(product)}
                        >
                          {addedProducts.has(product.id)
                            ? 'Added to Compare'
                            : 'Compare Prices'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {sortedResults.map((product) => (
                    <Card key={product.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full md:w-48 h-48 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <Badge className="mb-2">{product.category}</Badge>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {product.name}
                            </h3>
                            <div className="flex items-center mb-4">
                              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                              <span className="text-gray-600 ml-1">
                                {product.rating} ({product.reviews} reviews)
                              </span>
                            </div>
                            <div className="text-2xl font-bold text-teal-600 mb-2">
                              ${product.minPrice.toLocaleString()}
                            </div>
                            <div className="text-gray-600 mb-4">
                              Available from {product.stores.length} stores
                            </div>
                            <div className="flex gap-3">
                              <Button 
                                className="bg-teal-600 hover:bg-teal-700"
                                onClick={() => handleCompare(product)}
                              >
                                {addedProducts.has(product.id)
                                  ? 'Added to Compare'
                                  : 'Compare Prices'}
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => handleAddToCompare(product)}
                              >
                                Add to Compare
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or filters
                </p>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  Browse All Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;