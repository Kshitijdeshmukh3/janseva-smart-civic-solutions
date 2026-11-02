from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ComplaintCreate(BaseModel):
    title: str
    description: str
    category_id: int
    ward_id: int
    locality: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    visibility: str = "PUBLIC_ANONYMOUS" # PRIVATE, PUBLIC_APPROVED, PUBLIC_ANONYMOUS
    affected_count_estimate: str = "10-50"
    organization_id: int = 1

class ComplaintStatusUpdate(BaseModel):
    status: str
    comments: Optional[str] = None
    evidence_url: Optional[str] = None

class ComplaintAssignmentCreate(BaseModel):
    assigned_staff_id: int
    instructions: Optional[str] = None

class ComplaintResponse(BaseModel):
    id: int
    complaint_number: str
    organization_id: int
    citizen_id: int
    category_id: int
    ward_id: int
    title: str
    description: str
    location_address: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    priority: str
    status: str
    visibility: str
    sla_deadline_at: Optional[datetime] = None
    is_overdue: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
