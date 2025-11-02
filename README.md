# 🍬 Sweet Shop Management System (MVP)

A **full-stack TDD kata application** for managing a sweet shop’s inventory, authentication, and sales operations.  
This project demonstrates hands-on skills in **API design**, **frontend integration**, **database management**, and **test-driven development (TDD)**.

---

## 🎯 Project Overview

The **Sweet Shop Management System** allows users to:

- 🔐 Register/Login securely  
- 🍭 View/Add/Update/Delete sweets  
- 💸 Purchase sweets (reduces stock automatically)  
- 🧮 Restock inventory when items run low  

It’s designed as a **TDD-driven full-stack project**, following the **Red → Green → Refactor** workflow with clear, incremental commits.

---

## 🧩 Core Features

- **🔐 User Authentication** – JWT-based login/register with password hashing (Bcrypt)  
- **🍭 Sweet Management** – CRUD operations for sweets (name, category, price, quantity)  
- **💸 Purchase System** – Decrease stock after purchase; disable out-of-stock items  
- **🧮 Inventory Control** – Restock items via dashboard  
- **🖥️ SPA Dashboard** – Interactive React interface using Axios and React Router  

---

## 🛠️ Tech Stack

### Backend:
- Node.js + Express  
- SQLite (file-based database)  
- JWT + Bcrypt for authentication  

### Frontend:
- React (Create React App)  
- Axios for REST API calls  
- React Router for navigation  

### Testing:
- Jest + Supertest for backend endpoint testing  

### Development Methodology:
- TDD with Red-Green-Refactor workflow  
- Unit + integration tests for key API routes  

---

## ⚙️ Setup & Run Locally

### 1️⃣ Clone Repository
```bash
git clone https://github.com/ehrithikreddy/Sweetshop-Management-System.git
