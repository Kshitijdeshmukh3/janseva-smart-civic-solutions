import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "JANSEVA – SMART CIVIC SOLUTIONS"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "janseva_super_secret_enterprise_jwt_key_2026_dev_prod")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 # 24 hours
    
    # Database Configuration: Managed MySQL with SQLite fallback for offline execution
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite:///./janseva_dev.db" # Cloud MySQL: mysql+pymysql://user:pass@host:3306/janseva_db
    )
    
    # CORS
    BACKEND_CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "https://janseva.in",
        "https://api.janseva.in",
    ]

    class Config:
        case_sensitive = True

settings = Settings()
