# Buyoo Marketplace

## Setup

1. Copy `.env.example` to `.env.local` and configure your Postgres connection.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate Prisma client and run migrations:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run seed
   ```

## Environment variables

```env
DATABASE_URL=postgresql://user:password@host:5432/db
JWT_SECRET=change-me
```

## API Notes

- Auth routes: `/api/auth/signup`, `/api/auth/login`, `/api/auth/logout`
- Protected routes are enforced via middleware for `/dashboard/customer` and `/messaging`
- The seed script populates starter users, vendor profiles, products, categories, markets, riders, and errand pros
