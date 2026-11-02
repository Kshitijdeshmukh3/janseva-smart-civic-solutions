from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, index=True, nullable=False) # SUPER_ADMIN, ORG_ADMIN, NAGAR_SEVAK, STAFF, CITIZEN
    description = Column(String(255), nullable=True)
    is_system_role = Column(Boolean, default=True)

    users = relationship("User", back_populates="role")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True, index=True)
    role_id = Column(Integer, ForeignKey("roles.id"), nullable=False, index=True)
    ward_id = Column(Integer, ForeignKey("wards.id"), nullable=True, index=True)
    
    full_name = Column(String(150), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    mobile = Column(String(20), unique=True, index=True, nullable=True)
    password_hash = Column(String(255), nullable=False)
    avatar_url = Column(String(500), nullable=True)
    
    reward_points = Column(Integer, default=50) # Initial welcome bonus
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    organization = relationship("Organization", back_populates="users")
    role = relationship("Role", back_populates="users")
    complaints = relationship("Complaint", back_populates="citizen")
    reward_transactions = relationship("RewardTransaction", back_populates="user")
    consent_records = relationship("ConsentRecord", back_populates="user")
