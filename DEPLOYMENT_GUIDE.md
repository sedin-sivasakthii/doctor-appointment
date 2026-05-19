# Doctor Appointment - Deployment Setup Guide

## ✅ SETUP CHECKLIST

### Frontend (Vercel)
- [ ] Environment files created ✓
  - `src/environments/environment.ts` - Local dev
  - `src/environments/environment.prod.ts` - Production
- [ ] Services updated to use environments ✓
  - auth.service.ts
  - core/doctors.service.ts
  - features/doctors.service.ts
- [ ] angular.json configured with fileReplacements ✓
- [ ] Code pushed to Vercel repository
- [ ] Vercel build triggered and deployed

### Backend (Render)
- [ ] Environment variables set in Render dashboard:
  - `CORS_ORIGIN`: https://doctor-appointment-lime-two.vercel.app
  - `JWT_SECRET`: (your secret key)
  - `NODE_ENV`: production
  - `PORT`: (leave blank - Render assigns automatically)

---

## 🔧 RENDER BACKEND SETUP (IMPORTANT!)

### Step 1: Go to Render Dashboard
1. Visit: https://dashboard.render.com
2. Select your "doctor-appointment" service
3. Click **"Environment"** tab

### Step 2: Set Environment Variables
Add these variables:

| Variable | Value |
|----------|-------|
| `CORS_ORIGIN` | `https://doctor-appointment-lime-two.vercel.app` |
| `JWT_SECRET` | *(keep your current secret)* |
| `NODE_ENV` | `production` |

**IMPORTANT**: Do NOT include trailing slash in CORS_ORIGIN URL!

### Step 3: Save and Redeploy
1. Click **"Save"**
2. Service will automatically redeploy with new environment variables
3. Wait for green checkmark ✓

---

## 🧪 TESTING STEPS

### Test 1: Check Backend Health
```bash
curl https://doctor-appointment-f9cc.onrender.com/
```
Expected response:
```
Doctor Appointment API Running
```

### Test 2: Check CORS Configuration
Open browser DevTools and run in console:
```javascript
fetch('https://doctor-appointment-f9cc.onrender.com/doctors')
  .then(r => r.json())
  .then(data => console.log('Success:', data))
  .catch(err => console.error('CORS Error:', err));
```

### Test 3: Frontend Connection
1. Visit: https://doctor-appointment-lime-two.vercel.app
2. Go to **Doctors** page
3. Check Network tab (DevTools → Network)
4. Verify requests to:
   - ✓ `https://doctor-appointment-f9cc.onrender.com/doctors`
   - ✓ NO 404 errors
   - ✓ NO CORS errors

### Test 4: Authentication
1. Try **Login** or **Register**
2. Network tab should show request to:
   - ✓ `https://doctor-appointment-f9cc.onrender.com/auth/login`
   - ✓ `https://doctor-appointment-f9cc.onrender.com/auth/register`

### Test 5: Full Flow
1. Register a new account
2. Login
3. Browse doctors
4. Select a doctor and check details
5. Verify all data loads without errors

---

## 🚨 COMMON ISSUES & FIXES

### Issue: CORS Error
**Error**: `No 'Access-Control-Allow-Origin' header`

**Fix**: 
- [ ] Verify CORS_ORIGIN is set in Render
- [ ] Check URL has no trailing slash
- [ ] Render service redeployed after setting env var

### Issue: 504 Gateway Timeout
**Cause**: Backend taking too long to respond or cold start

**Fix**:
- [ ] Wait a few minutes (Render free tier cold starts)
- [ ] Check Render logs for errors

### Issue: API returning 404
**Cause**: Routes not working

**Fix**:
- [ ] Verify backend/routes files exist
- [ ] Check server.js is using correct port
- [ ] Check logs on Render dashboard

### Issue: Login not working
**Cause**: JWT_SECRET mismatch

**Fix**:
- [ ] Verify JWT_SECRET env var matches local .env
- [ ] Redeploy backend after changing JWT_SECRET

---

## 📋 LOCAL TESTING (Before Vercel Deploy)

To test locally before pushing to Vercel:

### Terminal 1: Start Backend
```bash
cd backend
npm install
npm start
```
Should see: `Server running on port 5000`

### Terminal 2: Start Frontend
```bash
cd frontend
npm install
npm start
```
Visit: http://localhost:4200

Both should work with hardcoded localhost URLs in development environment.

---

## 📝 FINAL CHECKLIST BEFORE GOING LIVE

- [ ] Environment files created correctly
- [ ] Services use `environment.apiUrl`
- [ ] angular.json has fileReplacements
- [ ] Backend CORS_ORIGIN set to Vercel URL
- [ ] Render service redeployed
- [ ] Local testing works (localhost:4200 ↔ localhost:5000)
- [ ] Vercel frontend deployed and updated
- [ ] Production API calls working (test in browser)
- [ ] No console errors in DevTools
- [ ] Authentication working end-to-end
- [ ] Doctor listing loading from backend
