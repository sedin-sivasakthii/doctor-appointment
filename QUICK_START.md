# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites Check
- ✅ Node.js v18+ installed
- ✅ npm v10+ installed

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 3: Start Backend (Terminal 1)
```bash
cd backend
npm run start
```
✅ You should see: `Server running on port 5000`

### Step 4: Start Frontend (Terminal 2)
```bash
cd frontend
npm start
```
✅ Browser will automatically open http://localhost:4200

## 🎯 Test the Application

### Option A: Register a New Account
1. Click **"Don't have an account? Register here"** on login page
2. Fill in name, email, and password
3. Click **Register**
4. You'll be redirected to login
5. Login with your new credentials

### Option B: Use Existing Account
1. On login page, enter:
   - **Email**: `suman1@example.com`
   - **Password**: Try `password123` or register new account
2. Click **Login**

### After Login
- You'll see a list of doctors
- Filter by speciality or location
- Click on a doctor to see details
- View availability slots and book appointments

## 📁 Project Structure at a Glance

```
Doctor_Appointment_System/
├── backend/
│   ├── server.js          ← Main server file
│   ├── .env               ← Configuration (PORT=5000, JWT_SECRET)
│   ├── controllers/       ← API logic (auth, doctors)
│   ├── routes/           ← API endpoints
│   ├── data/
│   │   ├── users.json    ← User accounts
│   │   └── doctors.json  ← Doctor info & availability
│   └── package.json
│
└── frontend/
    ├── src/main.ts       ← App entry point
    ├── src/app/
    │   ├── app.routes.ts ← Route configuration
    │   ├── core/
    │   │   ├── services/  ← API calls (auth, doctors)
    │   │   ├── guards/    ← Auth protection
    │   │   └── models/    ← Data interfaces
    │   └── features/
    │       ├── auth/      ← Login & Register
    │       └── doctors/   ← Doctor list & details
    └── package.json
```

## ⚙️ Configuration Files

### Backend (.env)
```
PORT=5000
JWT_SECRET=mySuperSecretKey
```

### Frontend API URLs (auto-configured)
- Auth API: `http://localhost:5000/auth`
- Doctors API: `http://localhost:5000/doctors`

## 🔧 Troubleshooting

### Backend won't start
```bash
# Make sure port 5000 is free
# On Windows: netstat -ano | findstr :5000
# Kill process if needed and try again
npm run start
```

### Frontend shows blank page
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Make sure backend is running on port 5000
4. Check Network tab - should see requests to http://localhost:5000

### Login button not working
1. Check browser console for errors
2. Verify backend is running and accessible
3. Use existing account or register new one
4. Clear localStorage: `localStorage.clear()` in console

## 📝 Available Scripts

### Backend
```bash
npm run start          # Run production server
npm run dev           # Run with auto-reload (requires nodemon)
```

### Frontend
```bash
npm start             # Development server
npm run build         # Production build
npm test             # Run tests
```

## 🎨 Features Overview

✅ **User Authentication**
- Register new accounts
- Login with email/password
- Secure JWT tokens
- Logout functionality

✅ **Doctor Management**
- View all doctors
- Filter by speciality & location
- View doctor details & reviews
- Check appointment availability
- See consultation fees

✅ **Security**
- Password hashing (bcryptjs)
- Token-based auth (JWT)
- Protected routes with guards
- CORS configured

## 🌐 API Endpoints Reference

### Auth
- `POST /auth/register` - Create account
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `GET /auth/me` - Get current user

### Doctors
- `GET /doctors` - List all doctors
- `GET /doctors/:id` - Get doctor details

## 📚 Next Steps

1. ✅ Follow the Quick Start above
2. Create a user account via registration
3. Explore the doctor list
4. View doctor details and availability
5. (Future) Implement appointment booking in database

## 💡 Tips

- Use the browser DevTools (F12) to inspect requests
- Check backend console for request logs
- Use browser DevTools to debug frontend code
- Passwords in users.json are hashed for security
- Registration automatically hashes passwords

## ❓ Need Help?

If something isn't working:
1. Check both services are running (backend + frontend)
2. Verify ports 5000 and 4200 are free
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check .env file has `PORT=5000`
5. Reinstall dependencies if needed

---

**You're all set! Start both servers and visit http://localhost:4200** 🎉
