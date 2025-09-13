# PriceSpy Clone - API Contracts & Integration Plan

## Frontend Features Currently Using Mock Data

### 1. Product Data (mockData.js)
- **Products Array**: 12 detailed products with specifications, stores, ratings
- **Categories**: 8 categories with subcategories
- **Daily Deals**: 6 featured deals with discounts and timers
- **Stores**: Multiple retailers with ratings and delivery info
- **Price History**: Historical pricing data for trend analysis

### 2. Components Using Mock Data
- `TouchCarousel`: Product listings with swipe/touch support
- `ProductComparison`: Side-by-side product comparison
- `DailyDeals`: Featured deals with countdown timers
- `CategoryGrid`: Category navigation with subcategories
- `HamburgerMenu`: Mobile navigation with nested categories

## API Endpoints to Implement

### Products API
```
GET /api/products
- Query params: category, search, sort, limit, offset
- Response: paginated product list with pricing from multiple stores

GET /api/products/:id
- Response: detailed product info with specifications, store prices, reviews

GET /api/products/:id/price-history
- Response: historical pricing data for charts

POST /api/products/compare
- Body: { productIds: [1, 2, 3] }
- Response: comparison data with specifications
```

### Categories API
```
GET /api/categories
- Response: all categories with subcategories

GET /api/categories/:slug/products
- Response: products in specific category with filters
```

### Daily Deals API
```
GET /api/daily-deals
- Response: current active deals with time remaining

POST /api/daily-deals/notify
- Body: { dealId, email }
- Response: price drop notification signup
```

### Stores API
```
GET /api/stores
- Response: all retail stores with ratings and delivery info

GET /api/stores/:id/products
- Response: products available from specific store
```

### Search API
```
GET /api/search
- Query params: q, category, price_range, sort
- Response: search results with filters and facets
```

### Price Alerts API
```
GET /api/price-alerts (authenticated)
- Response: user's active price alerts

POST /api/price-alerts
- Body: { productId, targetPrice, email }
- Response: create new price alert

DELETE /api/price-alerts/:id
- Response: remove price alert
```

## Database Schema

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  category: String,
  subcategory: String,
  description: String,
  image: String,
  specifications: Object,
  rating: Number,
  reviewCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Stores Collection
```javascript
{
  _id: ObjectId,
  name: String,
  logo: String,
  website: String,
  rating: Number,
  reviewCount: Number,
  deliveryOptions: [String],
  categories: [String],
  isActive: Boolean
}
```

### ProductPrices Collection
```javascript
{
  _id: ObjectId,
  productId: ObjectId,
  storeId: ObjectId,
  price: Number,
  currency: String,
  inStock: Boolean,
  lastUpdated: Date,
  deliveryCost: String,
  productUrl: String
}
```

### Categories Collection
```javascript
{
  _id: ObjectId,
  name: String,
  slug: String,
  description: String,
  icon: String,
  color: String,
  subcategories: [String],
  isActive: Boolean
}
```

### DailyDeals Collection
```javascript
{
  _id: ObjectId,
  productId: ObjectId,
  storeId: ObjectId,
  originalPrice: Number,
  salePrice: Number,
  discount: Number,
  startDate: Date,
  endDate: Date,
  isActive: Boolean
}
```

### PriceAlerts Collection
```javascript
{
  _id: ObjectId,
  productId: ObjectId,
  email: String,
  targetPrice: Number,
  isActive: Boolean,
  createdAt: Date,
  notifiedAt: Date
}
```

### PriceHistory Collection
```javascript
{
  _id: ObjectId,
  productId: ObjectId,
  storeId: ObjectId,
  price: Number,
  date: Date,
  recordedAt: Date
}
```

## Frontend Integration Plan

### 1. API Service Layer
Create `/src/services/api.js` with:
- Product fetching functions
- Category management
- Search functionality
- Price comparison logic
- Authentication handling

### 2. State Management
- Replace mock data imports with API calls
- Add loading states for all components
- Implement error handling for API failures
- Cache frequently accessed data

### 3. Component Updates Required

**TouchCarousel.jsx**
- Replace `products` prop with API call to `/api/products`
- Add loading skeleton while fetching
- Implement pagination for large product sets

**ProductComparison.jsx**
- Fetch comparison data from `/api/products/compare`
- Allow adding products via search API
- Real-time price updates

**DailyDeals.jsx**
- Connect to `/api/daily-deals`
- Implement real countdown timers
- Add email notification signup

**CategoryGrid.jsx**
- Fetch from `/api/categories`
- Dynamic subcategory loading
- Product count per category

**HamburgerMenu.jsx**
- Load categories from API
- Dynamic menu structure based on user preferences

### 4. New Features After Backend Integration

**User Authentication**
- Login/Register functionality
- Wishlist management
- Price alert dashboard

**Advanced Search**
- Autocomplete suggestions
- Filter combinations
- Search history

**Price Tracking**
- Email notifications for price drops
- Price trend analytics
- Best deal recommendations

**Store Integration**
- Direct store links
- Affiliate tracking
- Store availability status

## Mobile App Considerations

### Touch Interactions
- ✅ Swipe gestures for carousels (implemented)
- ✅ Touch-friendly navigation (implemented)
- ✅ Responsive hamburger menu (implemented)

### Performance Optimizations
- Lazy loading for product images
- Infinite scroll for product lists
- Offline capability for wishlists
- Push notifications for price alerts

## Testing Requirements

### Frontend Testing
- Touch carousel functionality on mobile devices
- Hamburger menu navigation
- Product comparison interface
- Search and filter functionality

### Backend Testing
- API endpoint performance
- Database query optimization
- Price update batch processing
- Email notification system

## Implementation Priority

**Phase 1 (Core Backend)**
1. Products API with store prices
2. Categories API
3. Basic search functionality
4. Price comparison API

**Phase 2 (Advanced Features)**
1. Daily deals system
2. Price alerts with email notifications
3. User authentication
4. Price history tracking

**Phase 3 (Enhancements)**
1. Advanced search with filters
2. Store management
3. Analytics and recommendations
4. Mobile app optimization

## Current Frontend Status
✅ Complete UI with 8+ pages
✅ Touch-enabled carousels
✅ Responsive design for all devices  
✅ Hamburger menu with subcategories
✅ Product comparison functionality
✅ Modern CSS with animations
✅ Mock data structure matches API design

Ready for backend development and API integration.