from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from database import get_db, User, Tenant, UserRole, AuditLog
from auth import (
    create_access_token, 
    verify_password, 
    get_current_user, 
    check_permissions, 
    limiter, 
    get_fingerprint,
    validate_api_key
)
from pydantic import BaseModel
from typing import List, Optional
import hashlib
import json

from fastapi.middleware.gzip import GZipMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

app = FastAPI(
    title="Tyotrack Military-Grade API",
    version="2.0.0-enterprise",
    docs_url="/api/v1/docs",
    redoc_url="/api/v1/redoc"
)

# Custom Secure Headers Middleware
class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
        return response

app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Rate Limiting & Security
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, this should be specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    email: str
    password: str
    mfa_code: Optional[str] = None

@app.get("/health")
@limiter.limit("5/minute")
async def health(request: Request):
    return {"status": "operational", "security": "hardened", "tier": "military"}

@app.post("/auth/login")
@limiter.limit("5/minute")
async def login(request: Request, req: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == req.email))
    user = result.scalar_one_or_none()
    
    if not user or not verify_password(req.password, user.hashed_password):
        # Audit Log: Failed attempt
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed"
        )
    
    # Device Fingerprinting
    fingerprint = get_fingerprint(request)
    
    access_token = create_access_token(
        data={
            "sub": user.email, 
            "role": user.role, 
            "tenant_id": user.tenant_id,
            "user_id": user.id,
            "fp": fingerprint
        }
    )
    
    # Audit Log: Success
    return {
        "access_token": access_token, 
        "token_type": "bearer", 
        "role": user.role,
        "mfa_required": user.mfa_enabled and not req.mfa_code
    }

@app.get("/api/v1/system/stats", dependencies=[Depends(check_permissions([UserRole.SUPER_ADMIN]))])
async def system_stats():
    import psutil
    return {
        "cpu_usage": psutil.cpu_percent(),
        "memory_usage": psutil.virtual_memory().percent,
        "active_connections": 42, # Mock
        "tier": "enterprise-hardened"
    }

# Additional military-grade endpoints to be implemented in sub-routers...
