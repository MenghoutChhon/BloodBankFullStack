# Blood Donation Management System – Backend

Node.js + Express + MongoDB (Mongoose) backend for the Blood Donation System.

## 🛠️ Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file with:
   ```env
   MONGO_URI=mongodb://localhost:27017/blood_donation_db
   JWT_SECRET=supersecretkey
   PORT=5000
   ```

3. Start MongoDB locally (or use MongoDB Atlas).

4. Start backend:
   ```bash
   npm start
   ```

API runs at http://localhost:5000/api

## 📚 Endpoints

- `POST /api/donors/register` — Donor registration
- `POST /api/donors/login` — Donor login

Expand as needed for all roles and features!
