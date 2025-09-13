import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const TouchCarousel = ({ products, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const carouselRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 768) setItemsPerView(2);
      else if (window.innerWidth < 1024) setItemsPerView(3);
      else setItemsPerView(4);
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, products.length - itemsPerView);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, products.length - itemsPerView);
      return prev === 0 ? maxIndex : prev - 1;
    });
  };

  // Touch/Mouse event handlers
  const handleStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setTranslateX(0);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50;
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    setTranslateX(0);
  };

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const handleProductClick = (productId, e) => {
    if (isDragging || Math.abs(translateX) > 10) {
      e.preventDefault();
      return;
    }
    window.location.href = `/product/${productId}`;
  };

  const containerStyle = {
    transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}% + ${translateX}px))`,
    transition: isDragging ? 'none' : 'transform 0.3s ease-out',
    width: `${(products.length / itemsPerView) * 100}%`,
    display: 'flex'
  };

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="h-10 w-10 rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="h-10 w-10 rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="overflow-hidden" ref={containerRef}>
        <div
          ref={carouselRef}
          className="cursor-grab active:cursor-grabbing select-none"
          style={containerStyle}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="px-3"
              style={{ width: `${100 / products.length}%` }}
            >
              <Card 
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-teal-300 transform hover:-translate-y-1 h-full"
                onClick={(e) => handleProductClick(product.id, e)}
              >
                <CardContent className="p-4 h-full flex flex-col">
                  <div className="relative mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                      draggable={false}
                    />
                    <Badge 
                      variant="secondary" 
                      className="absolute top-2 right-2 bg-teal-100 text-teal-800 font-medium"
                    >
                      {product.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors flex-grow">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    <div className="text-lg font-bold text-teal-600">
                      ${product.minPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      from {product.stores.length} stores
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium mt-auto"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Compare prices for:', product.id);
                    }}
                  >
                    Compare Prices
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ 
          length: Math.ceil((products.length - itemsPerView + 1)) 
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-8 rounded-full transition-all duration-200 ${
              currentIndex === index
                ? 'bg-teal-600 shadow-sm'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TouchCarousel;