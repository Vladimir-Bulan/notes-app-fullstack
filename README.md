# Notes App - Full Stack Implementation

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

Full-stack note-taking application with categories and filtering, built as a technical challenge.

## 🚀 Author
**Alexander Vladimir Bulan Georgieff**
- LinkedIn: [tu-perfil](https://www.linkedin.com/in/vladimir-bulan-60083b21b/)
- GitHub: [@Vladimir-Bulan](https://github.com/Vladimir-Bulan)

## 📸 Screenshots

### Main Dashboard
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f6c060d3-17d1-4527-884d-dc5e9354a353" />

### Create Note
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c39e0447-9d30-4009-87dd-c261d44d12cd" />

### Category Management
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/02f1735e-c17c-4f6e-853a-fafd21d9b0cc" />

### Filter by Category
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2c33f59c-2fc1-4d5d-86d8-cbcc302d8c21" />

### Archived Notes
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6e446abe-8780-482c-9202-66587468d775" />

**Ensolvers Full Stack Challenge**  
Candidate: Alexander Vladimir Bulan Georgieff  
Repository: [BulanGeorgieff-60e224](https://github.com/hirelens-challenges/BulanGeorgieff-60e224)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Requirements](#system-requirements)
- [Quick Start](#quick-start)
- [Manual Setup](#manual-setup)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Design Decisions](#design-decisions)

## 🎯 Overview

This is a full-stack web application that allows users to create, manage, tag, and filter notes. The application is built as a Single Page Application (SPA) with a clear separation between frontend and backend.

**Implementation Status:**
- ✅ **Phase 1**: Complete (Note CRUD operations, Archive/Unarchive)
- ✅ **Phase 2**: Complete (Categories, Filtering by category)

## ✨ Features

### Phase 1 (Mandatory)
- ✅ Create, edit, and delete notes
- ✅ Archive/unarchive notes
- ✅ List active notes
- ✅ List archived notes

### Phase 2 (Bonus)
- ✅ Add/remove categories to notes
- ✅ Filter notes by category
- ✅ Color-coded categories
- ✅ Category management (create, delete)

## 🛠 Technology Stack

### Backend
- **Runtime**: Node.js v18.17.0 or higher
- **Framework**: NestJS v10.0.0
- **Language**: TypeScript v5.1.3
- **ORM**: TypeORM v0.3.17
- **Database**: PostgreSQL v14 or higher
- **Validation**: class-validator v0.14.0, class-transformer v0.5.1

### Frontend
- **Runtime**: Node.js v18.17.0 or higher
- **Build Tool**: Vite v5.0.8
- **Framework**: React v18.2.0
- **Language**: TypeScript v5.2.2
- **Styling**: Tailwind CSS v3.3.6
- **HTTP Client**: Axios v1.6.0
- **Notifications**: react-hot-toast v2.4.1

### Development Tools
- **Package Manager**: npm v9.6.7 or higher
- **Version Control**: Git

## 📦 System Requirements

Before running the application, ensure you have the following installed:

### Required
- **Node.js**: v18.17.0 or higher
- **npm**: v9.6.7 or higher
- **PostgreSQL**: v14 or higher

### Recommended
- **Git**: Latest version
- **PostgreSQL GUI** (optional): pgAdmin, DBeaver, or similar

### Verification Commands
```bash
node -v    # Should show v18.17.0 or higher
npm -v     # Should show v9.6.7 or higher
psql --version  # Should show PostgreSQL 14 or higher
```

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

1. **Clone the repository:**
```bash
git clone https://github.com/hirelens-challenges/BulanGeorgieff-60e224.git
cd BulanGeorgieff-60e224
```

2. **Setup PostgreSQL database:**
```bash
# Using psql
psql -U postgres
CREATE DATABASE notesapp;
\q

# Or using createdb command
createdb -U postgres notesapp
```

3. **Run the setup script:**
```bash
./start.sh
```

The script will:
- Install all dependencies (backend and frontend)
- Verify system requirements
- Start both servers automatically
- Backend will run on http://localhost:3000
- Frontend will run on http://localhost:5173

### Option 2: Manual Setup

See [Manual Setup](#manual-setup) section below.

## 🔧 Manual Setup

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
Create a `.env` file with the following content:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=notesapp
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. **Start the backend server:**
```bash
# Development mode (with hot reload)
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The backend API will be available at `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
Create a `.env` file with:
```env
VITE_API_URL=http://localhost:3000
```

4. **Start the development server:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Notes Endpoints

#### Create Note
```http
POST /api/notes
Content-Type: application/json

{
  "title": "My Note",
  "content": "Note content",
  "categoryIds": ["uuid1", "uuid2"] // Optional
}
```

#### Get All Notes
```http
GET /api/notes                    # All notes
GET /api/notes?archived=false     # Active notes only
GET /api/notes?archived=true      # Archived notes only
GET /api/notes?categoryId=uuid    # Notes by category
```

#### Get Single Note
```http
GET /api/notes/:id
```

#### Update Note
```http
PUT /api/notes/:id
Content-Type: application/json

{
  "title": "Updated Title",       // Optional
  "content": "Updated content",   // Optional
  "archived": true,               // Optional
  "categoryIds": ["uuid1"]        // Optional
}
```

#### Delete Note
```http
DELETE /api/notes/:id
```

#### Archive Note
```http
PATCH /api/notes/:id/archive
```

#### Unarchive Note
```http
PATCH /api/notes/:id/unarchive
```

### Categories Endpoints

#### Create Category
```http
POST /api/categories
Content-Type: application/json

{
  "name": "Work",
  "color": "#3B82F6"  // Optional, hex color
}
```

#### Get All Categories
```http
GET /api/categories
```

#### Get Single Category
```http
GET /api/categories/:id
```

#### Update Category
```http
PUT /api/categories/:id
Content-Type: application/json

{
  "name": "Personal",    // Optional
  "color": "#10B981"     // Optional
}
```

#### Delete Category
```http
DELETE /api/categories/:id
```

## 📁 Project Structure

```
BulanGeorgieff-60e224/
├── backend/                    # Backend application
│   ├── src/
│   │   ├── notes/
│   │   │   ├── controllers/   # Controller Layer (HTTP)
│   │   │   │   ├── notes.controller.ts
│   │   │   │   └── categories.controller.ts
│   │   │   ├── services/      # Service Layer (Business Logic)
│   │   │   │   ├── notes.service.ts
│   │   │   │   └── categories.service.ts
│   │   │   ├── repositories/  # Repository/DAO Layer (Data Access)
│   │   │   │   ├── notes.repository.ts
│   │   │   │   └── categories.repository.ts
│   │   │   ├── entities/      # Database Models
│   │   │   │   ├── note.entity.ts
│   │   │   │   └── category.entity.ts
│   │   │   ├── dto/           # Data Transfer Objects
│   │   │   │   ├── create-note.dto.ts
│   │   │   │   ├── update-note.dto.ts
│   │   │   │   └── category.dto.ts
│   │   │   └── notes.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/                   # Frontend application
│   ├── src/
│   │   ├── components/        # React Components
│   │   │   ├── NoteCard.tsx
│   │   │   ├── NoteForm.tsx
│   │   │   └── CategoryManager.tsx
│   │   ├── services/          # API Services
│   │   │   └── api.ts
│   │   ├── types/             # TypeScript Types
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── .env
│
├── start.sh                    # Automated setup script
└── README.md                   # This file
```

## 🏗 Design Decisions

### Backend Architecture

#### Three-Layer Architecture
The backend follows a strict **three-layer architecture** pattern as required:

1. **Controller Layer** (`controllers/`)
   - Handles HTTP requests and responses
   - Validates input using DTOs
   - Delegates business logic to services
   - Returns appropriate HTTP status codes

2. **Service Layer** (`services/`)
   - Contains all business logic
   - Coordinates between controllers and repositories
   - Handles transactions and validations
   - Implements use cases

3. **Repository/DAO Layer** (`repositories/`)
   - Direct interaction with database via TypeORM
   - CRUD operations
   - Custom queries
   - Data persistence logic

#### Technology Choices

- **NestJS**: Chosen because it enforces the service layer pattern by default, unlike Laravel or Django which require additional architectural adjustments
- **TypeORM**: Provides robust ORM capabilities with TypeScript support
- **PostgreSQL**: Relational database for data persistence (no in-memory or mocks)
- **UUID**: Used for primary keys instead of auto-increment integers for better security and distribution

### Frontend Architecture

#### Component Structure
- **Separation of Concerns**: Each component has a single responsibility
- **Type Safety**: Full TypeScript implementation
- **State Management**: React hooks (useState, useEffect)
- **API Abstraction**: Centralized API service layer

#### Technology Choices
- **React + Vite**: Fast development with hot module replacement
- **Tailwind CSS**: Utility-first CSS for rapid UI development
- **Axios**: Robust HTTP client with interceptor support
- **react-hot-toast**: User-friendly notifications

### Database Design

#### Entity Relationships
- **Notes ↔ Categories**: Many-to-Many relationship
- **Join Table**: `note_categories` (automatically managed by TypeORM)
- **Soft Delete Alternative**: Archive flag instead of soft delete

#### Schema
```sql
notes (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

categories (
  id UUID PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  color VARCHAR(7) DEFAULT '#3B82F6',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

note_categories (
  note_id UUID REFERENCES notes(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (note_id, category_id)
)
```

### Key Features Implementation

#### Phase 1
- **CRUD Operations**: Full implementation with validation
- **Archive System**: Separate endpoints for archive/unarchive
- **Filtering**: Query parameters for active/archived notes
- **Error Handling**: Comprehensive error messages and HTTP status codes

#### Phase 2
- **Category Management**: Complete CRUD for categories
- **Many-to-Many Relationship**: Notes can have multiple categories
- **Color System**: Hex color validation for visual categorization
- **Filter by Category**: Dedicated endpoint and UI filter

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm run test        # Run unit tests
npm run test:watch  # Run tests in watch mode
npm run test:cov    # Run tests with coverage
```

### Frontend Testing
```bash
cd frontend
npm run test
```

## 🔍 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL if needed
sudo systemctl start postgresql

# Test connection
psql -U postgres -d notesapp
```

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
kill -9 <PID>

# Find process using port 5173
lsof -i :5173
kill -9 <PID>
```

### Node Modules Issues
```bash
# Clear cache and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

## 📝 Notes

- The application uses **synchronize: true** in TypeORM for development convenience. This should be disabled in production and proper migrations should be used.
- Default database credentials are configured in `.env` files. Change these for production use.
- CORS is enabled for `http://localhost:5173` by default.

## 👤 Author

**Alexander Vladimir Bulan Georgieff**

## 📄 License

This project is part of the Ensolvers hiring challenge.

---

**Completion Date**: December 2024  
**Total Time**: Completed within the 3-day deadline
