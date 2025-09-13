import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Grid, List } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TouchCarousel from "../components/ProductCarousel";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { categories, products } from "../mock/mockData";

const CategoriesPage = () => {
  const { category } = useParams();
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popularity");
  const [priceRange, setPriceRange] = useState("all");
  const [notification, setNotification] = useState("");
  const [addedProducts, setAddedProducts] = useState(() => {
    const compared = JSON.parse(localStorage.getItem("comparedProducts") || "[]");
    return new Set(compared.map((p) => p.id));
  });

  const currentCategory = useMemo(
    () =>
      categories.find(
        (cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === category
      ) || categories[0],
    [category]
  );

  const categoryProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.category === currentCategory.name ||
          currentCategory.name === "Daily Deals"
      ),
    [currentCategory]
  );

  const filteredProducts = useMemo(
    () =>
      categoryProducts.filter((product) => {
        if (priceRange === "all") return true;
        if (priceRange === "under-100") return product.minPrice < 100;
        if (priceRange === "100-500")
          return product.minPrice >= 100 && product.minPrice <= 500;
        if (priceRange === "500-1000")
          return product.minPrice >= 500 && product.minPrice <= 1000;
        if (priceRange === "over-1000") return product.minPrice > 1000;
        return true;
      }),
    [categoryProducts, priceRange]
  );

  const sortedProducts = useMemo(
    () =>
      [...filteredProducts].sort((a, b) => {
        if (sortBy === "popularity") return b.rating - a.rating;
        if (sortBy === "price-low") return a.minPrice - b.minPrice;
        if (sortBy === "price-high") return b.minPrice - a.minPrice;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest") return b.id - a.id;
        return 0;
      }),
    [filteredProducts, sortBy]
  );

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleAddToCompare = (product) => {
    try {
      const compared = JSON.parse(localStorage.getItem("comparedProducts") || "[]");
      const productForCompare = {
        id: product.id,
        name: product.name,
        image: product.image,
        minPrice: product.minPrice,
        rating: product.rating,
        specs: product.specifications,
      };
      if (!compared.find((p) => p.id === product.id) && compared.length < 4) {
        const updated = [...compared, productForCompare];
        localStorage.setItem("comparedProducts", JSON.stringify(updated));
        setAddedProducts((prev) => new Set([...prev, product.id]));
        showNotification(`Added to compare (${updated.length}/4)`);
        // Dispatch storage event manually so other components update instantly
        window.dispatchEvent(new Event("storage"));
      } else {
        showNotification(
          compared.find((p) => p.id === product.id)
            ? "Product already added."
            : "Max 4 products reached."
        );
      }
    } catch (error) {
      console.error("Error adding to compare:", error);
      showNotification("Failed to add product to compare. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            {currentCategory.name}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {currentCategory.description}
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8 relative">
        {notification && (
          <div className="fixed top-4 right-4 bg-teal-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out">
            {notification}
          </div>
        )}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <span className="text-gray-700 font-medium">
            {sortedProducts.length} products found
          </span>
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-100">Under $100</SelectItem>
                <SelectItem value="100-500">$100 - $500</SelectItem>
                <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                <SelectItem value="over-1000">Over $1,000</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-l-lg ${
                  viewMode === "grid"
                    ? "bg-teal-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-r-lg ${
                  viewMode === "list"
                    ? "bg-teal-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <TouchCarousel
            products={sortedProducts}
            title={`Featured ${currentCategory.name}`}
          />
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">All {currentCategory.name}</h2>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow p-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="text-lg font-bold text-teal-600 mb-2">
                    ${product.minPrice.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    from {product.stores.length} stores
                  </div>
                  <Button
                    className="w-full bg-teal-600 hover:bg-teal-700"
                    onClick={() => handleAddToCompare(product)}
                  >
                    {addedProducts.has(product.id)
                      ? "Added to Compare"
                      : "Compare Prices"}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full md:w-48 h-48 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <div className="text-2xl font-bold text-teal-600 mb-2">
                        ${product.minPrice.toLocaleString()}
                      </div>
                      <div className="text-gray-600 mb-4">
                        Available from {product.stores.length} stores
                      </div>
                      <div className="flex gap-3">
                        <Button
                          className="bg-teal-600 hover:bg-teal-700"
                          onClick={() => handleAddToCompare(product)}
                        >
                          {addedProducts.has(product.id)
                            ? "Added to Compare"
                            : "Compare Prices"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
