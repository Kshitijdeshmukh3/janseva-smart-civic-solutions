from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class RewardRule(Base):
    __tablename__ = "reward_rules"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)
    activity_code = Column(String(100), unique=True, nullable=False) # COMPLAINT_VERIFIED, PHOTO_ATTACHED, ACCURATE_GEO, FEEDBACK_SUBMITTED
    points_awarded = Column(Integer, default=20)
    daily_max_limit = Column(Integer, default=100)
    is_active = Column(Boolean, default=True)


class RewardTransaction(Base):
    __tablename__ = "reward_transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    points = Column(Integer, nullable=False)
    transaction_type = Column(String(50), default="CREDIT") # CREDIT, DEBIT_REDEMPTION, ADMIN_CORRECTION
    reference_entity_type = Column(String(50), nullable=True) # COMPLAINT, SURVEY, VOLUNTEER
    reference_entity_id = Column(String(50), nullable=True)
    remarks = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="reward_transactions")


class RewardCatalogue(Base):
    __tablename__ = "reward_catalogue"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    reward_type = Column(String(50), default="DIGITAL_CERTIFICATE") # DIGITAL_CERTIFICATE, PARTNER_DISCOUNT, CIVIC_PERK
    points_required = Column(Integer, default=100)
    stock_quantity = Column(Integer, default=1000)
    is_active = Column(Boolean, default=True)
