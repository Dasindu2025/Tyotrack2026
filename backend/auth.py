from datetime import datetime, timedelta
from typing import Optional, List
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from slowapi import Limiter
from slowapi.util import get_remote_address
import os
import hashlib

# High-Performance Rate Limiter
limiter = Limiter(key_func=get_remote_address)

SECRET_KEY = os.getenv("JWT_SECRET", "super_secret_enterprise_2026")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_fingerprint(request: Request):
    """
    Generate a device fingerprint from request headers.
    """
    user_agent = request.headers.get("user-agent", "")
    accept_language = request.headers.get("accept-language", "")
    ip = get_remote_address(request)
    
    raw = f"{user_agent}|{accept_language}|{ip}"
    return hashlib.sha256(raw.encode()).hexdigest()

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Session invalid or expired",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        return {
            "email": email, 
            "role": payload.get("role"), 
            "tenant_id": payload.get("tenant_id"), 
            "user_id": payload.get("user_id"),
            "fingerprint": payload.get("fp")
        }
    except JWTError:
        raise credentials_exception

from database import APIKey
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

async def validate_api_key(request: Request, db: AsyncSession = Depends(get_db)):
    api_key = request.headers.get("X-API-Key")
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="API Key missing"
        )
    
    key_hash = hashlib.sha256(api_key.encode()).hexdigest()
    result = await db.execute(select(APIKey).where(APIKey.key_hash == key_hash, APIKey.is_active == True))
    key_record = result.scalar_one_or_none()
    
    if not key_record:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API Key"
        )
    
    if key_record.expires_at and key_record.expires_at < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="API Key expired"
        )
        
    return key_record

def check_permissions(allowed_roles: List[str]):
    async def permission_checker(current_user: dict = Depends(get_current_user)):
        if current_user["role"] not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied: Military-grade protocol violation"
            )
        return current_user
    return permission_checker
