# Schedly Clone (Evaluation README)

Schedly Clone is a full-stack meeting scheduling app inspired by Calendly.
It includes authentication, event-type management, public booking links, timezone-aware booking UI, and booking confirmation flow.

## Stack
- Frontend: React + Vite + Tailwind CSS + React Router + Axios
- Backend: Node.js + Express + MySQL + JWT + bcryptjs

## What Evaluators Should Check
- Auth flow: register, login, protected dashboard
- Event flow: create event type, list, delete, copy booking link
- Booking flow: select date/time, timezone selection, schedule meeting
- Confirmation flow: redirect to email-invitation confirmation page
- UX: responsive layout, loading states, validation messages

## Current Project Layout
- `client/` frontend app (single source of truth)
- `server/` backend API and DB integration
- `server/schema.sql` DB schema
- `QUICK_SETUP.md`, `SETUP_GUIDE.md`, `FEATURES_DOCUMENTATION.md` supporting docs

## Quick Run (Local)
1. Database
   - Create DB and run `server/schema.sql`
2. Server
   - Create `server/.env`:
     - `DB_HOST=localhost`
     - `DB_USER=...`
     - `DB_PASSWORD=...`
     - `DB_NAME=calendly_clone`
     - `JWT_SECRET=...`
   - Run:
     - `cd server`
     - `npm install`
     - `npm run dev`
3. Client
   - Run:
     - `cd client`
     - `npm install`
     - `npm run dev`

## API Summary
- `POST /auth/register`
- `POST /auth/login`
- `GET /events` (protected)
- `POST /events` (protected)
- `DELETE /events/:id` (protected)
- `GET /event-types/:id`
- `GET /bookings/event/:eventId`
- `POST /bookings`

## Security Notes
- Passwords are hashed with bcryptjs
- JWT required for protected routes
- DB queries use parameterized statements
- `.env` is not committed

## Documentation Privacy Check
I reviewed these root docs:
- `FEATURES_DOCUMENTATION.md`
- `QUICK_SETUP.md`
- `SETUP_GUIDE.md`

Result:
- No direct personal secrets found (no real passwords, private keys, phone numbers, or addresses)
- Existing email/password values in docs are demo placeholders only (non-production)

## Known Evaluation Notes
- Email invitation currently confirms in UI flow; real SMTP sending is not yet integrated server-side.

## Suggested Demo Script (2 minutes)
1. Register or login
2. Create one event type
3. Open generated booking link
4. Select date/time + timezone + email, click **Schedule Meeting**
5. Verify redirect to **Email Invitation Sent** confirmation page
