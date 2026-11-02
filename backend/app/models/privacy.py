from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class ConsentType(Base):
    __tablename__ = "consent_types"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(50), unique=True, index=True, nullable=False) # ESSENTIAL_SERVICE, GEOLOCATION, MEDIA_PROCESSING, PUBLIC_DISPLAY, DEPARTMENT_SHARING, AI_PROCESSING, ANALYTICS
    name = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)
    is_mandatory = Column(Boolean, default=False)


class ConsentRecord(Base):
    __tablename__ = "consent_records"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    consent_type_id = Column(Integer, ForeignKey("consent_types.id"), nullable=False)
    is_granted = Column(Boolean, default=True)
    ip_address = Column(String(50), nullable=True)
    method = Column(String(50), default="WEB_INTERFACE")
    granted_at = Column(DateTime, default=datetime.utcnow)
    withdrawn_at = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="consent_records")


class PrivacyRequest(Base):
    __tablename__ = "privacy_requests"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    request_type = Column(String(50), nullable=False) # DATA_EXPORT, DATA_CORRECTION, CONSENT_WITHDRAWAL, ACCOUNT_DELETION, GRIEVANCE
    status = Column(String(50), default="SUBMITTED") # SUBMITTED, UNDER_REVIEW, APPROVED, REJECTED, PROCESSING, COMPLETED
    details = Column(Text, nullable=True)
    review_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
