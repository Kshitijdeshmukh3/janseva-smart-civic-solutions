from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.privacy import ConsentType, ConsentRecord, PrivacyRequest
from app.models.user import User
from app.core.dependencies import require_auth
from pydantic import BaseModel

class PrivacyRequestCreate(BaseModel):
    request_type: str # DATA_EXPORT, DATA_CORRECTION, CONSENT_WITHDRAWAL, ACCOUNT_DELETION, GRIEVANCE
    details: str

router = APIRouter(prefix="/privacy", tags=["DPDPA 2023 Compliance & Consent"])

@router.get("/consents")
def get_user_consents(current_user: User = Depends(require_auth), db: Session = Depends(get_db)):
    types = db.query(ConsentType).all()
    records = {r.consent_type_id: r.is_granted for r in current_user.consent_records}
    return [
        {
            "id": t.id,
            "code": t.code,
            "name": t.name,
            "description": t.description,
            "is_mandatory": t.is_mandatory,
            "is_granted": records.get(t.id, t.is_mandatory)
        }
        for t in types
    ]

@router.post("/requests")
def submit_privacy_request(
    payload: PrivacyRequestCreate,
    current_user: User = Depends(require_auth),
    db: Session = Depends(get_db)
):
    req = PrivacyRequest(
        user_id=current_user.id,
        organization_id=current_user.organization_id or 1,
        request_type=payload.request_type,
        details=payload.details,
        status="SUBMITTED"
    )
    db.add(req)
    db.commit()
    db.refresh(req)
    return {
        "message": "Privacy request logged in compliance with Indian DPDP Act 2023.",
        "request_id": req.id,
        "status": req.status
    }
