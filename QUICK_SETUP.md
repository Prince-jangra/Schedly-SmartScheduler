# 🚀 Quick Setup Checklist

## Step 1: Database Setup ✅

1. **Create MySQL Database**

   ```sql
   CREATE DATABASE schedly_clone;
   USE schedly_clone;
   ```

2. **Run Schema** - Copy all SQL from `server/schema.sql` and execute in MySQL

3. **Verify Tables**
   ```sql
   SHOW TABLES;
   ```

---

## Step 2: Server Configuration 📋

1. **Create `.env` file in `/server` folder**

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=calendly_clone
   JWT_SECRET=your_super_secret_key_12345
   ```

2. **Verify Dependencies**

   ```bash
   cd server
   npm list | grep -E "jsonwebtoken|bcryptjs"
   ```

3. **Start Server**
   ```bash
   npm run dev
   ```
   Should see: `Server running on port 5000` and `MySQL Connected`

---

## Step 3: Client Setup 🎨

1. **Install Dependencies** (if not already done)

   ```bash
   cd client
   npm install
   ```

2. **Start Client**
   ```bash
   npm run dev
   ```
   Should open on `http://localhost:5173`

---

## Step 4: Testing 🧪

### Test Landing Page

- [ ] Navigate to `http://localhost:5173`
- [ ] See: Calendly Clone logo, features, CTA buttons
- [ ] Click "Get Started" → goes to Register
- [ ] Click "Sign In" → goes to Login

### Test Registration

- [ ] Fill name, email, password
- [ ] Passwords must match
- [ ] Password min 6 characters
- [ ] Cannot use same email twice
- [ ] Should redirect to Dashboard after success

### Test Login

- [ ] Enter email and password
- [ ] Error for wrong credentials
- [ ] Success redirects to Dashboard

### Test Dashboard

- [ ] See user name and email in top-right
- [ ] Create event: title + duration
- [ ] Event appears in grid
- [ ] Click "Copy Link" → link copied
- [ ] Click "Book Now" → goes to booking page

### Test Booking

- [ ] Select date in date picker
- [ ] Time slots appear
- [ ] Greyed out slots are booked
- [ ] Select time slot (turns blue)
- [ ] Enter name and email
- [ ] Click "Confirm Booking"
- [ ] See success message
- [ ] Redirected to landing page after 2 seconds

### Test Logout

- [ ] Click "Sign Out" in Dashboard
- [ ] Redirected to landing page
- [ ] Cannot access Dashboard without logging in

---

## Common Issues & Solutions 🔧

### Issue: "Cannot find module 'jsonwebtoken'"

**Solution:**

```bash
cd server
npm install jsonwebtoken bcryptjs
```

### Issue: "MySQL Connection Error"

**Solution:**

- Check `.env` file has correct DB credentials
- Ensure MySQL is running
- Verify database name is correct

### Issue: "Auth token is invalid"

**Solution:**

- Clear localStorage in browser
- Log out and log back in
- Check JWT_SECRET is same in .env

### Issue: CORS errors

**Solution:**

- Make sure server is running on port 5000
- Check client making requests to `http://localhost:5000`

---

## Demo Account 👤

For quick testing:

- **Email:** test@example.com
- **Password:** password123

_After registration, you can use any email/password on the register page_

---

## Features to Showcase 🌟

1. **Professional UI**
   - Modern gradients
   - Smooth animations
   - Responsive design

2. **Full Authentication**
   - Secure login/register
   - JWT tokens
   - Password hashing

3. **Event Management**
   - Create multiple events
   - Share booking links
   - Manage from dashboard

4. **Smart Booking**
   - Date picker
   - Time slot selection
   - Prevents double booking

5. **User Experience**
   - Loading states
   - Error handling
   - Success messages
   - Form validation

---

## File Structure Reference 📁

```
Calendly_clone/
├── server/
│   ├── .env .................... Database & JWT config (CREATE THIS)
│   ├── index.js ................ Main server file
│   ├── db.js ................... Database connection
│   ├── schema.sql .............. Database schema (RUN THIS)
│   ├── middleware/
│   │   └── auth.js ............. JWT verification
│   └── routes/
│       ├── auth.js ............. Login/Register
│       ├── events.js ........... Event management
│       ├── bookings.js ......... Booking creation
│       ├── availability.js ..... Availability management
│       └── meetings.js ......... Meeting data
│
└── client/
    ├── src/
    │   ├── pages/
    │   │   ├── Landing.jsx ...... Public page
    │   │   ├── Login.jsx ........ Login form
    │   │   ├── Register.jsx ..... Registration form
    │   │   ├── Dashboard.jsx .... User dashboard
    │   │   └── Booking.jsx ...... Booking page
    │   └── App.jsx ............. Main app with routing
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

---

## Next Steps 🎯

1. ✅ Database set up
2. ✅ Server running
3. ✅ Client running
4. ✅ Test all features
5. 📱 Add mobile optimizations (optional)
6. 🌐 Deploy to hosting (optional)

---

## Need Help? 💡

- Check terminal for error messages
- Verify all ports (3000 for server, 5173 for client)
- Ensure MySQL is running
- Check `.env` file exists with correct values
- Look at browser console for client-side errors
