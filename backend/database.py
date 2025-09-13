from motor.motor_asyncio import AsyncIOMotorClient
import os
from typing import List
from models import *
import asyncio
from datetime import datetime

class Database:
    client: AsyncIOMotorClient = None
    database = None

db = Database()

async def get_database():
    return db.database

async def connect_to_mongo():
    """Create database connection"""
    db.client = AsyncIOMotorClient(os.environ["MONGO_URL"])
    db.database = db.client[os.environ["DB_NAME"]]
    print("Connected to MongoDB")

async def close_mongo_connection():
    """Close database connection"""
    db.client.close()
    print("Disconnected from MongoDB")

# Database operations for Products
async def create_product(product: ProductCreate) -> Product:
    product_dict = product.dict()
    product_dict["created_at"] = datetime.utcnow()
    product_dict["updated_at"] = datetime.utcnow()
    
    result = await db.database.products.insert_one(product_dict)
    product_dict["_id"] = result.inserted_id
    return Product(**product_dict)

async def get_products(skip: int = 0, limit: int = 20, category: str = None, search: str = None) -> List[Product]:
    query = {}
    if category:
        query["category"] = category
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"category": {"$regex": search, "$options": "i"}}
        ]
    
    cursor = db.database.products.find(query).skip(skip).limit(limit)
    products = await cursor.to_list(length=limit)
    return [Product(**product) for product in products]

async def get_product(product_id: str) -> Product:
    product = await db.database.products.find_one({"_id": ObjectId(product_id)})
    if product:
        return Product(**product)
    return None

# Database operations for Categories
async def create_category(category: CategoryCreate) -> Category:
    category_dict = category.dict()
    category_dict["slug"] = category.name.lower().replace(" ", "-").replace("&", "and")
    
    result = await db.database.categories.insert_one(category_dict)
    category_dict["_id"] = result.inserted_id
    return Category(**category_dict)

async def get_categories() -> List[Category]:
    cursor = db.database.categories.find({"is_active": True})
    categories = await cursor.to_list(length=100)
    return [Category(**category) for category in categories]

# Database operations for Daily Deals
async def create_daily_deal(deal: DailyDealCreate) -> DailyDeal:
    deal_dict = deal.dict()
    deal_dict["discount"] = int(((deal.original_price - deal.sale_price) / deal.original_price) * 100)
    deal_dict["created_at"] = datetime.utcnow()
    
    result = await db.database.daily_deals.insert_one(deal_dict)
    deal_dict["_id"] = result.inserted_id
    return DailyDeal(**deal_dict)

async def get_daily_deals(limit: int = 10) -> List[DailyDeal]:
    cursor = db.database.daily_deals.find({"is_active": True}).limit(limit)
    deals = await cursor.to_list(length=limit)
    return [DailyDeal(**deal) for deal in deals]

# Database operations for Stores
async def create_store(store: StoreCreate) -> StoreModel:
    store_dict = store.dict()
    result = await db.database.stores.insert_one(store_dict)
    store_dict["_id"] = result.inserted_id
    return StoreModel(**store_dict)

async def get_stores(limit: int = 50) -> List[StoreModel]:
    cursor = db.database.stores.find({"is_active": True}).limit(limit)
    stores = await cursor.to_list(length=limit)
    return [StoreModel(**store) for store in stores]

# Database operations for Price Alerts
async def create_price_alert(alert: PriceAlertCreate) -> PriceAlert:
    alert_dict = alert.dict()
    alert_dict["created_at"] = datetime.utcnow()
    alert_dict["current_price"] = 0  # This would be fetched from product data
    
    result = await db.database.price_alerts.insert_one(alert_dict)
    alert_dict["_id"] = result.inserted_id
    return PriceAlert(**alert_dict)

async def get_price_alerts(email: str = None) -> List[PriceAlert]:
    query = {"is_active": True}
    if email:
        query["email"] = email
    
    cursor = db.database.price_alerts.find(query)
    alerts = await cursor.to_list(length=100)
    return [PriceAlert(**alert) for alert in alerts]

# Database operations for Reviews
async def create_review(review: ReviewCreate) -> Review:
    review_dict = review.dict()
    review_dict["date"] = datetime.utcnow().strftime("%Y-%m-%d")
    review_dict["product_image"] = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop"
    review_dict["reviewer_avatar"] = "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop"
    review_dict["verified"] = True
    review_dict["total_reviews"] = 1
    review_dict["helpful_count"] = 0
    
    result = await db.database.reviews.insert_one(review_dict)
    review_dict["_id"] = result.inserted_id
    return Review(**review_dict)

async def get_reviews(limit: int = 20) -> List[Review]:
    cursor = db.database.reviews.find({}).limit(limit).sort("date", -1)
    reviews = await cursor.to_list(length=limit)
    return [Review(**review) for review in reviews]

# Database operations for Advertisements
async def get_advertisements() -> List[Advertisement]:
    cursor = db.database.advertisements.find({"is_active": True})
    ads = await cursor.to_list(length=10)
    return [Advertisement(**ad) for ad in ads]

# Initialize database with mock data
async def init_mock_data():
    """Initialize database with mock data if empty"""
    
    # Check if data already exists
    product_count = await db.database.products.count_documents({})
    if product_count > 0:
        return
    
    print("Initializing database with mock data...")
    
    # Categories
    categories_data = [
        {"name": "Daily Deals", "description": "Best deals updated daily", "icon": "percent", "color": "#e53e3e", "subcategories": ["Electronics Deals", "Fashion Deals", "Home Deals", "Sports Deals"]},
        {"name": "Used Cars", "description": "Compare car prices", "icon": "car", "color": "#38a169", "subcategories": ["Sedans", "SUVs", "Hatchbacks", "Utes", "Motorbikes"]},
        {"name": "Computers & Accessories", "description": "Tech gadgets & accessories", "icon": "laptop", "color": "#3182ce", "subcategories": ["Laptops", "Desktops", "Monitors", "Keyboards & Mice", "Storage", "Graphics Cards"]},
        {"name": "Home & Garden", "description": "Everything for your home", "icon": "home", "color": "#805ad5", "subcategories": ["Furniture", "Kitchen Appliances", "Garden Tools", "Home Decor", "Cleaning"]},
        {"name": "Electronics", "description": "Latest electronics", "icon": "smartphone", "color": "#d69e2e", "subcategories": ["Smartphones", "Tablets", "TVs", "Audio", "Cameras", "Gaming"]},
        {"name": "Fashion", "description": "Clothing & accessories", "icon": "shirt", "color": "#e53e3e", "subcategories": ["Men's Clothing", "Women's Clothing", "Shoes", "Accessories", "Watches"]},
        {"name": "Sports & Fitness", "description": "Sports & fitness gear", "icon": "dumbbell", "color": "#38a169", "subcategories": ["Fitness Equipment", "Sportswear", "Outdoor Gear", "Team Sports"]},
        {"name": "Beauty & Health", "description": "Health & beauty products", "icon": "heart", "color": "#e91e63", "subcategories": ["Skincare", "Makeup", "Health Supplements", "Personal Care"]}
    ]
    
    for cat_data in categories_data:
        await create_category(CategoryCreate(**cat_data))
    
    # Products
    products_data = [
        {
            "name": "iPhone 15 Pro 128GB",
            "category": "Electronics",
            "image": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
            "description": "Latest iPhone with A17 Pro chip",
            "min_price": 1599,
            "max_price": 1799,
            "rating": 4.7,
            "reviews": 2341,
            "specifications": {"Display": "6.1-inch Super Retina XDR", "Processor": "A17 Pro chip", "Storage": "128GB", "Camera": "48MP Main camera", "Battery": "Up to 23 hours video"}
        },
        {
            "name": "Samsung 65\" QLED 4K TV",
            "category": "Electronics",
            "image": "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=300&h=300&fit=crop",
            "description": "Premium QLED TV with smart features",
            "min_price": 2199,
            "max_price": 2599,
            "rating": 4.6,
            "reviews": 1876,
            "specifications": {"Screen Size": "65 inches", "Resolution": "4K QLED", "Smart TV": "Tizen OS", "HDR": "HDR10+", "Connectivity": "4x HDMI, 2x USB"}
        },
        {
            "name": "MacBook Air M3 13\"",
            "category": "Computers & Accessories",
            "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop",
            "description": "Ultra-portable laptop with M3 chip",
            "min_price": 1999,
            "max_price": 2299,
            "rating": 4.8,
            "reviews": 3421,
            "specifications": {"Processor": "Apple M3 chip", "Memory": "8GB unified memory", "Storage": "256GB SSD", "Display": "13.6-inch Liquid Retina", "Battery": "Up to 18 hours"}
        },
        {
            "name": "Sony WH-1000XM5 Headphones",
            "category": "Electronics",
            "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
            "description": "Industry-leading noise canceling headphones",
            "min_price": 399,
            "max_price": 499,
            "rating": 4.8,
            "reviews": 2156,
            "specifications": {"Type": "Over-ear wireless", "Noise Cancelling": "Industry-leading ANC", "Battery": "30 hours with ANC", "Connectivity": "Bluetooth 5.2", "Features": "Touch controls, speak-to-chat"}
        }
    ]
    
    for prod_data in products_data:
        await create_product(ProductCreate(**prod_data))
    
    # Daily Deals
    deals_data = [
        {"name": "AirPods Pro 2nd Gen", "original_price": 399, "sale_price": 329, "image": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300&h=300&fit=crop", "store": "JB Hi-Fi", "time_left": "2 days", "rating": 4.8},
        {"name": "Sony PlayStation 5", "original_price": 899, "sale_price": 799, "image": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=300&fit=crop", "store": "EB Games", "time_left": "1 day", "rating": 4.9}
    ]
    
    for deal_data in deals_data:
        await create_daily_deal(DailyDealCreate(**deal_data))
    
    # Stores
    stores_data = [
        {"name": "JB Hi-Fi", "logo": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop", "rating": 4.5, "reviews": 12890, "description": "Leading electronics and entertainment retailer", "delivery_options": ["Free shipping over $75", "Click & Collect", "Express delivery"], "categories": ["Electronics", "Computers", "Gaming", "Music", "Movies"], "location": "Nationwide - 200+ stores", "website": "jbhifi.co.nz", "established": 1974, "phone_number": "0800 JB HIFI", "features": ["Price match guarantee", "Extended warranties", "Trade-in program"]},
        {"name": "Harvey Norman", "logo": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop", "rating": 4.3, "reviews": 8976, "description": "Furniture, electrical and computer superstore", "delivery_options": ["Home delivery", "In-store pickup", "Installation service"], "categories": ["Electronics", "Home & Garden", "Furniture", "Computers", "Appliances"], "location": "North Island - 50+ stores", "website": "harveynorman.co.nz", "established": 1982, "phone_number": "0800 HARVEY", "features": ["Interest-free terms", "Professional installation", "Extended warranties"]}
    ]
    
    for store_data in stores_data:
        await create_store(StoreCreate(**store_data))
    
    print("Mock data initialization complete!")