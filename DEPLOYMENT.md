# Deployment Guide

This project is easiest to deploy as:

- `client/` on Vercel
- `server/` on Railway
- MySQL on Railway

## 1. Deploy the database on Railway

1. Create a new Railway project.
2. Add a MySQL database service.
3. Open the database service and note the connection values.
4. Run [server/schema.sql](C:\Users\princ\OneDrive\Desktop\Assignment_By_Scalar\Calendly_clone\server\schema.sql) against the Railway MySQL database.

## 2. Deploy the backend on Railway

1. Create a new Railway service from this repo.
2. Set the service root directory to `server`.
3. Add these environment variables:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `JWT_SECRET`
   - `CLIENT_URL`
4. Deploy the service.
5. Open `https://<your-backend-domain>/health` and confirm it returns `{"ok":true}`.

## 3. Deploy the frontend on Vercel

1. Import this repo into Vercel.
2. Set the root directory to `client`.
3. Use these build settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist-build`
4. Add this environment variable:
   - `VITE_API_URL=https://<your-backend-domain>`
5. Deploy the project.

The file [client/vercel.json](C:\Users\princ\OneDrive\Desktop\Assignment_By_Scalar\Calendly_clone\client\vercel.json) is included so React Router routes continue to work on refresh.

## 4. Update backend CORS after frontend deploy

After Vercel gives you the frontend URL, update Railway:

- `CLIENT_URL=https://<your-frontend-domain>`

Redeploy the backend after changing the value.

## 5. Production checklist

- Do not use `localhost` in production environment variables.
- Use a long random `JWT_SECRET`.
- Confirm the frontend can register, log in, create an event, and book a time.
- Confirm the backend health check stays green after redeploys.
