from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.organization import Organization, Ward, Department

router = APIRouter(prefix="/organizations", tags=["Organizations & Wards"])

@router.get("/")
def list_organizations(db: Session = Depends(get_db)):
    orgs = db.query(Organization).filter(Organization.status == "ACTIVE").all()
    return [{"id": o.id, "name": o.name, "code": o.code, "type": o.org_type, "state": o.state} for o in orgs]

@router.get("/{id}/wards")
def list_wards(id: int, db: Session = Depends(get_db)):
    wards = db.query(Ward).filter(Ward.organization_id == id).all()
    return [{"id": w.id, "ward_number": w.ward_number, "ward_name": w.ward_name, "representative_name": w.representative_name} for w in wards]

@router.get("/{id}/departments")
def list_departments(id: int, db: Session = Depends(get_db)):
    depts = db.query(Department).filter(Department.organization_id == id, Department.is_active == True).all()
    return [{"id": d.id, "name": d.name, "code": d.code} for d in depts]
