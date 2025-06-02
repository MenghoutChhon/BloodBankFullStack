
# Blood Donation Management System

## Project Overview

The Blood Donation Management System is a full-stack web application built to streamline blood donations, donor management, inventory tracking, and hospital collaboration. The project consists of separate frontend and backend codebases, structured for easy deployment and maintainability.

---

## Technologies Used

### Frontend (`/client`)

- **React + TypeScript**: Modern, scalable, and type-safe frontend.
- **Axios**: For HTTP requests to backend APIs.
- **Bootstrap**: Quick, responsive design.
- **Context API**: State management for global app state.
- **Other Tools**: Custom hooks, layouts, and page-based routing.

### Backend (`/server`)

- **Node.js & Express**: API server and backend business logic.
- **MongoDB & Mongoose**: NoSQL database and data modeling.
- **JWT (JSON Web Token)**: Authentication for secure access.
- **CORS**: Safe integration of frontend and backend.
- **dotenv**: Manage environment variables securely.

---

## Project Structure

### Root Directory

```
BloodBankFullStack/
├── client/    # React + TypeScript frontend app
├── server/    # Node.js + Express + MongoDB backend
├── README.md
└── ...        # Other project files (e.g., .gitignore)
```
BloodBankFullStack/
├── client/                # Frontend React application (TypeScript)
│   └── client/
│       ├── src/
│       │   ├── components/        # Reusable UI components (Common, Donor, etc.)
│       │   ├── contexts/          # React context providers (Auth, Theme)
│       │   ├── hooks/             # Custom React hooks
│       │   ├── layouts/           # Application layouts and shared UI
│       │   ├── pages/             # Main pages grouped by user roles (Admin, Donor, Hospital)
│       │   ├── App.tsx            # Root component
│       │   └── ...                # Other config and setup files
│       ├── public/                # Static assets
│       ├── package.json           # Frontend dependencies and scripts
│       └── README.md              # Frontend documentation
├── server/                # Backend Node.js/Express application
│   └── src/
│       ├── config/               # App configuration (e.g., DB setup)
│       ├── controllers/          # Route handler logic
│       ├── middleware/           # Express middleware (e.g., authentication)
│       ├── models/               # Database models/schemas
│       ├── routes/               # Express route definitions
│       ├── utils/                # Utility/helper functions
│       ├── app.js                # Express app setup
│       └── server.js             # Entry point
│   ├── .env                      # Environment variables
│   ├── package.json              # Backend dependencies and scripts
│   └── README.md                 # Backend documentation
└── README.md                # Main project documentation (you are here!)

```

---

## Core Features

### User Roles

- **Admin**: Dashboard access, donor and hospital management, inventory oversight.
- **Donor**: Register, log in, manage profile, view donation history, submit surveys.
- **Hospital**: Request blood, track inventory, generate reports.

### Key Functionalities

- **Authentication**: JWT-based secure login and route protection.
- **Inventory Management**: Real-time blood stock tracking.
- **Donation Scheduling**: Donors can schedule, track, and manage appointments.
- **Admin Dashboard**: Visual stats (blood units by type, donor/hospital counts, pending requests, etc.).

---

## API Communication

- Frontend (`client/`) interacts with backend (`server/`) via RESTful API endpoints.
- All requests are authenticated (when necessary) with JWTs and managed by Axios.
- Custom Express middleware protects sensitive backend routes.

---

## Deployment

- **Frontend**: Deploy via Netlify, Vercel, or any static hosting.
- **Backend**: Deploy via Heroku, AWS, DigitalOcean, or other Node.js-friendly cloud platforms.
- **Database**: MongoDB Atlas (cloud) or local MongoDB instance.

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/MenghoutChhon/BloodBankFullStack.git
cd BloodBankFullStack
```

### 2. Set up the Backend

```bash
cd server
cp .env.example .env
npm install
npm start
```

### 3. Set up the Frontend

```bash
cd ../client
npm install
npm start
```

---

## Contribution

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE) (or your chosen license)

---

## Conclusion

The Blood Donation Management System improves transparency, simplifies blood donation administration, and offers modern, user-friendly interfaces for all stakeholders.
