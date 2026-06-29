import json
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models import Provider, ProviderApplication
from app.schemas import ProviderOut, ProviderApplicationIn, ProviderApplicationOut

router = APIRouter(prefix="/api/providers", tags=["providers"])


@router.get("", response_model=list[ProviderOut])
def list_providers(
    category: Optional[str] = Query(None),
    min_rating: Optional[float] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Provider)
    if category:
        query = query.filter(Provider.category == category)
    if min_rating:
        query = query.filter(Provider.rating >= min_rating)
    providers = query.all()
    return [ProviderOut.from_orm_with_skills(p) for p in providers]


@router.get("/{slug}", response_model=ProviderOut)
def get_provider(slug: str, db: Session = Depends(get_db)):
    provider = db.query(Provider).filter(Provider.slug == slug).first()
    if provider:
        return ProviderOut.from_orm_with_skills(provider)
    return None


@router.post("/apply", response_model=ProviderApplicationOut)
def apply_as_provider(data: ProviderApplicationIn, db: Session = Depends(get_db)):
    creds_json = json.dumps([c.model_dump() for c in data.credentials])
    skills_json = json.dumps(data.skills)
    application = ProviderApplication(
        name=data.name,
        phone=data.phone,
        email=data.email,
        category=data.category,
        skills=skills_json,
        price_range=data.price_range,
        credentials=creds_json,
        experience=data.experience,
        status="pending",
    )
    db.add(application)
    db.commit()
    db.refresh(application)
    return ProviderApplicationOut.from_orm_with_json(application)
