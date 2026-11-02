from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db

router = APIRouter(tags=["System Health & Metrics"])

@router.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        db_status = "HEALTHY"
    except Exception as e:
        db_status = f"UNHEALTHY: {str(e)}"

    return {
        "status": "ONLINE",
        "service": "JANSEVA Smart Civic Solutions API",
        "version": "1.0.0",
        "database": db_status,
        "security": "DPDP Act 2023 Compliant"
    }
