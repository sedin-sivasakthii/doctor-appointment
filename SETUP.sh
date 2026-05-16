#!/bin/bash
# Doctor Appointment System - Complete Setup & Run Script

echo "=========================================="
echo "Doctor Appointment System Setup"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Step 1: Installing Backend Dependencies${NC}"
cd backend
npm install
echo -e "${GREEN}✓ Backend dependencies installed${NC}"
echo ""

echo -e "${BLUE}Step 2: Installing Frontend Dependencies${NC}"
cd ../frontend
npm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
echo ""

echo -e "${BLUE}Step 3: Backend is ready!${NC}"
echo -e "${GREEN}✓ Run the following in Terminal 1:${NC}"
echo "  cd backend"
echo "  npm run start"
echo ""

echo -e "${BLUE}Step 4: Frontend is ready!${NC}"
echo -e "${GREEN}✓ Run the following in Terminal 2:${NC}"
echo "  cd frontend"
echo "  npm start"
echo ""

echo "=========================================="
echo -e "${GREEN}Setup Complete!${NC}"
echo "=========================================="
echo ""
echo "Application will be available at:"
echo "  http://localhost:4200"
echo ""
echo "Create a new account or login with:"
echo "  Email: suman1@example.com"
echo "  Password: (register new account recommended)"
echo ""
