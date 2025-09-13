// Enhanced Mock data for PriceSpy clone with more products and categories

export const categories = [
  {
    id: 1,
    name: "Daily Deals",
    icon: "percent",
    color: "#e53e3e",
    description: "Best deals updated daily",
    subcategories: [
      "Electronics Deals",
      "Fashion Deals", 
      "Home Deals",
      "Sports Deals"
    ]
  },
  {
    id: 2,
    name: "Used Cars",
    icon: "car",
    color: "#38a169", 
    description: "Compare car prices",
    subcategories: [
      "Sedans",
      "SUVs", 
      "Hatchbacks",
      "Utes",
      "Motorbikes"
    ]
  },
  {
    id: 3,
    name: "Computers & Accessories",
    icon: "laptop",
    color: "#3182ce",
    description: "Tech gadgets & accessories",
    subcategories: [
      "Laptops",
      "Desktops",
      "Monitors", 
      "Keyboards & Mice",
      "Storage",
      "Graphics Cards"
    ]
  },
  {
    id: 4,
    name: "Home & Garden",
    icon: "home",
    color: "#805ad5",
    description: "Everything for your home",
    subcategories: [
      "Furniture",
      "Kitchen Appliances",
      "Garden Tools",
      "Home Decor",
      "Cleaning"
    ]
  },
  {
    id: 5,
    name: "Electronics",
    icon: "smartphone",
    color: "#d69e2e",
    description: "Latest electronics",
    subcategories: [
      "Smartphones",
      "Tablets",
      "TVs",
      "Audio",
      "Cameras",
      "Gaming"
    ]
  },
  {
    id: 6,
    name: "Fashion",
    icon: "shirt",
    color: "#e53e3e",
    description: "Clothing & accessories",
    subcategories: [
      "Men's Clothing",
      "Women's Clothing",
      "Shoes",
      "Accessories",
      "Watches"
    ]
  },
  {
    id: 7,
    name: "Sports & Fitness",
    icon: "dumbbell",
    color: "#38a169",
    description: "Sports & fitness gear",
    subcategories: [
      "Fitness Equipment",
      "Sportswear",
      "Outdoor Gear",
      "Team Sports"
    ]
  },
  {
    id: 8,
    name: "Beauty & Health",
    icon: "heart",
    color: "#e91e63",
    description: "Health & beauty products",
    subcategories: [
      "Skincare",
      "Makeup",
      "Health Supplements",
      "Personal Care"
    ]
  }
];

export const products = [
  {
    id: 1,
    name: "iPhone 15 Pro 128GB",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
    minPrice: 1599,
    maxPrice: 1799,
    stores: [
      { name: "Apple Store", price: 1799, rating: 4.8, delivery: "Free", stock: "In Stock" },
      { name: "PB Tech", price: 1689, rating: 4.6, delivery: "$15", stock: "In Stock" },
      { name: "JB Hi-Fi", price: 1599, rating: 4.5, delivery: "Free", stock: "Limited" },
      { name: "Harvey Norman", price: 1729, rating: 4.3, delivery: "$20", stock: "In Stock" }
    ],
    rating: 4.7,
    reviews: 2341,
    priceHistory: [
      { date: "2024-01", price: 1799 },
      { date: "2024-02", price: 1749 },
      { date: "2024-03", price: 1699 },
      { date: "2024-04", price: 1599 }
    ],
    specifications: {
      "Display": "6.1-inch Super Retina XDR",
      "Processor": "A17 Pro chip", 
      "Storage": "128GB",
      "Camera": "48MP Main camera",
      "Battery": "Up to 23 hours video"
    }
  },
  {
    id: 2,
    name: "Samsung 65\" QLED 4K TV",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300&h=300&fit=crop",
    minPrice: 2199,
    maxPrice: 2599,
    stores: [
      { name: "Samsung Store", price: 2599, rating: 4.9, delivery: "Free", stock: "In Stock" },
      { name: "JB Hi-Fi", price: 2299, rating: 4.5, delivery: "Free", stock: "In Stock" },
      { name: "Harvey Norman", price: 2199, rating: 4.3, delivery: "$50", stock: "In Stock" },
      { name: "Noel Leeming", price: 2399, rating: 4.4, delivery: "$30", stock: "Limited" }
    ],
    rating: 4.6,
    reviews: 1876,
    priceHistory: [
      { date: "2024-01", price: 2799 },
      { date: "2024-02", price: 2599 },
      { date: "2024-03", price: 2399 },
      { date: "2024-04", price: 2199 }
    ],
    specifications: {
      "Screen Size": "65 inches",
      "Resolution": "4K QLED",
      "Smart TV": "Tizen OS",
      "HDR": "HDR10+",
      "Connectivity": "4x HDMI, 2x USB"
    }
  },
  {
    id: 3,
    name: "MacBook Air M3 13\"",
    category: "Computers & Accessories",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop",
    minPrice: 1999,
    maxPrice: 2299,
    stores: [
      { name: "Apple Store", price: 2299, rating: 4.8, delivery: "Free", stock: "In Stock" },
      { name: "PB Tech", price: 2199, rating: 4.6, delivery: "$15", stock: "In Stock" },
      { name: "Computer Lounge", price: 1999, rating: 4.4, delivery: "$25", stock: "In Stock" },
      { name: "JB Hi-Fi", price: 2099, rating: 4.5, delivery: "Free", stock: "Limited" }
    ],
    rating: 4.8,
    reviews: 3421,
    priceHistory: [
      { date: "2024-01", price: 2399 },
      { date: "2024-02", price: 2299 },
      { date: "2024-03", price: 2199 },
      { date: "2024-04", price: 1999 }
    ],
    specifications: {
      "Processor": "Apple M3 chip",
      "Memory": "8GB unified memory",
      "Storage": "256GB SSD",
      "Display": "13.6-inch Liquid Retina",
      "Battery": "Up to 18 hours"
    }
  },
  {
    id: 4,
    name: "Sony WH-1000XM5 Headphones",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    minPrice: 399,
    maxPrice: 499,
    stores: [
      { name: "Sony Store", price: 499, rating: 4.9, delivery: "Free", stock: "In Stock" },
      { name: "JB Hi-Fi", price: 449, rating: 4.5, delivery: "Free", stock: "In Stock" },
      { name: "PB Tech", price: 399, rating: 4.6, delivery: "$15", stock: "In Stock" },
      { name: "Harvey Norman", price: 479, rating: 4.3, delivery: "$20", stock: "Limited" }
    ],
    rating: 4.8,
    reviews: 2156,
    priceHistory: [
      { date: "2024-01", price: 549 },
      { date: "2024-02", price: 499 },
      { date: "2024-03", price: 449 },
      { date: "2024-04", price: 399 }
    ],
    specifications: {
      "Type": "Over-ear wireless",
      "Noise Cancelling": "Industry-leading ANC",
      "Battery": "30 hours with ANC",
      "Connectivity": "Bluetooth 5.2",
      "Features": "Touch controls, speak-to-chat"
    }
  },
  {
    id: 5,
    name: "Nintendo Switch OLED",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    minPrice: 549,
    maxPrice: 629,
    stores: [
      { name: "EB Games", price: 629, rating: 4.7, delivery: "Free", stock: "In Stock" },
      { name: "JB Hi-Fi", price: 579, rating: 4.5, delivery: "Free", stock: "In Stock" },
      { name: "PB Tech", price: 549, rating: 4.6, delivery: "$15", stock: "Limited" },
      { name: "Mighty Ape", price: 599, rating: 4.4, delivery: "$10", stock: "In Stock" }
    ],
    rating: 4.6,
    reviews: 1789,
    priceHistory: [
      { date: "2024-01", price: 649 },
      { date: "2024-02", price: 629 },
      { date: "2024-03", price: 599 },
      { date: "2024-04", price: 549 }
    ],
    specifications: {
      "Display": "7-inch OLED screen",
      "Storage": "64GB internal",
      "Battery": "4.5-9 hours",
      "Modes": "TV, Tabletop, Handheld",
      "Controllers": "Joy-Con controllers included"
    }
  },
  {
    id: 6,
    name: "iPad Pro 11\" M4",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
    minPrice: 1599,
    maxPrice: 1799,
    stores: [
      { name: "Apple Store", price: 1799, rating: 4.8, delivery: "Free", stock: "In Stock" },
      { name: "JB Hi-Fi", price: 1699, rating: 4.5, delivery: "Free", stock: "In Stock" },
      { name: "PB Tech", price: 1599, rating: 4.6, delivery: "$15", stock: "In Stock" },
      { name: "Harvey Norman", price: 1749, rating: 4.3, delivery: "$20", stock: "Limited" }
    ],
    rating: 4.7,
    reviews: 1567,
    priceHistory: [
      { date: "2024-01", price: 1899 },
      { date: "2024-02", price: 1799 },
      { date: "2024-03", price: 1699 },
      { date: "2024-04", price: 1599 }
    ],
    specifications: {
      "Display": "11-inch Liquid Retina",
      "Processor": "M4 chip",
      "Storage": "256GB",
      "Camera": "12MP Wide camera",
      "Connectivity": "Wi-Fi 6E"
    }
  },
  {
    id: 7,
    name: "Dell XPS 13 Laptop",
    category: "Computers & Accessories",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
    minPrice: 1799,
    maxPrice: 2199,
    stores: [
      { name: "Dell Store", price: 2199, rating: 4.7, delivery: "Free", stock: "In Stock" },
      { name: "PB Tech", price: 1999, rating: 4.6, delivery: "$15", stock: "In Stock" },
      { name: "Computer Lounge", price: 1799, rating: 4.4, delivery: "$25", stock: "In Stock" },
      { name: "JB Hi-Fi", price: 1899, rating: 4.5, delivery: "Free", stock: "Limited" }
    ],
    rating: 4.5,
    reviews: 987,
    priceHistory: [
      { date: "2024-01", price: 2399 },
      { date: "2024-02", price: 2199 },
      { date: "2024-03", price: 1999 },
      { date: "2024-04", price: 1799 }
    ],
    specifications: {
      "Processor": "Intel Core i7-13700H",
      "Memory": "16GB LPDDR5",
      "Storage": "512GB SSD",
      "Display": "13.4-inch FHD+",
      "Graphics": "Intel Iris Xe"
    }
  },
  {
    id: 8,
    name: "Samsung Galaxy S24 Ultra",
    category: "Electronics", 
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
    minPrice: 1799,
    maxPrice: 2099,
    stores: [
      { name: "Samsung Store", price: 2099, rating: 4.8, delivery: "Free", stock: "In Stock" },
      { name: "JB Hi-Fi", price: 1899, rating: 4.5, delivery: "Free", stock: "In Stock" },
      { name: "PB Tech", price: 1799, rating: 4.6, delivery: "$15", stock: "In Stock" },
      { name: "2degrees", price: 1999, rating: 4.2, delivery: "$25", stock: "Limited" }
    ],
    rating: 4.7,
    reviews: 2890,
    priceHistory: [
      { date: "2024-01", price: 2199 },
      { date: "2024-02", price: 2099 },
      { date: "2024-03", price: 1999 },
      { date: "2024-04", price: 1799 }
    ],
    specifications: {
      "Display": "6.8-inch Dynamic AMOLED 2X",
      "Processor": "Snapdragon 8 Gen 3",
      "Storage": "256GB",
      "Camera": "200MP main camera",
      "Battery": "5000mAh"
    }
  },
  {
    id: 9,
    name: "LG OLED55C3 4K TV",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=300&h=300&fit=crop",
    minPrice: 1899,
    maxPrice: 2299,
    stores: [
      { name: "LG Store", price: 2299, rating: 4.8, delivery: "Free", stock: "In Stock" },
      { name: "JB Hi-Fi", price: 2099, rating: 4.5, delivery: "Free", stock: "In Stock" },
      { name: "Harvey Norman", price: 1899, rating: 4.3, delivery: "$50", stock: "In Stock" },
      { name: "Noel Leeming", price: 2149, rating: 4.4, delivery: "$30", stock: "Limited" }
    ],
    rating: 4.8,
    reviews: 1456,
    priceHistory: [
      { date: "2024-01", price: 2499 },
      { date: "2024-02", price: 2299 },
      { date: "2024-03", price: 2099 },
      { date: "2024-04", price: 1899 }
    ],
    specifications: {
      "Screen Size": "55 inches",
      "Panel Type": "OLED evo",
      "Resolution": "4K Ultra HD",
      "Smart TV": "webOS 23",
      "Gaming": "120Hz, VRR, ALLM"
    }
  },
  {
    id: 10,
    name: "Honda Civic 2023",
    category: "Used Cars",
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=300&h=300&fit=crop",
    minPrice: 28990,
    maxPrice: 35990,
    stores: [
      { name: "Honda Auckland", price: 35990, rating: 4.7, delivery: "N/A", stock: "Available" },
      { name: "Car Fair", price: 31500, rating: 4.2, delivery: "N/A", stock: "Available" },
      { name: "Auckland Motors", price: 28990, rating: 4.0, delivery: "N/A", stock: "Available" },
      { name: "Trade Me Motors", price: 32990, rating: 4.1, delivery: "N/A", stock: "Available" }
    ],
    rating: 4.5,
    reviews: 892,
    priceHistory: [
      { date: "2024-01", price: 37990 },
      { date: "2024-02", price: 35990 },
      { date: "2024-03", price: 32990 },
      { date: "2024-04", price: 28990 }
    ],
    specifications: {
      "Engine": "1.5L Turbo",
      "Transmission": "CVT Automatic",
      "Fuel Economy": "6.7L/100km",
      "Safety": "5-star ANCAP",
      "Warranty": "5 years unlimited km"
    }
  },
  {
    id: 11,
    name: "Dyson V15 Detect Vacuum",
    category: "Home & Garden",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    minPrice: 899,
    maxPrice: 1099,
    stores: [
      { name: "Dyson", price: 1099, rating: 4.9, delivery: "Free", stock: "In Stock" },
      { name: "Harvey Norman", price: 999, rating: 4.3, delivery: "$20", stock: "In Stock" },
      { name: "Farmers", price: 899, rating: 4.1, delivery: "$15", stock: "In Stock" },
      { name: "Briscoes", price: 949, rating: 4.0, delivery: "$25", stock: "Limited" }
    ],
    rating: 4.7,
    reviews: 1567,
    priceHistory: [
      { date: "2024-01", price: 1199 },
      { date: "2024-02", price: 1099 },
      { date: "2024-03", price: 999 },
      { date: "2024-04", price: 899 }
    ],
    specifications: {
      "Type": "Cordless stick vacuum",
      "Runtime": "Up to 60 minutes",
      "Bin Capacity": "0.77L",
      "Filtration": "Advanced whole-machine",
      "Features": "Laser dust detection"
    }
  },
  {
    id: 12,
    name: "Nike Air Jordan 1 Retro",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
    minPrice: 219,
    maxPrice: 289,
    stores: [
      { name: "Nike Store", price: 289, rating: 4.8, delivery: "Free", stock: "In Stock" },
      { name: "Rebel Sport", price: 259, rating: 4.4, delivery: "$10", stock: "In Stock" },
      { name: "The Iconic", price: 219, rating: 4.2, delivery: "Free", stock: "Limited" },
      { name: "Footlocker", price: 239, rating: 4.3, delivery: "$15", stock: "In Stock" }
    ],
    rating: 4.6,
    reviews: 2890,
    priceHistory: [
      { date: "2024-01", price: 309 },
      { date: "2024-02", price: 289 },
      { date: "2024-03", price: 259 },
      { date: "2024-04", price: 219 }
    ],
    specifications: {
      "Material": "Leather and synthetic",
      "Sole": "Rubber outsole",
      "Sizes": "US 7-13",
      "Colors": "Multiple colorways",
      "Style": "Basketball inspired"
    }
  }
];

export const dailyDeals = [
  {
    id: 101,
    name: "AirPods Pro 2nd Gen",
    originalPrice: 399,
    salePrice: 329,
    discount: 18,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300&h=300&fit=crop",
    store: "JB Hi-Fi",
    timeLeft: "2 days",
    rating: 4.8
  },
  {
    id: 102,
    name: "Sony PlayStation 5",
    originalPrice: 899,
    salePrice: 799,
    discount: 11,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=300&fit=crop",
    store: "EB Games",
    timeLeft: "1 day",
    rating: 4.9
  },
  {
    id: 103,
    name: "Instant Pot 6Qt",
    originalPrice: 249,
    salePrice: 189,
    discount: 24,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
    store: "Farmers",
    timeLeft: "3 days",
    rating: 4.5
  },
  {
    id: 104,
    name: "Samsung Galaxy Watch 6",
    originalPrice: 549,
    salePrice: 449,
    discount: 18,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    store: "PB Tech",
    timeLeft: "5 hours",
    rating: 4.6
  },
  {
    id: 105,
    name: "Beats Studio Buds+",
    originalPrice: 249,
    salePrice: 199,
    discount: 20,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop",
    store: "Apple Store",
    timeLeft: "6 hours",
    rating: 4.4
  },
  {
    id: 106,
    name: "Fitbit Charge 5",
    originalPrice: 299,
    salePrice: 229,
    discount: 23,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop",
    store: "Harvey Norman",
    timeLeft: "12 hours",
    rating: 4.3
  }
];

export const advertisements = [
  {
    id: 1,
    title: "Save up to 50% on Electronics",
    subtitle: "Limited time offer on top brands",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=300&fit=crop",
    cta: "Shop Now",
    link: "/categories/electronics"
  },
  {
    id: 2,
    title: "New Car Deals Available",
    subtitle: "Find your perfect vehicle at the best price",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=300&fit=crop",
    cta: "Browse Cars",
    link: "/categories/cars"
  },
  {
    id: 3,
    title: "Home Improvement Sale",
    subtitle: "Transform your space for less",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=300&fit=crop",
    cta: "Explore Deals",
    link: "/categories/home-garden"
  }
];

export const stores = [
  {
    id: 1,
    name: "JB Hi-Fi",
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop",
    rating: 4.5,
    reviews: 12890,
    deliveryOptions: ["Free shipping over $75", "Click & Collect"],
    categories: ["Electronics", "Computers", "Gaming"]
  },
  {
    id: 2,
    name: "Harvey Norman",
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop",
    rating: 4.3,
    reviews: 8976,
    deliveryOptions: ["Delivery available", "In-store pickup"],
    categories: ["Electronics", "Home & Garden", "Furniture"]
  },
  {
    id: 3,
    name: "PB Tech",
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop",
    rating: 4.6,
    reviews: 15670,
    deliveryOptions: ["Same day delivery", "Free pickup"],
    categories: ["Computers", "Gaming", "Tech Accessories"]
  }
];

export const priceAlerts = [
  {
    id: 1,
    productName: "iPhone 15 Pro",
    currentPrice: 1599,
    targetPrice: 1500,
    isActive: true
  },
  {
    id: 2,
    productName: "MacBook Air M3",
    currentPrice: 1999,
    targetPrice: 1800,
    isActive: true
  }
];

export const comparisonProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro 128GB",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
    price: 1599,
    rating: 4.7,
    specs: {
      "Display": "6.1-inch Super Retina XDR",
      "Processor": "A17 Pro chip",
      "Storage": "128GB",
      "Camera": "48MP Main camera",
      "Battery": "Up to 23 hours video"
    }
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop", 
    price: 1799,
    rating: 4.7,
    specs: {
      "Display": "6.8-inch Dynamic AMOLED 2X",
      "Processor": "Snapdragon 8 Gen 3",
      "Storage": "256GB", 
      "Camera": "200MP main camera",
      "Battery": "5000mAh"
    }
  }
];