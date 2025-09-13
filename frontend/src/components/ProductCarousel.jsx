import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const ProductCarousel = ({ products, title }) => {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth; // visible width
      containerRef.current.scrollBy({
        left: direction === "next" ? width : -width,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full py-8">
      {/* Heading + Arrows */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("prev")}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("next")}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable Carousel */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {products.map((product) => (
          <Card
            key={product.id}
            className="min-w-[250px] flex-shrink-0 snap-start group hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-teal-300"
          >
            <CardContent className="p-4">
              {/* Product Image */}
              <div className="relative mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                  draggable={false}
                />
                <Badge
                  variant="secondary"
                  className="absolute top-2 right-2 bg-teal-100 text-teal-800"
                >
                  {product.category}
                </Badge>
              </div>

              {/* Product Title */}
              <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600 ml-1">
                  {product.rating} ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="text-lg font-bold text-teal-600">
                  ${product.minPrice.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">
                  from {product.stores.length} stores
                </div>
              </div>

              {/* Compare Button */}
              <Button
                className="w-full mt-3 bg-teal-600 hover:bg-teal-700 text-white"
                size="sm"
              >
                Compare Prices
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
