# Secure File Vault

A full-stack MERN application that allows users to securely upload, store, and share files with encryption and controlled access.

---

## Features

* JWT-based authentication (login and registration)
* AES file encryption before storage
* Secure file uploads using Multer
* User-based access control
* Public and private file visibility options
* Shareable links with optional expiry
* File dashboard displaying size, upload date, and download count
* Protected API routes with middleware

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (authentication)
* Multer (file upload)
* Crypto (encryption)

### Frontend

* React.js
* Axios
* React Router

---

## Project Structure

backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
└── server.js

frontend/
├── components/
├── pages/
├── services/
└── context/

---

## Security Features

* Password hashing using bcrypt with salt
* AES-256 encryption for files
* Token-based authentication using JWT
* Protected routes using middleware

---

## API Endpoints

### Authentication

* POST /api/auth/register
* POST /api/auth/login

### Files

* POST /api/files/upload
* GET /api/files
* GET /api/files/:id
* DELETE /api/files/:id

### Sharing

* GET /api/files/share/:token

---

## Installation

```bash
git clone https://github.com/your-username/secure-file-vault.git

cd backend
npm install

cd ../frontend
npm install
```

---

## Running the Application

```bash
cd backend
npm run dev

cd frontend
npm start
```

---

## Deployment

* Frontend: Vercel or Netlify
* Backend: Render or Railway
* Database: MongoDB Atlas

---

## Screenshots

Add screenshots of the user interface here.

---

## Author

Niranjan R Soorej

---


