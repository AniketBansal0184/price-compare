import React, { useState, useEffect } from "react";
import { X, Plus, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const ProductComparison = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState("");

  // Load + Sync with localStorage
  useEffect(() => {
    const loadProducts = () => {
      try {
        const stored = localStorage.getItem("comparedProducts");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setSelectedProducts(parsed);
          } else {
            setSelectedProducts([]);
            localStorage.setItem("comparedProducts", JSON.stringify([]));
          }
        } else {
          setSelectedProducts([]);
          localStorage.setItem("comparedProducts", JSON.stringify([]));
        }
      } catch (error) {
        console.error("Error loading compared products:", error);
        setSelectedProducts([]);
        localStorage.setItem("comparedProducts", JSON.stringify([]));
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();

    // Sync on storage changes (even from CategoriesPage)
    window.addEventListener("storage", loadProducts);
    return () => window.removeEventListener("storage", loadProducts);
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const removeProduct = (productId) => {
    try {
      const updated = selectedProducts.filter((p) => p.id !== productId);
      setSelectedProducts(updated);
      localStorage.setItem("comparedProducts", JSON.stringify(updated));
      showNotification("✅ Removed from compare");
      // Dispatch storage event so CategoriesPage updates
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Error removing product:", error);
      showNotification("Failed to remove product. Please try again.");
    }
  };

  const allSpecs = [
    ...new Set(
      selectedProducts.flatMap((product) => Object.keys(product.specs || {}))
    ),
  ];

  const getSpecValue = (product, spec) => product.specs?.[spec] || "-";

  if (isLoading) {
    return <div className="text-center py-12">Loading products...</div>;
  }

  return (
    <div className="py-8 relative">
      {notification && (
        <div className="fixed top-4 right-4 bg-teal-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out">
          {notification}
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Product Comparison
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Compare products side by side to make the best purchasing decision.
            Add up to 4 products to compare specifications and prices.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            <div className="hidden md:block bg-gray-50 p-6 border-r border-gray-200">
              <h3 className="font-semibold text-gray-900 text-center">
                Specifications
              </h3>
            </div>
            {selectedProducts.map((product) => (
              <div
                key={product.id}
                className="p-6 border-r border-gray-200 last:border-r-0"
              >
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="p-1 hover:bg-red-100 rounded-full transition-colors"
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </button>
                </div>
                <div className="relative mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-center mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">
                      {product.rating}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-teal-600 mb-4">
                    ${product.minPrice ? product.minPrice.toLocaleString() : "N/A"}
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
            {selectedProducts.length < 4 && (
              <div className="p-6 bg-gray-50">
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="w-16 h-16 bg-teal-100 hover:bg-teal-200 rounded-full flex items-center justify-center mb-4 transition-colors"
                  >
                    <Plus className="h-8 w-8 text-teal-600" />
                  </button>
                  <h3 className="font-medium text-gray-900 mb-2">
                    View Added Products
                  </h3>
                  <p className="text-sm text-gray-600">
                    Compare up to 4 products
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="border-t border-gray-200">
            {allSpecs.map((spec, index) => (
              <div
                key={spec}
                className={`grid grid-cols-1 md:grid-cols-5 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div className="p-4 font-medium text-gray-900 border-r border-gray-200 md:border-r-0">
                  <span className="md:hidden font-semibold">Spec: </span>
                  {spec}
                </div>
                {selectedProducts.map((product) => (
                  <div
                    key={`${product.id}-${spec}`}
                    className="p-4 text-gray-700 border-r border-gray-200 last:border-r-0"
                  >
                    <span className="md:hidden font-medium">
                      {product.name}:{" "}
                    </span>
                    {getSpecValue(product, spec)}
                  </div>
                ))}
                {selectedProducts.length < 4 && (
                  <div className="p-4 bg-gray-100"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        {showAddProduct && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowAddProduct(false)}
            />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-2xl z-50 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Added Products</h2>
                <button
                  onClick={() => setShowAddProduct(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-4">
                {selectedProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <CardContent className="p-4 flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {product.name}
                        </h3>
                        <div className="text-teal-600 font-medium">
                          ${product.minPrice ? product.minPrice.toLocaleString() : "N/A"}
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeProduct(product.id)}
                      >
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                {selectedProducts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No products added yet
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductComparison;
