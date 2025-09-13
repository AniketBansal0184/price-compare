from pydantic import BaseModel, Field, GetCoreSchemaHandler
from pydantic_core import core_schema
from typing import List, Optional, Dict, Any
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(cls, source_type: Any, handler: GetCoreSchemaHandler) -> core_schema.CoreSchema:
        return core_schema.no_info_plain_validator_function(cls._validate)

    @classmethod
    def _validate(cls, v):
        if isinstance(v, ObjectId):
            return v
        if isinstance(v, str) and ObjectId.is_valid(v):
            return ObjectId(v)
        raise ValueError("Invalid ObjectId")

    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema, handler):
        json_schema = handler(core_schema)
        json_schema.update(type="string")
        return json_schema

# Product Models
class ProductSpec(BaseModel):
    display: Optional[str] = None
    processor: Optional[str] = None
    storage: Optional[str] = None
    camera: Optional[str] = None
    battery: Optional[str] = None

class Store(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    name: str
    price: float
    rating: float
    delivery: str
    stock: str = "In Stock"

    class Config:
        validate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class Product(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    name: str
    category: str
    subcategory: Optional[str] = None
    image: str
    description: Optional[str] = None
    min_price: float
    max_price: float
    stores: List[Store] = []
    rating: float
    reviews: int
    specifications: Optional[Dict[str, str]] = {}
    price_history: List[Dict[str, Any]] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        validate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class ProductCreate(BaseModel):
    name: str
    category: str
    subcategory: Optional[str] = None
    image: str
    description: Optional[str] = None
    min_price: float
    max_price: float
    rating: float = 4.5
    reviews: int = 0
    specifications: Optional[Dict[str, str]] = {}

# Category Models
class Category(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    name: str
    slug: str
    description: str
    icon: str
    color: str
    subcategories: List[str] = []
    is_active: bool = True

    class Config:
        validate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class CategoryCreate(BaseModel):
    name: str
    description: str
    icon: str
    color: str
    subcategories: List[str] = []

# Daily Deals Models
class DailyDeal(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    name: str
    original_price: float
    sale_price: float
    discount: int
    image: str
    store: str
    time_left: str
    rating: float
    category: Optional[str] = "Electronics"
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        validate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class DailyDealCreate(BaseModel):
    name: str
    original_price: float
    sale_price: float
    image: str
    store: str
    time_left: str
    rating: float = 4.5

# Store Models
class StoreModel(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    name: str
    logo: str
    rating: float
    reviews: int
    description: str
    delivery_options: List[str] = []
    categories: List[str] = []
    location: str
    website: str
    established: int
    phone_number: str
    features: List[str] = []
    is_active: bool = True

    class Config:
        validate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class StoreCreate(BaseModel):
    name: str
    logo: str
    rating: float
    reviews: int
    description: str
    delivery_options: List[str] = []
    categories: List[str] = []
    location: str
    website: str
    established: int
    phone_number: str
    features: List[str] = []

# Price Alert Models
class PriceAlert(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    product_name: str
    current_price: float
    target_price: float
    email: str
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        validate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class PriceAlertCreate(BaseModel):
    product_name: str
    target_price: float
    email: str

# Review Models
class Review(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    product_name: str
    product_image: str
    reviewer_name: str
    reviewer_avatar: str
    verified: bool = False
    total_reviews: int = 0
    rating: int
    title: str
    content: str
    date: str
    helpful_count: int = 0
    category: str
    purchase_store: str
    pros: List[str] = []
    cons: List[str] = []
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class ReviewCreate(BaseModel):
    product_name: str
    reviewer_name: str
    rating: int
    title: str
    content: str
    category: str
    purchase_store: str
    pros: List[str] = []
    cons: List[str] = []

# Advertisement Models
class Advertisement(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    title: str
    subtitle: str
    image: str
    cta: str
    link: str
    is_active: bool = True
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class AdvertisementCreate(BaseModel):
    title: str
    subtitle: str
    image: str
    cta: str
    link: str