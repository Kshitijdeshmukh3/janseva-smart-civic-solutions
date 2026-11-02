from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from datetime import datetime
from app.database import Base

class Scheme(Base):
    __tablename__ = "schemes"

    id = Column(Integer, primary_key=True, index=True)
    scheme_code = Column(String(50), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False, index=True) # Housing, Healthcare, Women Empowerment, Students, Farmers, Senior Citizens, Employment
    level = Column(String(50), default="CENTRAL", index=True) # CENTRAL, STATE, MUNICIPAL
    department = Column(String(150), nullable=True)
    description = Column(Text, nullable=False)
    eligibility_criteria = Column(Text, nullable=False)
    benefits = Column(Text, nullable=False)
    financial_assistance = Column(String(150), nullable=True) # e.g. "₹2.5 Lakh Subsidy", "₹5,00,000 Free Health Cover"
    required_documents = Column(Text, nullable=True) # JSON or newline separated
    application_process = Column(Text, nullable=True)
    official_portal_url = Column(String(500), nullable=True)
    helpline_number = Column(String(100), nullable=True)
    deadline = Column(String(100), nullable=True) # e.g. "Ongoing" or "31 Dec 2026"
    is_featured = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
