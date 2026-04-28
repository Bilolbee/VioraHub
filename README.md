# Viora Hub - Enterprise CMS Baseline

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Prepare database:
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

4. Run project:
```bash
npm run dev
```

Open:
- Website: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`

## Admin Credentials (seed orqali)

Seed script `.env` dagi qiymatlardan foydalanadi:
- `ADMIN_EMAIL`, `ADMIN_LOGIN`, `ADMIN_PASSWORD`
- `EDITOR_EMAIL`, `EDITOR_PASSWORD`
- `REVIEWER_EMAIL`, `REVIEWER_PASSWORD`

Default fallbacklar bor, lekin productionda kuchli parollarni majburiy o'rnating.

## Roles

- `editor`: update staging content
- `reviewer`: approve and publish staging
- `admin`: full access

## Workflow

1. Editor/Admin staging kontentni dashboard orqali tahrirlaydi.
2. Staging saqlanadi va auditga yoziladi.
3. Reviewer/Admin productionga chiqaradi.
4. Version oshadi, audit log saqlanadi.

## Security Notes

- Login urinishlari 15 daqiqalik oynada rate-limited.
- Session cookie `httpOnly` va `sameSite=lax`.
- Seed productionda zaif admin parolni bloklaydi.
- Contact form `zod` validation bilan DB ga yoziladi.

## Notes

- Contact form submissions are stored in DB (`Lead` table).
- This baseline is production-leaning, but for real enterprise rollout you should add:
  - managed Postgres
  - automated backup/restore policy
  - centralized logging and alerting
  - secret management and rotation
