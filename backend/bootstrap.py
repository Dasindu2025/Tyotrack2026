import asyncio
import os
from database import engine, Base, User, UserRole, AsyncSessionLocal
from auth import get_password_hash

async def bootstrap():
    print("🚀 Initializing Tyotrack Secure Enclave Infrastructure...")
    
    async with engine.begin() as conn:
        # Check if RLS extension is needed (Postgres specific)
        # await conn.execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")
        await conn.run_sync(Base.metadata.create_all)
    
    async with AsyncSessionLocal() as session:
        # Create Super Admin if not exists
        email = os.getenv("SUPER_ADMIN_EMAIL", "commander@tyotrack.enterprise")
        password = os.getenv("SUPER_ADMIN_PASSWORD", "secure_pass_2026")
        
        from sqlalchemy import select
        result = await session.execute(select(User).where(User.email == email))
        if not result.scalar_one_or_none():
            admin = User(
                email=email,
                hashed_password=get_password_hash(password),
                full_name="High Commander",
                role=UserRole.SUPER_ADMIN,
                is_active=True
            )
            session.add(admin)
            await session.commit()
            print(f"✅ Secure Access Initialized: {email}")
        else:
            print("ℹ️ Secure Enclave already initialized.")

if __name__ == "__main__":
    asyncio.run(bootstrap())
