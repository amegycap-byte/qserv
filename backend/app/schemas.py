from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class CategoryOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    icon: Optional[str] = None
    image_url: Optional[str] = None
    slug: str

    model_config = {"from_attributes": True}


class ProviderOut(BaseModel):
    id: int
    name: str
    slug: str
    category: str
    description: Optional[str] = None
    rating: float = 4.5
    reviews_count: int = 0
    price_range: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    image_url: Optional[str] = None
    skills: List[str] = []

    model_config = {"from_attributes": True}

    @classmethod
    def from_orm_with_skills(cls, provider):
        data = {
            "id": provider.id,
            "name": provider.name,
            "slug": provider.slug,
            "category": provider.category,
            "description": provider.description,
            "rating": provider.rating,
            "reviews_count": provider.reviews_count,
            "price_range": provider.price_range,
            "phone": provider.phone,
            "email": provider.email,
            "image_url": provider.image_url,
            "skills": provider.get_skills(),
        }
        return cls.model_construct(**data)


class Credential(BaseModel):
    title: str
    issuer: str
    year: int


class ProviderApplicationIn(BaseModel):
    name: str
    phone: str
    email: str
    category: str
    skills: List[str] = []
    price_range: Optional[str] = None
    credentials: List[Credential] = []
    experience: Optional[str] = None


class ProviderApplicationOut(BaseModel):
    id: int
    name: str
    phone: str
    email: str
    category: str
    skills: List[str] = []
    price_range: Optional[str] = None
    credentials: List[Credential] = []
    experience: Optional[str] = None
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}

    @classmethod
    def from_orm_with_json(cls, app):
        import json
        creds_raw = app.credentials or "[]"
        skills_raw = app.skills or "[]"
        try:
            creds_list = json.loads(creds_raw)
        except (json.JSONDecodeError, TypeError):
            creds_list = []
        try:
            skills_list = json.loads(skills_raw)
        except (json.JSONDecodeError, TypeError):
            skills_list = []
        data = {
            "id": app.id,
            "name": app.name,
            "phone": app.phone,
            "email": app.email,
            "category": app.category,
            "skills": skills_list,
            "price_range": app.price_range,
            "credentials": [Credential(**c) for c in creds_list],
            "experience": app.experience,
            "status": app.status,
            "created_at": app.created_at,
        }
        return cls.model_construct(**data)
