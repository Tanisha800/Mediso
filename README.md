# Mediso - Smart Hospital Management System


## Project Overview
Mediso is a full-stack Smart Hospital Management System designed to streamline healthcare operations across three user roles: Patient, Doctor, and Admin. The platform enables patients to book appointments with doctors, doctors to manage their schedules and write prescriptions, and admins to oversee the entire system. The application is built with a modern tech stack and follows a clean separation of frontend and backend concerns.

## Tech Stack

### Frontend
* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui component library
* Axios for HTTP requests
* Zustand for state management
* JWT decoding via \`jwt-decode\`

### Backend
* Node.js with Express.js
* TypeScript
* Prisma ORM
* PostgreSQL (hosted on Supabase/Vercel Postgres)
* JWT-based authentication
* bcrypt for password hashing

### Deployment & Tools
* **Frontend:** Vercel
* **Backend:** Render
* **Database:** PostgreSQL (cloud-hosted)
* **Tools:** Git, GitHub, Prisma Migrations, ESLint

## Project Structure
```
healthcare/
├── backend/
│   ├── prisma/
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/
│       ├── types/
│       └── utils/
├── frontend/
│   └── src/
│       ├── app/
│       ├── components/
│       ├── services/
│       ├── hooks/
│       ├── lib/
│       └── types/
└── diagrams/
```

## Setup and Installation

### Prerequisites
* Node.js 18 or higher
* npm
* PostgreSQL database (local or cloud)

### Backend Setup
1. \`cd backend\`
2. \`npm install\`
3. Create a \`.env\` file in the backend directory:
   \`\`\`env
   DATABASE_URL=postgresql://user:password@host:port/dbname
   JWT_SECRET=your_jwt_secret_here
   PORT=5001
   \`\`\`
4. Run Prisma migrations and seed the database:
   \`\`\`bash
   npx prisma migrate deploy
   npx prisma db seed
   \`\`\`
5. Start the backend server: \`npm run dev\` (Runs on http://localhost:5001)

### Frontend Setup
1. \`cd frontend\`
2. \`npm install\`
3. Create a \`.env.local\` file in the frontend directory:
   \`\`\`env
   NEXT_PUBLIC_API_URL=http://localhost:5001/api
   \`\`\`
4. Start the frontend server: \`npm run dev\` (Runs on http://localhost:3000)

## How to Run the Project
1. Start PostgreSQL and ensure the database is accessible.
2. Run the backend server (\`cd backend && npm run dev\`).
3. Run the frontend server (\`cd frontend && npm run dev\`).
4. Open http://localhost:3000 in your browser.
5. Register as a Patient or use seeded credentials to log in as Doctor or Admin. *(Admin/Doctor credentials can be found in \`seed.ts\`)*.

## Architecture Explanation
Mediso follows a three-tier architecture:
* **Presentation Layer (Frontend):** Built with Next.js App Router, organized into role-specific route groups (\`/admin\`, \`/doctor\`, \`/patient\`).
* **Application Layer (Backend):** Express.js backend exposing a RESTful API organized by routes, controllers, and services. Auth via JWT and role-based middleware.
* **Data Layer:** Prisma ORM sitting in front of a PostgreSQL database managing complex relations and cascades.
