from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.reward import RewardTransaction, RewardCatalogue
from app.models.user import User
from app.core.dependencies import require_auth

router = APIRouter(prefix="/rewards", tags=["Civic Rewards"])

@router.get("/balance")
def get_balance(current_user: User = Depends(require_auth), db: Session = Depends(get_db)):
    txns = db.query(RewardTransaction).filter(RewardTransaction.user_id == current_user.id).order_by(RewardTransaction.created_at.desc()).limit(20).all()
    return {
        "reward_points": current_user.reward_points,
        "history": [
            {
                "id": t.id,
                "points": t.points,
                "type": t.transaction_type,
                "remarks": t.remarks,
                "date": t.created_at
            }
            for t in txns
        ]
    }

@router.get("/catalogue")
def get_catalogue(db: Session = Depends(get_db)):
    items = db.query(RewardCatalogue).filter(RewardCatalogue.is_active == True).all()
    return [
        {
            "id": i.id,
            "title": i.title,
            "description": i.description,
            "reward_type": i.reward_type,
            "points_required": i.points_required
        }
        for i in items
    ]
