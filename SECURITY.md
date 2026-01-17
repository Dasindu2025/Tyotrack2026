# Tyotrack Security Protocols

## Overview

Tyotrack is built on a "Zero Trust" architecture within the application layer.

## Security Controls

### 1. Identity & Access

- **MFA Default**: Support for TOTP authenticators.
- **Session Fingerprinting**: Sessions are bound to the User-Agent and IP subnet.
- **Password Policies**: Enforced complexity (12+ chars, mixed case, symbols).

### 2. Data Protection

- **Tenant Isolation**: Row-Level Security (RLS) ensures one tenant's queries can never touch another's data.
- **Audit Logging**: Immutable, SHA-256 hashed audit trails.
- **Encryption**: JWT secrets generated via OpenSSL with high entropy.

### 3. API Hardening

- **Rate Limiting**: 100 requests/minute per IP (tunable per route).
- **CORS Policy**: Strict allowlist for frontend origins.
- **CSP Headers**: Prevents XSS and clickjacking.

## Compliance

Ready for SOC 2 Type II and GDPR data controller roles.
