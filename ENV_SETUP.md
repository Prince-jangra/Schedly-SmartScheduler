# Environment Variables Configuration

## Frontend (.env files)

### Local Development
File: `client/.env`
```
VITE_API_URL=http://localhost:5000
```

### Production (Vercel)
File: `client/.env.production` or Vercel Dashboard
```
VITE_API_URL=https://schedly-backend-production.up.railway.app
```

**To set on Vercel:**
1. Go to Vercel Dashboard
2. Select your project (Schedly-SmartScheduler)
3. Go to Settings → Environment Variables
4. Add:
   - Name: `VITE_API_URL`
   - Value: `https://schedly-backend-production.up.railway.app`
   - Select: Production
5. Click Save
6. Redeploy the project

## Backend (.env files)

### Local Development
File: `server/.env`
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Prince@12093
DB_NAME=calendly_clone
JWT_SECRET=schedly_super_secret_jwt_key_2025_change_in_production_12345
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Production (Railway)
Set in Railway Dashboard → Backend Service → Variables:
```
DB_HOST=mysql.railway.internal
DB_USER=root
DB_PASSWORD=(from Railway MySQL service)
DB_NAME=calendly_clone
JWT_SECRET=(long random string)
NODE_ENV=production
CLIENT_URL=https://schedly-smart-scheduler.vercel.app
PORT=5000
```

## How to Get Railway MySQL Password:
1. Go to Railway Dashboard
2. Click your MySQL service
3. Click "Connect"
4. Copy the password from the connection string

## Verify Everything Works:

### Local Testing:
```bash
# Terminal 1: Start backend
cd server
npm run dev

# Terminal 2: Start frontend
cd client
npm run dev

# Open http://localhost:5173
# Try login/register
```

### Production Testing:
1. Go to https://schedly-smart-scheduler.vercel.app
2. Try login/register
3. Check browser DevTools Console for errors
4. Check browser Network tab to see API calls going to:
   `https://schedly-backend-production.up.railway.app`
