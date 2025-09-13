import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// Product API functions
export const productAPI = {
  // Get all products with optional filters
  getProducts: async (params = {}) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product by ID
  getProduct: async (productId) => {
    try {
      const response = await api.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Create new product
  createProduct: async (productData) => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Compare multiple products
  compareProducts: async (productIds) => {
    try {
      const response = await api.post('/products/compare', productIds);
      return response.data;
    } catch (error) {
      console.error('Error comparing products:', error);
      throw error;
    }
  }
};

// Category API functions
export const categoryAPI = {
  // Get all categories
  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get products by category
  getCategoryProducts: async (categorySlug, params = {}) => {
    try {
      const response = await api.get(`/categories/${categorySlug}/products`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching category products:', error);
      throw error;
    }
  },

  // Create new category
  createCategory: async (categoryData) => {
    try {
      const response = await api.post('/categories', categoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }
};

// Daily Deals API functions
export const dailyDealsAPI = {
  // Get daily deals
  getDailyDeals: async (limit = 10) => {
    try {
      const response = await api.get('/daily-deals', { params: { limit } });
      return response.data;
    } catch (error) {
      console.error('Error fetching daily deals:', error);
      throw error;
    }
  },

  // Create new daily deal
  createDailyDeal: async (dealData) => {
    try {
      const response = await api.post('/daily-deals', dealData);
      return response.data;
    } catch (error) {
      console.error('Error creating daily deal:', error);
      throw error;
    }
  }
};

// Store API functions
export const storeAPI = {
  // Get all stores
  getStores: async (limit = 50) => {
    try {
      const response = await api.get('/stores', { params: { limit } });
      return response.data;
    } catch (error) {
      console.error('Error fetching stores:', error);
      throw error;
    }
  },

  // Create new store
  createStore: async (storeData) => {
    try {
      const response = await api.post('/stores', storeData);
      return response.data;
    } catch (error) {
      console.error('Error creating store:', error);
      throw error;
    }
  }
};

// Price Alert API functions
export const priceAlertAPI = {
  // Get price alerts
  getPriceAlerts: async (email = null) => {
    try {
      const params = email ? { email } : {};
      const response = await api.get('/price-alerts', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching price alerts:', error);
      throw error;
    }
  },

  // Create new price alert
  createPriceAlert: async (alertData) => {
    try {
      const response = await api.post('/price-alerts', alertData);
      return response.data;
    } catch (error) {
      console.error('Error creating price alert:', error);
      throw error;
    }
  }
};

// Review API functions
export const reviewAPI = {
  // Get reviews
  getReviews: async (limit = 20) => {
    try {
      const response = await api.get('/reviews', { params: { limit } });
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  // Create new review
  createReview: async (reviewData) => {
    try {
      const response = await api.post('/reviews', reviewData);
      return response.data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  }
};

// Advertisement API functions
export const advertisementAPI = {
  // Get advertisements
  getAdvertisements: async () => {
    try {
      const response = await api.get('/advertisements');
      return response.data;
    } catch (error) {
      console.error('Error fetching advertisements:', error);
      throw error;
    }
  }
};

// Search API functions
export const searchAPI = {
  // Search products
  searchProducts: async (params) => {
    try {
      const response = await api.get('/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
};

// Generic API utility functions
export const apiUtils = {
  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },

  // Handle API errors
  handleError: (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      return {
        message: data.detail || data.message || 'Server error occurred',
        status,
        type: 'server_error'
      };
    } else if (error.request) {
      // Network error
      return {
        message: 'Network error - please check your connection',
        type: 'network_error'
      };
    } else {
      // Other error
      return {
        message: error.message || 'An unexpected error occurred',
        type: 'unknown_error'
      };
    }
  }
};

export default api;