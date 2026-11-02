from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Float, Numeric, UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class ComplaintCategory(Base):
    __tablename__ = "complaint_categories"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True, index=True)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=True)
    name = Column(String(150), nullable=False)
    name_mr = Column(String(150), nullable=True)
    name_hi = Column(String(150), nullable=True)
    default_priority = Column(String(50), default="P2_HIGH") # P0_CRITICAL, P1_HIGHEST, P2_HIGH, P3_MEDIUM, P4_LOW
    sla_hours = Column(Integer, default=24)
    icon_name = Column(String(50), default="AlertCircle")
    is_active = Column(Boolean, default=True)

    department = relationship("Department", back_populates="categories")
    complaints = relationship("Complaint", back_populates="category")


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    complaint_number = Column(String(50), unique=True, index=True, nullable=False) # e.g. JS-2026-00001
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False, index=True)
    citizen_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    category_id = Column(Integer, ForeignKey("complaint_categories.id"), nullable=False, index=True)
    ward_id = Column(Integer, ForeignKey("wards.id"), nullable=False, index=True)
    
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    location_address = Column(String(500), nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    priority = Column(String(50), default="P2_HIGH", index=True) # P0_CRITICAL, P1_HIGHEST, P2_HIGH, P3_MEDIUM, P4_LOW
    status = Column(String(50), default="SUBMITTED", index=True) # SUBMITTED, UNDER_REVIEW, VERIFIED, ASSIGNED, WORK_IN_PROGRESS, WORK_COMPLETED_AWAITING_VERIFICATION, RESOLVED, REOPENED, REJECTED
    visibility = Column(String(50), default="PUBLIC_ANONYMOUS") # PRIVATE, PUBLIC_APPROVED, PUBLIC_ANONYMOUS
    
    affected_count_estimate = Column(String(50), default="10-50")
    sla_deadline_at = Column(DateTime, nullable=True)
    is_overdue = Column(Boolean, default=False)
    resolved_at = Column(DateTime, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    organization = relationship("Organization", back_populates="complaints")
    citizen = relationship("User", back_populates="complaints")
    category = relationship("ComplaintCategory", back_populates="complaints")
    ward = relationship("Ward", back_populates="complaints")
    media = relationship("ComplaintMedia", back_populates="complaint", cascade="all, delete-orphan")
    updates = relationship("ComplaintUpdate", back_populates="complaint", cascade="all, delete-orphan")
    assignments = relationship("ComplaintAssignment", back_populates="complaint", cascade="all, delete-orphan")
    votes = relationship("ComplaintVote", back_populates="complaint", cascade="all, delete-orphan")


class ComplaintMedia(Base):
    __tablename__ = "complaint_media"

    id = Column(Integer, primary_key=True, index=True)
    complaint_id = Column(Integer, ForeignKey("complaints.id"), nullable=False, index=True)
    media_type = Column(String(50), default="IMAGE") # IMAGE, VIDEO, AUDIO
    file_url = Column(String(500), nullable=False)
    stage = Column(String(50), default="CITIZEN_SUBMISSION") # CITIZEN_SUBMISSION, STAFF_BEFORE, STAFF_AFTER_COMPLETION
    uploaded_by = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    complaint = relationship("Complaint", back_populates="media")


class ComplaintUpdate(Base):
    __tablename__ = "complaint_updates"

    id = Column(Integer, primary_key=True, index=True)
    complaint_id = Column(Integer, ForeignKey("complaints.id"), nullable=False, index=True)
    previous_status = Column(String(50), nullable=True)
    new_status = Column(String(50), nullable=False)
    updated_by_user_id = Column(Integer, nullable=True)
    comments = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    complaint = relationship("Complaint", back_populates="updates")


class ComplaintAssignment(Base):
    __tablename__ = "complaint_assignments"

    id = Column(Integer, primary_key=True, index=True)
    complaint_id = Column(Integer, ForeignKey("complaints.id"), nullable=False, index=True)
    assigned_staff_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    assigned_by_user_id = Column(Integer, nullable=True)
    instructions = Column(Text, nullable=True)
    deadline_at = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    complaint = relationship("Complaint", back_populates="assignments")


class ComplaintVote(Base):
    __tablename__ = "complaint_votes"

    id = Column(Integer, primary_key=True, index=True)
    complaint_id = Column(Integer, ForeignKey("complaints.id"), nullable=False, index=True)
    citizen_user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    __table_args__ = (UniqueConstraint("complaint_id", "citizen_user_id", name="uq_complaint_user_vote"),)
    complaint = relationship("Complaint", back_populates="votes")


class AIVerificationLog(Base):
    __tablename__ = "ai_verification_logs"

    id = Column(Integer, primary_key=True, index=True)
    complaint_id = Column(Integer, ForeignKey("complaints.id"), nullable=True, index=True)
    image_hash = Column(String(100), nullable=True, index=True)
    image_quality = Column(String(50), default="GOOD")
    problem_detected = Column(String(50), default="YES")
    detected_category = Column(String(100), nullable=True)
    severity = Column(String(50), default="MEDIUM")
    confidence_score = Column(Float, default=85.0)
    duplicate_probability = Column(Float, default=0.0)
    location_verification_status = Column(String(50), default="VERIFIED")
    ai_description = Column(Text, nullable=True)
    recommendation = Column(String(50), default="AI_VERIFIED")
    extracted_ocr_text = Column(String(255), nullable=True)
    human_reviewer_id = Column(Integer, nullable=True)
    human_decision = Column(String(50), nullable=True) # APPROVED, OVERRIDDEN, REJECTED
    created_at = Column(DateTime, default=datetime.utcnow)
