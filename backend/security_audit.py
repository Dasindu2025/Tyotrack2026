import asyncio
import hashlib
import json
from sqlalchemy import select
from database import AsyncSessionLocal, AuditLog

async def verify_ledger():
    print("🛡️ Initializing Cryptographic Ledger Verification...")
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(AuditLog).order_by(AuditLog.timestamp))
        logs = result.scalars().all()
        
        tampered_count = 0
        for log in logs:
            if not log.checksum:
                print(f"⚠️ Warning: Log {log.id} missing checksum.")
                continue
                
            # Recalculate hash
            payload = {
                "user_id": log.user_id,
                "action": log.action,
                "resource": log.resource_type,
                "timestamp": log.timestamp.isoformat() if log.timestamp else None,
                "tenant_id": log.tenant_id
            }
            payload_str = json.dumps(payload, sort_keys=True)
            calculated_hash = hashlib.sha256(payload_str.encode()).hexdigest()
            
            if calculated_hash != log.checksum:
                print(f"🚨 CRITICAL: Log {log.id} TAMPERED DETECTED!")
                print(f"   Stored: {log.checksum}")
                print(f"   Actual: {calculated_hash}")
                tampered_count += 1
        
        if tampered_count == 0:
            print(f"✅ Ledger Integrity Verified. {len(logs)} entries validated.")
        else:
            print(f"❌ Verification Failed. {tampered_count} violations detected.")

if __name__ == "__main__":
    asyncio.run(verify_ledger())
