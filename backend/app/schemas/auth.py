from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    full_name: str
    email: str
    mobile: Optional[str] = None
    ward_id: Optional[int] = None
    organization_id: Optional[int] = 1

class UserCreate(UserBase):
    password: str
    consent_essential: bool = True
    consent_geo: bool = True
    consent_notifications: bool = True

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(UserBase):
    id: int
    role: str
    reward_points: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
