from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import Optional, List
from app.database import get_db
from app.models.scheme import Scheme

router = APIRouter(prefix="/schemes", tags=["Government & Welfare Schemes"])

@router.get("/")
def list_schemes(
    category: Optional[str] = None,
    level: Optional[str] = None,
    search: Optional[str] = None,
    is_featured: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Scheme).filter(Scheme.is_active == True)
    
    if category and category != "All":
        query = query.filter(Scheme.category.ilike(f"%{category}%"))
    if level and level != "All":
        query = query.filter(Scheme.level == level.upper())
    if is_featured is not None:
        query = query.filter(Scheme.is_featured == is_featured)
    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            (Scheme.title.ilike(search_pattern)) |
            (Scheme.description.ilike(search_pattern)) |
            (Scheme.scheme_code.ilike(search_pattern)) |
            (Scheme.department.ilike(search_pattern))
        )
    
    schemes = query.order_by(Scheme.is_featured.desc(), Scheme.id.asc()).all()
    
    return [
        {
            "id": s.id,
            "scheme_code": s.scheme_code,
            "title": s.title,
            "category": s.category,
            "level": s.level,
            "department": s.department,
            "description": s.description,
            "eligibility_criteria": s.eligibility_criteria,
            "benefits": s.benefits,
            "financial_assistance": s.financial_assistance,
            "required_documents": s.required_documents.split("\n") if s.required_documents else [],
            "application_process": s.application_process,
            "official_portal_url": s.official_portal_url,
            "helpline_number": s.helpline_number,
            "deadline": s.deadline,
            "is_featured": s.is_featured
        }
        for s in schemes
    ]

@router.get("/{scheme_id}")
def get_scheme(scheme_id: int, db: Session = Depends(get_db)):
    scheme = db.query(Scheme).filter(Scheme.id == scheme_id).first()
    if not scheme:
        raise HTTPException(status_code=404, detail="Government scheme not found")
    return {
        "id": scheme.id,
        "scheme_code": scheme.scheme_code,
        "title": scheme.title,
        "category": scheme.category,
        "level": scheme.level,
        "department": scheme.department,
        "description": scheme.description,
        "eligibility_criteria": scheme.eligibility_criteria,
        "benefits": scheme.benefits,
        "financial_assistance": scheme.financial_assistance,
        "required_documents": scheme.required_documents.split("\n") if scheme.required_documents else [],
        "application_process": scheme.application_process,
        "official_portal_url": scheme.official_portal_url,
        "helpline_number": scheme.helpline_number,
        "deadline": scheme.deadline,
        "is_featured": scheme.is_featured
    }
