🍬 Sweet Shop Management System (MVP)
A full-stack TDD kata application for managing a sweet shop’s inventory, authentication, and sales operations.
This project demonstrates hands-on skills in API design, frontend integration, database management, and test-driven development (TDD).
🎯 Project Overview
The Sweet Shop Management System allows users to:
Register/Login securely
View/Add/Update/Delete sweets
Purchase sweets (reduces stock automatically)
Restock inventory when items run low
It’s designed as a TDD-driven full-stack project, following the Red → Green → Refactor workflow with clear, incremental commits.
🧩 Core Features
🔐 User Authentication – JWT-based login/register with password hashing (Bcrypt)
🍭 Sweet Management – CRUD operations for sweets (name, category, price, quantity)
💸 Purchase System – Decrease stock after purchase; disable out-of-stock items
🧮 Inventory Control – Restock items via dashboard
🖥️ SPA Dashboard – Interactive React interface using Axios and React Router
🛠️ Tech Stack
Backend:
Node.js + Express
SQLite (file-based database)
JWT + Bcrypt for authentication
Frontend:
React (Create React App)
Axios for REST API calls
React Router for navigation
Testing:
Jest + Supertest for backend endpoint testing
Development Methodology:
TDD with Red-Green-Refactor workflow
Unit + integration tests for key API routes
⚙️ Setup & Run Locally
1️⃣ Clone Repository
git clone https://github.com/Marthalamahithreddy/Sweet-Shop-Management-System-.git
2️⃣ Backend Setup
cd backend
npm install
Create a .env file in the backend folder:
JWT_SECRET=your_secret_key
Start the backend server:
npm start
3️⃣ Frontend Setup
In a new terminal:
cd frontend
npm install
npm start
The React app runs on localhost:3000, proxied to the backend.
4️⃣ Seed Sample Data
Run once in the backend folder to populate example sweets:
node -e "const db = require('./db'); db.run('INSERT OR IGNORE INTO sweets (name, category, price, quantity) VALUES (\"Gummy Bears\", \"Candy\", 1.5, 10), (\"Chocolate Bar\", \"Snack\", 2.0, 5)');"
🧁 Usage
Open browser → http://localhost:3000
Register (e.g. test@test.com / password)
Login to access the Sweet Shop Dashboard
Add, edit, delete, purchase, and restock sweets
Out-of-stock items are automatically disabled for purchase
🧪 Run Tests
Run backend tests:
npm test
Example Output:
PASS backend/api.test.js
 ✓ should register user (200 ms)
 ✓ should add sweet with token (150 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Coverage:    ~70%
📊 Project Summary
Component	Tech	Key Features
Backend	Node.js + Express + SQLite	REST APIs, JWT Auth
Frontend	React + Axios + Router	SPA Dashboard
Testing	Jest + Supertest	TDD Workflow
Focus	Full-Stack CRUD + Auth	Red-Green-Refactor Cycle
💡 Highlights
Secure authentication with JWT
Persistent SQLite database
Full-stack CRUD functionality
TDD-based approach with >70% test coverage
Lightweight and easy to run locally
