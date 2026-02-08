 # 🏥 Hospital-Appointment-Booking-System

A full-stack Hospital Appointment Management System built using the MERN stack.
This application supports role-based access for Patients, Doctors, and Admin, allowing seamless appointment booking and management.

## 🚀 Features
### 👤 Patient

Signup & Login

View available doctors

Book appointments

View all booked appointments

Cancel appointments

### 👨‍⚕️ Doctor

Secure login

View assigned appointments

Accept or Reject appointments

Appointment status updates in real time

### 🧑‍💼 Admin

View all doctors

Remove doctors

View all appointments

Centralized system control

## 🛠️ Tech Stack
### Frontend

React (Vite)

Tailwind CSS

React Router

Axios

### Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

bcrypt

## 📂 Project Structure
AK_Hospital/
│
├── backend/
│   ├── model/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   ├── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│
└── README.md

## 🔐 Authentication & Roles

JWT based authentication

Cookies used for session handling

Role based access:

Patient

Doctor

Admin

## ⚙️ Environment Variables (Backend)

Create a .env file inside backend/
```

PORT=8002
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
```

## ▶️ Running the Project
### Backend
```
cd backend
npm install
npm run dev
```

* Backend runs on:

http://localhost:8002

### Frontend
```
cd frontend
npm install
npm run dev
```


* Frontend runs on:

http://localhost:5173

## 🔗 API Proxy (Vite)
```
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8002',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}
```
## 📌 Key Pages

/login

/signup

/user – Patient Dashboard

/doctor – Doctor Dashboard

/admin – Admin Dashboard

/my-appointments


## 🔒 Security

Password hashing with bcrypt

JWT authentication

Role-based route protection

HTTP-only cookies

## 📈 Future Enhancements

Add doctor availability slots

Email notifications

Admin analytics dashboard

Pagination & search

Appointment reminders

## 👩‍💻 Author

Kanya
B.Sc Computer Science Graduate
MERN Stack Developer

## 📜 License

This project is for educational purposes.
