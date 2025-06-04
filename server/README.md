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
   TWILIO_ACCOUNT_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_token
   TWILIO_FROM_NUMBER=+1234567890
   ```

3. Start MongoDB locally (or use MongoDB Atlas).

4. Start backend:
   ```bash
   npm run dev
   ```

API runs at http://localhost:5000/api

SMS notifications are sent using [Twilio](https://www.twilio.com/). Configure `TWILIO_*` variables in `.env` for this feature.

## 📚 Endpoints

- `POST /api/donors/register` — Donor registration
- `POST /api/donors/login` — Donor login

Expand as needed for all roles and features!
