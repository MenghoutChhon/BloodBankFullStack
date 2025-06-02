
# Blood Donation Management System

## Project Overview

A full-stack web application to streamline blood donations, donor management, inventory tracking, and hospital collaboration. The project is split into independent frontend and backend codebases for easy development and deployment.

---

## Technologies Used

**Frontend (`/client`):**
- **React + TypeScript**: Modern, type-safe UI development.
- **Axios**: HTTP requests to backend APIs.
- **Bootstrap**: Responsive design.
- **React Context API**: Global state management.
- **Custom Hooks & Layouts**: For modular, scalable architecture.

**Backend (`/server`):**
- **Node.js & Express**: API server and backend logic.
- **MongoDB & Mongoose**: Database and data modeling.
- **JWT**: Secure authentication.
- **CORS**: Cross-origin resource sharing.
- **dotenv**: Secure environment variable management.

---

## Project Structure

```plaintext
BloodBankFullStack/
├── client/                       # Frontend React app (TypeScript)
│   └── client/
│       ├── src/
│       │   ├── components/       # Reusable UI components (Common, Donor, etc.)
│       │   ├── contexts/         # React Context providers (Auth, Theme)
│       │   ├── hooks/            # Custom React hooks
│       │   ├── layouts/          # Shared layouts (Header, Sidebar, etc.)
│       │   ├── pages/            # Page components by user roles
│       │   ├── App.tsx           # Main app entry
│       │   └── ...               # Other setup and config files
│       ├── public/               # Static assets
│       ├── package.json          # Frontend dependencies
│       └── README.md             # Frontend documentation
├── server/                       # Backend Node.js/Express app
│   └── src/
│       ├── config/               # Configuration (e.g. DB connection)
│       ├── controllers/          # API request logic
│       ├── middleware/           # Express middleware (auth, etc.)
│       ├── models/               # Database models/schemas
│       ├── routes/               # Express routes
│       ├── utils/                # Utility/helper functions
│       ├── app.js                # Express app setup
│       └── server.js             # Backend entry point
│   ├── .env                      # Backend environment variables
│   ├── package.json              # Backend dependencies
│   └── README.md                 # Backend documentation
└── README.md                     # Main project documentation
```

---

## Core Features

### User Roles
- **Admin**: Manage donors, hospitals, inventory, and system reports.
- **Donor**: Register, log in, manage profile, view donation history, complete surveys.
- **Hospital**: Request blood, manage inventory, view/generate reports.

### Main Functionalities
- **JWT Authentication**: Secure login and protected routes.
- **Inventory Tracking**: Real-time blood stock monitoring.
- **Donation Scheduling**: Donors schedule and manage appointments.
- **Admin Dashboard**: Visual statistics (inventory, donors, requests, etc.).

---

## API Communication

- The frontend (`client/`) communicates with the backend (`server/`) via RESTful API endpoints.
- Authenticated requests use JWTs and Axios.
- Express middleware secures sensitive routes.

---

## Deployment

- **Frontend**: Deploy on Netlify, Vercel, or any static hosting platform.
- **Backend**: Deploy on Heroku, AWS, DigitalOcean, or any Node.js-friendly cloud service.
- **Database**: Use MongoDB Atlas (cloud) or a local MongoDB instance.

---

## Setup Instructions

**1. Clone the repository**
```bash
git clone https://github.com/MenghoutChhon/BloodBankFullStack.git
cd BloodBankFullStack
```

**2. Set up the Backend**
```bash
cd server
cp .env.example .env
npm install
npm start
```

**3. Set up the Frontend**
```bash
cd ../client
npm install
npm start
```

---

## Contribution

Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.

---

## License

MIT (or your chosen license)

---

## Conclusion

This system improves transparency, simplifies blood donation processes, and provides modern interfaces for admins, donors, and hospitals.  
**Questions or suggestions? Open an issue or contribute!**
