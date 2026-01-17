from sqlalchemy.ext.asyncio import AsyncSession
from database import Base, Column, Integer, String, DateTime, JSON, ForeignKey
from datetime import datetime
import json

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(Integer, primary_key=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    action = Column(String, nullable=False) # e.g., "TIME_ENTRY_CREATED"
    resource_type = Column(String, nullable=False) # e.g., "TimeEntry"
    resource_id = Column(Integer)
    old_value = Column(JSON)
    new_value = Column(JSON)
    ip_address = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)

async def log_action(
    db: AsyncSession,
    user_id: int,
    tenant_id: int,
    action: str,
    resource_type: str,
    resource_id: int = None,
    old_value: dict = None,
    new_value: dict = None
):
    log = AuditLog(
        user_id=user_id,
        tenant_id=tenant_id,
        action=action,
        resource_type=resource_type,
        resource_id=resource_id,
        old_value=old_value,
        new_value=new_value
    )
    db.add(log)
    await db.commit()
