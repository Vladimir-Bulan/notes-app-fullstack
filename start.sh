#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Notes App - Full Stack Setup Script${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check if required tools are installed
echo -e "${YELLOW}Checking required tools...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js v18 or higher"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed${NC}"
    exit 1
fi

if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}Warning: PostgreSQL client not found${NC}"
    echo "Make sure PostgreSQL is installed and running"
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Node.js version: $NODE_VERSION${NC}"

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓ npm version: $NPM_VERSION${NC}"
echo ""

# Setup Database
echo -e "${YELLOW}Setting up PostgreSQL database...${NC}"
echo "Database setup instructions:"
echo "1. Make sure PostgreSQL is running"
echo "2. Create database: createdb notesapp"
echo "3. Or use psql:"
echo "   psql -U postgres"
echo "   CREATE DATABASE notesapp;"
echo ""
read -p "Press Enter to continue once database is ready..."

# Install Backend Dependencies
echo -e "${YELLOW}Installing backend dependencies...${NC}"
cd backend
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to install backend dependencies${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ Backend dependencies already installed${NC}"
fi
cd ..

# Install Frontend Dependencies
echo -e "${YELLOW}Installing frontend dependencies...${NC}"
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to install frontend dependencies${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ Frontend dependencies already installed${NC}"
fi
cd ..

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Installation Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check if user wants to start the servers
read -p "Do you want to start the application now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Starting backend server...${NC}"
    cd backend
    npm run start:dev &
    BACKEND_PID=$!
    cd ..
    
    echo -e "${YELLOW}Waiting for backend to start...${NC}"
    sleep 5
    
    echo -e "${YELLOW}Starting frontend server...${NC}"
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}Application is running!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "Backend API: ${GREEN}http://localhost:3000${NC}"
    echo -e "Frontend: ${GREEN}http://localhost:5173${NC}"
    echo ""
    echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}"
    echo ""
    
    # Wait for both processes
    wait $BACKEND_PID $FRONTEND_PID
else
    echo ""
    echo -e "${GREEN}To start the application manually:${NC}"
    echo ""
    echo -e "Terminal 1 - Backend:"
    echo -e "  cd backend"
    echo -e "  npm run start:dev"
    echo ""
    echo -e "Terminal 2 - Frontend:"
    echo -e "  cd frontend"
    echo -e "  npm run dev"
    echo ""
    echo -e "Then visit: ${GREEN}http://localhost:5173${NC}"
fi
