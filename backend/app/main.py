import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import categories, providers, chat
from app.seed import seed_data

origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app = FastAPI(title="QServ API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    seed_data()


app.include_router(categories.router)
app.include_router(providers.router)
app.include_router(chat.router)


@app.get("/api/health")
def health():
    return {"status": "ok"}
