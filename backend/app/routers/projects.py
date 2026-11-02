from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models.project import DevelopmentProject, Contractor, ProjectMilestone

router = APIRouter(prefix="/projects", tags=["Development Projects"])

@router.get("/")
def list_projects(
    organization_id: int = 1,
    ward_id: Optional[int] = None,
    category: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(DevelopmentProject).filter(DevelopmentProject.organization_id == organization_id)
    if ward_id:
        query = query.filter(DevelopmentProject.ward_id == ward_id)
    if category and category != "All":
        query = query.filter(DevelopmentProject.category == category)
    if status and status != "All":
        query = query.filter(DevelopmentProject.status == status)
    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            (DevelopmentProject.title.ilike(search_pattern)) |
            (DevelopmentProject.description.ilike(search_pattern)) |
            (DevelopmentProject.project_code.ilike(search_pattern))
        )
    
    projects = query.order_by(DevelopmentProject.id.desc()).all()
    return [
        {
            "id": p.id,
            "project_code": p.project_code,
            "title": p.title,
            "description": p.description,
            "category": p.category,
            "status": p.status,
            "approved_budget": p.approved_budget,
            "allocated_funds": p.allocated_funds,
            "recorded_expenditure": p.recorded_expenditure,
            "progress_percentage": p.progress_percentage,
            "start_date": p.start_date.strftime("%Y-%m-%d") if p.start_date else None,
            "expected_completion_date": p.expected_completion_date.strftime("%Y-%m-%d") if p.expected_completion_date else None,
            "contractor_name": p.contractor.company_name if p.contractor else "Direct Municipal Works",
            "contractor_rating": p.contractor.rating if p.contractor else 5.0,
            "contractor_license": p.contractor.license_number if p.contractor else "N/A",
            "milestones_count": len(p.milestones),
            "milestones": [
                {
                    "id": m.id,
                    "title": m.title,
                    "weightage_percent": m.weightage_percent,
                    "status": m.status
                }
                for m in p.milestones
            ],
            "before_image_url": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80",
            "after_image_url": "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?w=600&auto=format&fit=crop&q=80"
        }
        for p in projects
    ]

@router.get("/stats")
def project_stats(organization_id: int = 1, db: Session = Depends(get_db)):
    projects = db.query(DevelopmentProject).filter(DevelopmentProject.organization_id == organization_id).all()
    total = len(projects)
    completed = len([p for p in projects if p.status == "COMPLETED"])
    in_progress = len([p for p in projects if p.status == "IN_PROGRESS"])
    total_budget = sum([p.approved_budget for p in projects])
    total_spent = sum([p.recorded_expenditure for p in projects])
    avg_progress = round(sum([p.progress_percentage for p in projects]) / max(total, 1), 1)

    return {
        "total_projects": total,
        "completed": completed,
        "in_progress": in_progress,
        "total_budget": total_budget,
        "total_spent": total_spent,
        "average_progress": avg_progress
    }

@router.get("/{project_id}")
def get_project(project_id: int, db: Session = Depends(get_db)):
    p = db.query(DevelopmentProject).filter(DevelopmentProject.id == project_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Development project not found")
    return {
        "id": p.id,
        "project_code": p.project_code,
        "title": p.title,
        "description": p.description,
        "category": p.category,
        "status": p.status,
        "approved_budget": p.approved_budget,
        "allocated_funds": p.allocated_funds,
        "recorded_expenditure": p.recorded_expenditure,
        "progress_percentage": p.progress_percentage,
        "start_date": p.start_date.strftime("%Y-%m-%d") if p.start_date else None,
        "expected_completion_date": p.expected_completion_date.strftime("%Y-%m-%d") if p.expected_completion_date else None,
        "contractor_name": p.contractor.company_name if p.contractor else "Direct Municipal Works",
        "contractor_rating": p.contractor.rating if p.contractor else 5.0,
        "contractor_license": p.contractor.license_number if p.contractor else "N/A",
        "milestones": [
            {
                "id": m.id,
                "title": m.title,
                "weightage_percent": m.weightage_percent,
                "status": m.status
            }
            for m in p.milestones
        ],
        "before_image_url": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80",
        "after_image_url": "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?w=600&auto=format&fit=crop&q=80"
    }
