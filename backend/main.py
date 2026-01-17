from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database import get_db, User, Tenant, UserRole
from auth import create_access_token, verify_password, get_current_user, check_permissions
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Tyotrack Enterprise API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    email: str
    password: str

@app.get("/")
async def root():
    return {"status": "online", "version": "1.0.0-enterprise"}

@app.post("/auth/login")
async def login(req: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == req.email))
    user = result.scalar_one_or_none()
    
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(
        data={
            "sub": user.email, 
            "role": user.role, 
            "tenant_id": user.tenant_id,
            "user_id": user.id
        }
    )
    return {"access_token": access_token, "token_type": "bearer", "role": user.role}

@app.get("/system/health", dependencies=[Depends(check_permissions([UserRole.SUPER_ADMIN]))])
async def system_health():
    return {
        "database": "connected",
        "redis": "connected",
        "status": "operational"
    }

@app.get("/tenants", dependencies=[Depends(check_permissions([UserRole.SUPER_ADMIN]))])
async def list_tenants(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Tenant))
    return result.scalars().all()

# More endpoints to follow...
