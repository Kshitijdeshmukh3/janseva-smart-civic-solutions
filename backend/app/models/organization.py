from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    code = Column(String(50), unique=True, index=True, nullable=False)
    org_type = Column(String(50), default="MUNICIPAL_CORP") # MUNICIPAL_CORP, MUNICIPAL_COUNCIL, NAGAR_SEVAK_OFFICE, HOUSING_SOCIETY
    state = Column(String(100), default="Maharashtra")
    district = Column(String(100), default="Pune")
    logo_url = Column(String(500), nullable=True)
    status = Column(String(50), default="ACTIVE")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    wards = relationship("Ward", back_populates="organization")
    departments = relationship("Department", back_populates="organization")
    users = relationship("User", back_populates="organization")
    complaints = relationship("Complaint", back_populates="organization")
    projects = relationship("DevelopmentProject", back_populates="organization")


class Ward(Base):
    __tablename__ = "wards"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False, index=True)
    ward_number = Column(Integer, nullable=False)
    ward_name = Column(String(150), nullable=False)
    representative_name = Column(String(150), nullable=True)
    population = Column(Integer, default=50000)
    created_at = Column(DateTime, default=datetime.utcnow)

    organization = relationship("Organization", back_populates="wards")
    areas = relationship("Area", back_populates="ward")
    complaints = relationship("Complaint", back_populates="ward")


class Area(Base):
    __tablename__ = "areas"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    ward_id = Column(Integer, ForeignKey("wards.id"), nullable=False, index=True)
    locality_name = Column(String(150), nullable=False)
    pincode = Column(String(10), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    ward = relationship("Ward", back_populates="areas")


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False, index=True)
    name = Column(String(150), nullable=False)
    code = Column(String(50), nullable=False)
    contact_email = Column(String(150), nullable=True)
    contact_phone = Column(String(50), nullable=True)
    is_active = Column(Boolean, default=True)

    organization = relationship("Organization", back_populates="departments")
    categories = relationship("ComplaintCategory", back_populates="department")
