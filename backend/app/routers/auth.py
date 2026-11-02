from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User, Role
from app.models.privacy import ConsentType, ConsentRecord
from app.schemas.auth import UserCreate, UserLogin, Token, UserResponse
from app.core.security import verify_password, get_password_hash, create_access_token
from app.core.dependencies import require_auth

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=Token)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    # Check existing
    existing = db.query(User).filter(User.email == user_in.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="A user with this email already exists")

    citizen_role = db.query(Role).filter(Role.name == "CITIZEN").first()
    if not citizen_role:
        citizen_role = Role(name="CITIZEN", description="Standard Citizen User")
        db.add(citizen_role)
        db.commit()
        db.refresh(citizen_role)

    new_user = User(
        organization_id=user_in.organization_id or 1,
        role_id=citizen_role.id,
        ward_id=user_in.ward_id or 1,
        full_name=user_in.full_name,
        email=user_in.email,
        mobile=user_in.mobile,
        password_hash=get_password_hash(user_in.password),
        reward_points=50, # 50 welcome points
        is_active=True
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Record DPDP explicit consent
    essential_type = db.query(ConsentType).filter(ConsentType.code == "ESSENTIAL_SERVICE").first()
    if essential_type:
        db.add(ConsentRecord(user_id=new_user.id, consent_type_id=essential_type.id, is_granted=True))
    db.commit()

    access_token = create_access_token(data={"sub": str(new_user.id), "role": "CITIZEN"})
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse(
            id=new_user.id,
            full_name=new_user.full_name,
            email=new_user.email,
            mobile=new_user.mobile,
            ward_id=new_user.ward_id,
            organization_id=new_user.organization_id,
            role="CITIZEN",
            reward_points=new_user.reward_points,
            is_active=new_user.is_active,
            created_at=new_user.created_at
        )
    )

@router.post("/login", response_model=Token)
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    role_name = user.role.name if user.role else "CITIZEN"
    access_token = create_access_token(data={"sub": str(user.id), "role": role_name})

    return Token(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse(
            id=user.id,
            full_name=user.full_name,
            email=user.email,
            mobile=user.mobile,
            ward_id=user.ward_id,
            organization_id=user.organization_id,
            role=role_name,
            reward_points=user.reward_points,
            is_active=user.is_active,
            created_at=user.created_at
        )
    )

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(require_auth)):
    return UserResponse(
        id=current_user.id,
        full_name=current_user.full_name,
        email=current_user.email,
        mobile=current_user.mobile,
        ward_id=current_user.ward_id,
        organization_id=current_user.organization_id,
        role=current_user.role.name if current_user.role else "CITIZEN",
        reward_points=current_user.reward_points,
        is_active=current_user.is_active,
        created_at=current_user.created_at
    )
