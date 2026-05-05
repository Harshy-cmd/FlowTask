<div align="center">

# 🌿 FlowTask
**Your Ultimate Full-Stack Productivity Hub**

[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

FlowTask is a beautifully designed, full-stack productivity web application built to help you seamlessly manage daily tasks and track long-term habits. Stop procrastinating and start flowing.

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Local Setup](#-local-development) • [Deployment](#-production-deployment)
</div>

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 🔒 **Secure Authentication** | JWT-based login and registration with encrypted passwords (`bcryptjs`). |
| ✅ **Task Management** | Create, complete, and delete daily tasks. Everything is synced to the cloud. |
| 📈 **Habit Tracking** | Build streaks by tracking daily habits over time to foster long-term growth. |
| 🎨 **Dynamic Dashboard** | View your overall progress at a glance with a clean, responsive, animated UI. |
| ☁️ **Cloud Native** | Full-stack architecture completely decoupled for easy serverless deployment. |

---

## 🛠 Tech Stack

### Frontend (Client)
* **Framework**: React 19 + Vite
* **Styling**: TailwindCSS
* **Icons & Charts**: Lucide React, Recharts
* **Networking**: Axios

### Backend (Server)
* **Environment**: Node.js + Express
* **Database**: MongoDB (Atlas) + Mongoose ODM
* **Security**: JSON Web Tokens (JWT), express-validator, CORS

---

## 📁 Project Structure

```text
FlowTask/
├── server/                  # Node.js Backend Environment
│   ├── src/
│   │   ├── config/          # Database connection
│   │   ├── controllers/     # Core logic (Auth, Tasks, Habits)
│   │   ├── middleware/      # JWT auth guard, Global error handling
│   │   ├── models/          # Mongoose DB Schemas
│   │   ├── routes/          # Express API route definitions
│   │   ├── app.js           # Express app configuration
│   │   └── server.js        # Backend entry point
│   └── package.json         # Backend dependencies
├── src/                     # React Frontend Environment
│   ├── components/          # Reusable UI components (Layout, ProtectedRoute)
│   ├── pages/               # Full pages (Dashboard, Login, Tasks, Habits)
│   ├── services/            # API services (Axios instance)
│   ├── store/               # Global state (AuthContext, AppContext)
│   ├── App.jsx              # React Router setup
│   └── main.jsx             # React entry point
├── public/                  # Static assets
├── package.json             # Frontend dependencies
├── tailwind.config.js       # Tailwind configuration
└── vite.config.js           # Vite configuration
```

---

## 💻 Local Development

Get up and running on your local machine in just a few minutes.

### 1. Backend Setup

Open a terminal and navigate to the `server/` directory:
```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:
```env
PORT=5000
MONGO_URI=mongodb+srv://<your_username>:<your_password>@cluster0...
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
```
*(The backend runs on `http://localhost:5000`)*

### 2. Frontend Setup

Open a new terminal in the root `FlowTask/` directory:
```bash
npm install
```

Create a `.env` file in the root folder:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```
*(The web app runs on `http://localhost:5173`)*

---

## 🚀 Production Deployment

### Step 1: Deploying the Backend (Render)
Render is a great platform for hosting Node.js APIs for free.
1. Push your code to a GitHub repository.
2. Go to [Render](https://render.com/) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the following configuration:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add your Environment Variables (`MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRE`, `NODE_ENV=production`).
6. Add `CLIENT_URL` (Set this to your Vercel frontend URL *after* you deploy it, e.g., `https://flowtask-app.vercel.app`).
7. Deploy the service and copy the generated URL (e.g., `https://flowtask-api.onrender.com`).

> **Important**: Ensure you allow access from anywhere (`0.0.0.0/0`) in your **MongoDB Atlas Network Access** settings so Render can connect to your database!

### Step 2: Deploying the Frontend (Vercel)
Vercel provides seamless deployment for Vite/React applications.
1. Go to [Vercel](https://vercel.com/) and create a new Project.
2. Import your GitHub repository.
3. Vercel should automatically detect that it is a Vite project.
4. Add your Environment Variable:
   - `VITE_API_URL`: Set this to your Render backend URL + `/api` (e.g., `https://flowtask-api.onrender.com/api`).
5. Click **Deploy**!

---
<div align="center">
<i>Built with ❤️ for productivity.</i><br>
<b>License:</b> MIT
</div>