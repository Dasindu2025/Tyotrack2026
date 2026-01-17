import asyncio
import os
from database import engine, Base, User, UserRole
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

async def bootstrap():
    print("🚀 Starting Tyotrack Bootstrap Process...")
    
    async with engine.begin() as conn:
        print("📁 Creating database tables...")
        await conn.run_sync(Base.metadata.create_all)
    
    async with AsyncSession(engine) as session:
        # Check if Super Admin exists
        email = os.getenv("SUPER_ADMIN_EMAIL", "admin@tyotrack.enterprise")
        password = os.getenv("SUPER_ADMIN_PASSWORD", "tyo_admin_pass")
        
        result = await session.execute(select(User).where(User.email == email))
        admin = result.scalar_one_or_none()
        
        if not admin:
            print(f"👤 Creating Super Admin: {email}")
            admin = User(
                email=email,
                hashed_password=get_password_hash(password),
                full_name="Platform Super Admin",
                role=UserRole.SUPER_ADMIN,
                is_active=True
            )
            session.add(admin)
            await session.commit()
            print("✅ Super Admin created successfully.")
        else:
            print("ℹ️ Super Admin already exists.")

    print("🎉 Bootstrap complete.")

if __name__ == "__main__":
    asyncio.run(bootstrap())
