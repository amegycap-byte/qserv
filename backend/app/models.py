import json
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Float, DateTime
from app.database import Base


class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(String, nullable=True)
    icon = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    slug = Column(String, unique=True, nullable=False)


class Provider(Base):
    __tablename__ = "providers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    category = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    rating = Column(Float, default=4.5)
    reviews_count = Column(Integer, default=0)
    price_range = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    skills = Column(Text, nullable=True)

    def get_skills(self):
        if self.skills:
            return json.loads(self.skills)
        return []

    def set_skills(self, skills_list):
        self.skills = json.dumps(skills_list)


class ProviderApplication(Base):
    __tablename__ = "provider_applications"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    category = Column(String, nullable=False)
    skills = Column(Text, nullable=True)
    price_range = Column(String, nullable=True)
    credentials = Column(Text, nullable=True)
    experience = Column(Text, nullable=True)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
