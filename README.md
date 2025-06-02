
# Blood Donation Management System

## Project Overview

The Blood Donation Management System is a full-stack web application designed to streamline blood donations, donor management, inventory tracking, and hospital collaboration. Built to efficiently manage blood stocks and simplify the donation process, this system significantly enhances operational efficiency and accuracy.

---

## Technologies Used

### Frontend

* **React**: For dynamic and responsive UI components.
* **TypeScript**: Ensures type safety and maintainability.
* **Axios**: For HTTP requests to backend APIs.
* **Bootstrap**: Quick and responsive design.
* **Context API**: Global state management.

### Backend

* **Node.js & Express**: Robust and scalable server-side logic.
* **MongoDB & Mongoose**: NoSQL database handling.
* **JWT (JSON Web Token)**: Secure authentication.
* **CORS**: Cross-origin resource sharing for frontend-backend integration.

---

## Core Features

### User Roles

* **Admin**: Dashboard access, donor management, hospital management, inventory oversight.
* **Donor**: Registration, login, profile management, donation history, survey submission.
* **Hospital**: Request blood, inventory tracking, reporting.

### Functionalities

* **Authentication**: JWT-based secure login and protected routes.
* **Inventory Management**: Real-time monitoring and reporting of blood stock levels.
* **Donation Scheduling**: Allow donors to easily schedule and track donations.
* **Admin Dashboard**: Comprehensive statistics, including blood units by type, donor counts, and pending requests.

---

## Application Structure

### Frontend Structure

```
src/
├── components/
│   ├── Common/
│   ├── Donor/
│   ├── Admin/
│   └── Hospital/
├── contexts/
├── hooks/
├── layouts/
├── pages/
│   ├── Admin/
│   ├── Donor/
│   └── Publics/
└── App.tsx
```

### Backend Structure

```
server/
├── controllers/
├── middleware/
├── models/
├── routes/
├── config/
├── app.js
└── .env
```

---

## Communication between Frontend and Backend

* All API requests are managed through Axios with JWT tokens for security.
* RESTful API endpoints structured clearly for maintainability.
* Admin authentication and protected routes secured through custom middleware.

---

## Deployment & Environment

* Frontend hosted via static servers like Netlify or Vercel.
* Backend deployed to cloud services such as Heroku, AWS, or DigitalOcean.
* MongoDB hosted either locally or using MongoDB Atlas.

---

## Conclusion

The Blood Donation Management System enhances transparency, simplifies administration, and improves user engagement through intuitive interfaces and robust backend services. This comprehensive solution is ideal for healthcare organizations aiming to optimize blood donation processes.

---
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 91776ae37b499c1aecd6a12a73a3106cf11bd343
=======

>>>>>>> 91776ae37b499c1aecd6a12a73a3106cf11bd343
