from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Float, Numeric
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Contractor(Base):
    __tablename__ = "contractors"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    company_name = Column(String(200), nullable=False)
    license_number = Column(String(100), unique=True, nullable=False)
    contact_person = Column(String(150), nullable=True)
    phone = Column(String(50), nullable=True)
    rating = Column(Float, default=4.5)
    is_blacklisted = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    projects = relationship("DevelopmentProject", back_populates="contractor")


class DevelopmentProject(Base):
    __tablename__ = "development_projects"

    id = Column(Integer, primary_key=True, index=True)
    project_code = Column(String(50), unique=True, index=True, nullable=False) # e.g. PMC-DEV-2026-08
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False, index=True)
    ward_id = Column(Integer, ForeignKey("wards.id"), nullable=False, index=True)
    contractor_id = Column(Integer, ForeignKey("contractors.id"), nullable=True)
    
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(100), default="Roads & Infrastructure")
    status = Column(String(50), default="IN_PROGRESS") # PROPOSED, APPROVED, PLANNED, IN_PROGRESS, DELAYED, COMPLETED, CANCELLED
    
    approved_budget = Column(Float, default=0.0)
    allocated_funds = Column(Float, default=0.0)
    recorded_expenditure = Column(Float, default=0.0)
    progress_percentage = Column(Integer, default=0)
    
    start_date = Column(DateTime, nullable=True)
    expected_completion_date = Column(DateTime, nullable=True)
    actual_completion_date = Column(DateTime, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    organization = relationship("Organization", back_populates="projects")
    contractor = relationship("Contractor", back_populates="projects")
    milestones = relationship("ProjectMilestone", back_populates="project", cascade="all, delete-orphan")


class ProjectMilestone(Base):
    __tablename__ = "project_milestones"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("development_projects.id"), nullable=False, index=True)
    title = Column(String(200), nullable=False)
    target_date = Column(DateTime, nullable=True)
    completion_date = Column(DateTime, nullable=True)
    status = Column(String(50), default="PENDING")
    weightage_percent = Column(Integer, default=25)

    project = relationship("DevelopmentProject", back_populates="milestones")


class InfrastructureAsset(Base):
    __tablename__ = "infrastructure_assets"

    id = Column(Integer, primary_key=True, index=True)
    asset_code = Column(String(50), unique=True, index=True, nullable=False) # QR Code Identifier
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False, index=True)
    ward_id = Column(Integer, ForeignKey("wards.id"), nullable=False, index=True)
    category = Column(String(100), nullable=False) # STREETLIGHT, WATER_VALVE, DRAIN_CHAMBER, TOILET
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    condition = Column(String(50), default="GOOD") # EXCELLENT, GOOD, DAMAGED, CRITICAL
    installation_date = Column(DateTime, nullable=True)
    qr_code_image_url = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
