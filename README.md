# 🧠 Backend API - Analytics System

This is the backend server for the Component Analytics System. It provides authentication, tracking, statistics, and export functionalities via a RESTful API built with **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features

-  JWT-based login and register
-  Track component usage in real-time
-  Fetch statistics per component + variant
-  CSV and JSON export endpoints (protected)
-  Centralized logging and error handling
-  MongoDB Atlas ready and deployed on Render

---

## 🛠️ Tech Stack

- Node.js + Express
- MongoDB Atlas + Mongoose
- JSON Web Token (JWT)
- CORS, dotenv, bcrypt, etc.
- Hosted on Render

---

## 🧩 API Endpoints

### 🔐 Auth
- `POST /api/auth/register`  
  → Register new user  
  Body: `{ "email": string, "password": string }`

- `POST /api/auth/login`  
  → Authenticate user, returns JWT  
  Body: `{ "email": string, "password": string }`

---

### 📦 Tracking
- `POST /api/components/track`  
  → Record a component interaction  
  Body:
  ```json
  {
    "component": "Button",
    "variant": "danger",
    "action": "click"
  }
  ```

- `GET /api/components/stats`  
  → Returns aggregated interaction counts

- `GET /api/components/export?format=csv|json`  
  → Exports all tracking data (requires JWT)

---

### 🧪 Health Check
- `GET /api/health`  
  → Returns `{ status: 'ok' }`

---

## ⚙️ Environment Variables

Create a `.env` file or use `.env.example` as a reference:

```
PORT=4000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
```

---

## ▶️ How to Run Locally

1. Clone the repo:

```
git clone https://github.com/your-username/backend-repo
cd backend-repo
```

2. Install dependencies:

```
npm install
```

3. Create `.env` file:

```
cp .env.example .env
```

4. Start the server:

```
npm run dev
```

---

## 📁 Folder Structure (simplified)

- `/routes` → Express route handlers (auth, components)
- `/controllers` → Logic for each endpoint
- `/models` → Mongoose schemas (User, Tracking)
- `/middleware` → Token verification, error handling
- `/config` → MongoDB connection config
- `index.ts` → Server entry point

---

## 🛡️ Notes

- Passwords are hashed using bcrypt before storage
- JWT token is required for exporting tracking data
- IP whitelist in MongoDB Atlas must allow external access

---

## 🔗 Deployment

Currently hosted on [Render](https://render.com):

Live URL:  
`https://t1-backend-c1jz.onrender.com/api/health`

---

## 📎 License

MIT
