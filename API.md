# Tyotrack API Specification (v1)

## Base URL

`http://api.tyotrack.enterprise/api/v1`

## Authentication

Bearer token (JWT) required for all non-login endpoints.

## Endpoints

### 🔐 Authentication

- `POST /auth/login` - Login and get JWT.
- `POST /auth/mfa/verify` - Verify TOTP code.
- `POST /auth/logout` - Invalidate session.

### 💼 Tenant Management (Super Admin)

- `GET /tenants` - List all tenants.
- `POST /tenants` - Create new tenant.

### ⏱️ Time Tracking

- `GET /time-entries` - List entries (Employee/Manager).
- `POST /time-entries` - Submit new time entry.
- `PATCH /time-entries/{id}/approve` - Approve entry (Manager).

### 📊 Reports

- `GET /reports/attendance` - Export attendance report.
- `GET /reports/usage` - Export project usage report.

## Rate Limiting

All endpoints limited to 100 req/min for standard users.
