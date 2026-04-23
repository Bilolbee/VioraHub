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

## Default Admin Users (change immediately)

- `admin@viorahub.com` / `ChangeMe123!`
- `editor@viorahub.com` / `ChangeMe123!`
- `reviewer@viorahub.com` / `ChangeMe123!`

## Roles

- `editor`: update staging content
- `reviewer`: approve and publish staging
- `admin`: full access

## Workflow

1. Editor logs in and edits staging JSON in admin panel.
2. Reviewer/Admin checks and clicks publish.
3. Production content is replaced and version increased.
4. Audit log keeps actions for traceability.

## Notes

- Contact form submissions are stored in DB (`Lead` table).
- This baseline is production-leaning, but for real enterprise rollout you should add:
  - managed Postgres
  - automated backup/restore policy
  - centralized logging and alerting
  - secret management and rotation
