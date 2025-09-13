from fastapi import FastAPI, APIRouter, HTTPException, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pathlib import Path
import os
import logging
from typing import List, Optional
from models import *
from database import *

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI(title="PriceSpy API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup and shutdown events
@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()
    await init_mock_data()

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()

# Health check
@api_router.get("/")
async def root():
    return {"message": "PriceSpy API is running!"}

# Product endpoints
@api_router.get("/products", response_model=List[Product])
async def get_products_endpoint(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    """Get products with optional filtering"""
    try:
        products = await get_products(skip=skip, limit=limit, category=category, search=search)
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product_endpoint(product_id: str):
    """Get a specific product by ID"""
    try:
        product = await get_product(product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return product
    except Exception as e:
        if "not found" in str(e).lower():
            raise HTTPException(status_code=404, detail="Product not found")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/products", response_model=Product)
async def create_product_endpoint(product: ProductCreate):
    """Create a new product"""
    try:
        return await create_product(product)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/products/compare")
async def compare_products_endpoint(product_ids: List[str]):
    """Compare multiple products"""
    try:
        products = []
        for product_id in product_ids:
            product = await get_product(product_id)
            if product:
                products.append(product)
        
        if len(products) < 2:
            raise HTTPException(status_code=400, detail="At least 2 products required for comparison")
        
        return {"products": products, "comparison_count": len(products)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Category endpoints
@api_router.get("/categories", response_model=List[Category])
async def get_categories_endpoint():
    """Get all categories"""
    try:
        return await get_categories()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/categories", response_model=Category)
async def create_category_endpoint(category: CategoryCreate):
    """Create a new category"""
    try:
        return await create_category(category)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/categories/{category_slug}/products", response_model=List[Product])
async def get_category_products_endpoint(
    category_slug: str,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100)
):
    """Get products by category slug"""
    try:
        # Convert slug back to category name
        category_name = category_slug.replace("-", " ").replace("and", "&").title()
        products = await get_products(skip=skip, limit=limit, category=category_name)
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Daily Deals endpoints
@api_router.get("/daily-deals", response_model=List[DailyDeal])
async def get_daily_deals_endpoint(limit: int = Query(10, ge=1, le=50)):
    """Get daily deals"""
    try:
        return await get_daily_deals(limit=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/daily-deals", response_model=DailyDeal)
async def create_daily_deal_endpoint(deal: DailyDealCreate):
    """Create a new daily deal"""
    try:
        return await create_daily_deal(deal)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Store endpoints
@api_router.get("/stores", response_model=List[StoreModel])
async def get_stores_endpoint(limit: int = Query(50, ge=1, le=100)):
    """Get all stores"""
    try:
        return await get_stores(limit=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/stores", response_model=StoreModel)
async def create_store_endpoint(store: StoreCreate):
    """Create a new store"""
    try:
        return await create_store(store)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Price Alert endpoints
@api_router.get("/price-alerts", response_model=List[PriceAlert])
async def get_price_alerts_endpoint(email: Optional[str] = Query(None)):
    """Get price alerts, optionally filtered by email"""
    try:
        return await get_price_alerts(email=email)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/price-alerts", response_model=PriceAlert)
async def create_price_alert_endpoint(alert: PriceAlertCreate):
    """Create a new price alert"""
    try:
        return await create_price_alert(alert)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Review endpoints
@api_router.get("/reviews", response_model=List[Review])
async def get_reviews_endpoint(limit: int = Query(20, ge=1, le=100)):
    """Get product reviews"""
    try:
        return await get_reviews(limit=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/reviews", response_model=Review)
async def create_review_endpoint(review: ReviewCreate):
    """Create a new review"""
    try:
        return await create_review(review)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Advertisement endpoints
@api_router.get("/advertisements", response_model=List[Advertisement])
async def get_advertisements_endpoint():
    """Get advertisements"""
    try:
        return await get_advertisements()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Search endpoint
@api_router.get("/search", response_model=List[Product])
async def search_products_endpoint(
    q: str = Query(..., min_length=1),
    category: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None, ge=0),
    max_price: Optional[float] = Query(None, ge=0),
    min_rating: Optional[float] = Query(None, ge=0, le=5),
    sort_by: Optional[str] = Query("relevance", regex="^(relevance|price-low|price-high|rating|popularity)$"),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100)
):
    """Search products with advanced filters"""
    try:
        products = await get_products(skip=skip, limit=limit, category=category, search=q)
        
        # Apply additional filters
        if min_price is not None:
            products = [p for p in products if p.min_price >= min_price]
        if max_price is not None:
            products = [p for p in products if p.max_price <= max_price]
        if min_rating is not None:
            products = [p for p in products if p.rating >= min_rating]
        
        # Apply sorting
        if sort_by == "price-low":
            products.sort(key=lambda x: x.min_price)
        elif sort_by == "price-high":
            products.sort(key=lambda x: x.min_price, reverse=True)
        elif sort_by == "rating":
            products.sort(key=lambda x: x.rating, reverse=True)
        elif sort_by == "popularity":
            products.sort(key=lambda x: x.reviews, reverse=True)
        
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)