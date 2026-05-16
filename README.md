# Doctor Appointment System

A full-stack web application for managing doctor appointments. Built with Angular 21 (frontend) and Express.js (backend).

## Project Structure

```
Doctor_Appointment_System/
├── backend/               # Node.js/Express API server
│   ├── controllers/       # Route controllers
│   ├── routes/           # API routes
│   ├── middleware/       # Authentication middleware
│   ├── data/            # JSON data files
│   ├── server.js        # Main server file
│   └── package.json
└── frontend/            # Angular 21 application
    ├── src/
    │   ├── app/
    │   │   ├── core/           # Guards, interceptors, services, models
    │   │   ├── features/       # Auth and Doctors modules
    │   │   └── shared/         # Shared components and utilities
    │   └── main.ts           # Entry point
    └── package.json
```

## Prerequisites

- **Node.js** v18 or higher
- **npm** v10 or higher
- **Angular CLI** v21

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Verify `.env` file exists with correct configuration:
   ```
   PORT=5000
   JWT_SECRET=mySuperSecretKey
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Start the Backend Server

```bash
cd backend
npm run start
```

The backend will run on **http://localhost:5000**

Output should show:
```
Server running on port 5000
```

### Start the Frontend Development Server

In a new terminal:

```bash
cd frontend
npm start
```

The frontend will run on **http://localhost:4200**

## Application Features

### Authentication
- **Login Page**: User authentication with email and password
- **Register Page**: Create new user accounts
- **Token-based Security**: JWT tokens for secure API communication
- **Auth Guard**: Protects doctor routes, redirects unauthenticated users to login
- **Guest Guard**: Prevents logged-in users from accessing auth pages

### Doctor Listing
- **View all doctors** with specialization, location, and consultation fees
- **Filter doctors** by speciality and location
- **View doctor details** including reviews and availability
- **Check slot availability** and book appointments

### Data Files
- `backend/data/users.json` - Stores registered user information
- `backend/data/doctors.json` - Contains doctor profiles and availability slots

## API Endpoints

### Authentication Routes
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user (requires token)
- `POST /auth/refresh` - Refresh JWT token

### Doctor Routes
- `GET /doctors` - Get all doctors
- `GET /doctors/:id` - Get doctor by ID

## Default Login Credentials

After running `npm install` in the backend, use these credentials:

```
Email: user@example.com
Password: password123
```

(Or register a new account on the Register page)

## Technology Stack

### Frontend
- **Angular 21** - Modern web framework
- **TypeScript** - Type-safe JavaScript
- **RxJS** - Reactive programming
- **Angular Router** - Routing and navigation
- **Reactive Forms** - Form handling

### Backend
- **Express.js** - Node.js web framework
- **JWT** - Secure token authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **dotenv** - Environment configuration

## Key Configuration Files

- `frontend/src/app/app.config.ts` - Angular configuration with HTTP interceptors
- `frontend/src/app/app.routes.ts` - Application routing
- `backend/.env` - Backend environment variables
- `backend/server.js` - Express server setup

## Environment Configuration

### Frontend Services
- Auth Service: `http://localhost:5000/auth`
- Doctors Service: `http://localhost:5000/doctors`

### Backend Server
- Port: 5000 (configurable in `.env`)
- CORS Origin: http://localhost:4200

## Troubleshooting

### Common Issues

1. **Backend not running on port 5000**
   - Check `.env` file has `PORT=5000`
   - Verify no other process is using port 5000

2. **CORS errors**
   - Ensure backend is running on port 5000
   - Check backend CORS configuration in `server.js`

3. **Login fails with "Invalid email or password"**
   - Verify user exists in `backend/data/users.json`
   - Check that backend server is running

4. **Frontend won't load**
   - Ensure backend is running before starting frontend
   - Check that `http://localhost:5000` is accessible

## Development Workflow

1. **Start Backend**: `npm run start` (in backend folder)
2. **Start Frontend**: `npm start` (in frontend folder)
3. **Access Application**: Open http://localhost:4200 in browser
4. **Register or Login**: Create account or use existing credentials
5. **Browse Doctors**: View list and details

## Building for Production

### Frontend
```bash
cd frontend
npm run build
```

Output: `frontend/dist/`

### Backend
Backend is ready to run with `npm start`

## File Resolution Summary

The following merge conflicts were resolved:
- `frontend/src/app/app.routes.ts` - Routes configuration with auth and doctor modules
- `frontend/src/app/app.ts` - Root component
- `frontend/src/app/core/models/doctor.model.ts` - Doctor data model
- `frontend/src/app/features/doctors/doctors-routing.module.ts` - Added doctor routes
- API URLs updated to match backend port 5000
- Backend port configuration set to 5000

## Support

For issues or questions, verify:
1. Both services are running (backend on 5000, frontend on 4200)
2. All dependencies are installed (`npm install`)
3. `.env` file has correct PORT=5000
4. Check browser console for error messages
