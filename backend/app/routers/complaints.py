from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Optional, List
import random
from app.database import get_db
from app.models.complaint import Complaint, ComplaintCategory, ComplaintUpdate, ComplaintMedia, ComplaintVote
from app.models.reward import RewardTransaction
from app.models.user import User
from app.schemas.complaint import ComplaintCreate, ComplaintResponse, ComplaintStatusUpdate
from app.core.dependencies import get_current_user, require_auth

router = APIRouter(prefix="/complaints", tags=["Complaints"])

def calculate_priority_and_sla(category: ComplaintCategory, title: str, description: str):
    """
    Priority Engine (P0 to P4) based on hazard risk:
    P0_CRITICAL: Live wires, hazardous electrical, structural collapse (SLA: 2h)
    P1_HIGHEST: Major watermain burst, deep arterial road pothole (SLA: 6h)
    P2_HIGH: Streetlights, standard potholes, drainage leaks (SLA: 24-48h)
    P3_MEDIUM: Garbage accumulation, public sanitation (SLA: 24h)
    P4_LOW: Non-urgent park beautification (SLA: 72h)
    """
    text = f"{title} {description}".lower()
    if any(k in text for k in ["live wire", "wire sparking", "electric shock", "danger to life", "collapse"]):
        return "P0_CRITICAL", 2
    elif any(k in text for k in ["burst", "major waterlogging", "flood", "arterial"]):
        return "P1_HIGHEST", 6
    
    # Category fallback
    priority = category.default_priority if category else "P2_HIGH"
    sla = category.sla_hours if category else 24
    return priority, sla

@router.get("/", response_model=List[ComplaintResponse])
def list_complaints(
    ward_id: Optional[int] = None,
    category_id: Optional[int] = None,
    priority: Optional[str] = None,
    status: Optional[str] = None,
    organization_id: int = 1,
    db: Session = Depends(get_db)
):
    query = db.query(Complaint).filter(Complaint.organization_id == organization_id)
    if ward_id:
        query = query.filter(Complaint.ward_id == ward_id)
    if category_id:
        query = query.filter(Complaint.category_id == category_id)
    if priority:
        query = query.filter(Complaint.priority == priority)
    if status:
        query = query.filter(Complaint.status == status)
    
    return query.order_by(Complaint.created_at.desc()).limit(100).all()

@router.post("/", response_model=ComplaintResponse)
def create_complaint(
    payload: ComplaintCreate,
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    citizen_id = current_user.id if current_user else 1 # Fallback to default citizen
    
    category = db.query(ComplaintCategory).filter(ComplaintCategory.id == payload.category_id).first()
    priority, sla_hours = calculate_priority_and_sla(category, payload.title, payload.description)

    complaint_num = f"JS-2026-{random.randint(10000, 99999)}"
    sla_deadline = datetime.utcnow() + timedelta(hours=sla_hours)

    new_complaint = Complaint(
        complaint_number=complaint_num,
        organization_id=payload.organization_id,
        citizen_id=citizen_id,
        category_id=payload.category_id,
        ward_id=payload.ward_id,
        title=payload.title,
        description=payload.description,
        location_address=payload.locality,
        latitude=payload.latitude,
        longitude=payload.longitude,
        priority=priority,
        status="SUBMITTED",
        visibility=payload.visibility,
        affected_count_estimate=payload.affected_count_estimate,
        sla_deadline_at=sla_deadline,
        is_overdue=False
    )

    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)

    # Initial history update
    db.add(ComplaintUpdate(
        complaint_id=new_complaint.id,
        previous_status=None,
        new_status="SUBMITTED",
        updated_by_user_id=citizen_id,
        comments="Complaint registered on JANSEVA portal."
    ))
    db.commit()

    return new_complaint

@router.get("/{identifier}", response_model=ComplaintResponse)
def get_complaint(identifier: str, db: Session = Depends(get_db)):
    if identifier.isdigit():
        complaint = db.query(Complaint).filter(Complaint.id == int(identifier)).first()
    else:
        complaint = db.query(Complaint).filter(Complaint.complaint_number == identifier).first()
    
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return complaint

@router.patch("/{id}/status")
def update_complaint_status(
    id: int,
    payload: ComplaintStatusUpdate,
    current_user: User = Depends(require_auth),
    db: Session = Depends(get_db)
):
    # Strict Nagar Sevak READ-ONLY check
    if current_user.role and current_user.role.name == "NAGAR_SEVAK":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Nagar Sevak role is strictly READ-ONLY. Cannot modify complaint status."
        )

    complaint = db.query(Complaint).filter(Complaint.id == id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    old_status = complaint.status
    complaint.status = payload.status
    if payload.status == "RESOLVED":
        complaint.resolved_at = datetime.utcnow()

    db.add(ComplaintUpdate(
        complaint_id=complaint.id,
        previous_status=old_status,
        new_status=payload.status,
        updated_by_user_id=current_user.id,
        comments=payload.comments
    ))
    db.commit()
    return {"message": "Status updated successfully", "complaint_id": complaint.id, "new_status": payload.status}

@router.post("/{id}/verify-completion")
def verify_completion(
    id: int,
    is_confirmed: bool = Query(True),
    current_user: User = Depends(require_auth),
    db: Session = Depends(get_db)
):
    complaint = db.query(Complaint).filter(Complaint.id == id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    if is_confirmed:
        complaint.status = "RESOLVED"
        complaint.resolved_at = datetime.utcnow()
        # Award +20 Civic Reward Points
        current_user.reward_points += 20
        db.add(RewardTransaction(
            user_id=current_user.id,
            organization_id=complaint.organization_id,
            points=20,
            transaction_type="CREDIT",
            reference_entity_type="COMPLAINT",
            reference_entity_id=complaint.complaint_number,
            remarks="Verified work completion on-site"
        ))
        db.add(ComplaintUpdate(
            complaint_id=complaint.id,
            previous_status="WORK_COMPLETED_AWAITING_VERIFICATION",
            new_status="RESOLVED",
            updated_by_user_id=current_user.id,
            comments="Citizen confirmed work completion. +20 Points Awarded."
        ))
    else:
        complaint.status = "REOPENED"
        db.add(ComplaintUpdate(
            complaint_id=complaint.id,
            previous_status="WORK_COMPLETED_AWAITING_VERIFICATION",
            new_status="REOPENED",
            updated_by_user_id=current_user.id,
            comments="Citizen disputed resolution quality. Reopened for inspection."
        ))

    db.commit()
    return {"status": complaint.status, "points": current_user.reward_points}
