from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import Base, engine
import app.models # register all models with Base

# Auto create database schema tables
Base.metadata.create_all(bind=engine)

# Routers
from app.routers import auth, complaints, organizations, projects, rewards, privacy, health, ai_assistant, schemes

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Enterprise Smart Municipal Governance, Citizen Engagement & Area Development Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routers
app.include_router(health.router, prefix=settings.API_V1_STR)
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(complaints.router, prefix=settings.API_V1_STR)
app.include_router(organizations.router, prefix=settings.API_V1_STR)
app.include_router(projects.router, prefix=settings.API_V1_STR)
app.include_router(schemes.router, prefix=settings.API_V1_STR)
app.include_router(rewards.router, prefix=settings.API_V1_STR)
app.include_router(privacy.router, prefix=settings.API_V1_STR)
app.include_router(ai_assistant.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "title": "JANSEVA – SMART CIVIC SOLUTIONS",
        "tagline": "Your Area. Your Voice. Our Responsibility.",
        "documentation": "/docs",
        "health": f"{settings.API_V1_STR}/health"
    }
