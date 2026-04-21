# Wholesale B2B Starter

Simple Next.js wholesale website with:
- static looking homepage
- multiple product cart
- checkout form
- admin orders page
- file-based order storage in `data/orders.json`

## Run

```bash
npm install
npm run dev
```

Open:
- Home: http://localhost:3000/
- Admin: http://localhost:3000/admin

## Important

This starter saves orders to a local JSON file.
- Good for local testing or basic Node hosting
- Not recommended for Vercel production because file writes are not persistent

For production, replace the JSON store with a real database.


## Admin Login

Admin orders page is protected.

- Login page: `/admin/login`
- Admin page: `/admin`
- Hardcoded email: `admin@example.com`
- Hardcoded password: `Admin@12345`

Change credentials in `lib/admin-auth.ts`.
