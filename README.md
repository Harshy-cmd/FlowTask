<div align="center">

<h1>
  <br/>
  🌿 FlowTask
  <br/>
</h1>

<h3>Your Full-Stack Productivity Hub — Tasks · Habits · Analytics</h3>
<p>A beautifully crafted, cloud-native web app to help you manage daily tasks and build lasting habits.</p>

<br/>

[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)]()
[![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)]()

<br/>

[✨ Features](#-features) • [🛠️ Tech Stack](#%EF%B8%8F-tech-stack) • [🏗️ Architecture](#%EF%B8%8F-architecture) • [🚀 Quick Start](#-quick-start) • [☁️ Deployment](#%EF%B8%8F-deployment)

</div>

---

## 📖 What is FlowTask?

**FlowTask** is a full-stack productivity web application with a decoupled **React frontend** and **Node.js/Express REST API** backend, backed by **MongoDB Atlas**. It gives you a single beautiful workspace to manage your to-dos, build daily habits with streaks, and visualize your progress through rich analytics — all synced to the cloud in real time.

> Stop procrastinating and start flowing. 🌊

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🔒 Authentication
| Feature | Detail |
|---------|--------|
| **Register / Login** | Secure JWT-based auth flow |
| **Password Hashing** | `bcryptjs` — plaintext never stored |
| **Protected Routes** | `ProtectedRoute` guard on all private pages |
| **Guest Mode** | Preview the app without an account |

### ✅ Task Management
| Feature | Detail |
|---------|--------|
| **Create Tasks** | Add tasks with title and details |
| **Complete / Delete** | One-click toggle & remove |
| **Cloud Sync** | All tasks persisted in MongoDB |
| **Real-Time UI** | Instant optimistic UI updates |

</td>
<td width="50%" valign="top">

### 📈 Habit Tracking
| Feature | Detail |
|---------|--------|
| **Daily Habits** | Track recurring habits every day |
| **Streak Building** | Visualize streaks to stay motivated |
| **Mark Complete** | Check off habits per day |
| **Long-term Growth** | Historical data stored in Atlas |

### 📊 Analytics Dashboard
| Feature | Detail |
|---------|--------|
| **Progress Overview** | Stat cards with task & habit summaries |
| **Visual Charts** | Recharts-powered bar & line graphs |
| **Completion Rates** | See your weekly performance at a glance |
| **Responsive Layout** | Looks great on any screen size |

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<table>
<tr>
<td width="50%" valign="top">

### 🖥️ Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI component framework |
| **Vite 8** | Lightning-fast dev server & bundler |
| **React Router v7** | Client-side page routing |
| **TailwindCSS 3** | Utility-first styling system |
| **Recharts** | Animated data visualization charts |
| **Lucide React** | Clean, consistent icon library |
| **Axios** | Promise-based HTTP client |

</td>
<td width="50%" valign="top">

### ⚙️ Backend
| Technology | Purpose |
|------------|---------|
| **Node.js 18+** | JavaScript runtime environment |
| **Express 4** | Minimal REST API framework |
| **MongoDB Atlas** | Cloud-hosted NoSQL database |
| **Mongoose** | Elegant MongoDB object modeling |
| **JSON Web Tokens** | Stateless authentication |
| **bcryptjs** | Secure password hashing |
| **express-validator** | Input validation & sanitization |
| **Morgan** | HTTP request logging middleware |
| **CORS** | Cross-origin resource sharing |

</td>
</tr>
</table>

---

## 🏗️ Architecture

> FlowTask uses a fully **decoupled** architecture — the React frontend and Node.js backend are deployed independently, communicating over a REST API.

```
┌─────────────────────────────────────────────────────────────┐
│                    BROWSER  (React 19 + Vite)               │
│   Login · Register · Dashboard · Tasks · Habits · Analytics │
│   AuthContext · AppContext · ProtectedRoute · Axios Service  │
└──────────────────────────┬──────────────────────────────────┘
                           │  HTTPS REST API
                           │  Bearer JWT Token
┌──────────────────────────▼──────────────────────────────────┐
│              NODE.JS BACKEND  (Express 4)                    │
│   /api/auth  · /api/tasks  · /api/habits                    │
│   Auth Middleware · express-validator · Morgan Logger        │
└──────────────────────────┬──────────────────────────────────┘
                           │  Mongoose ODM
┌──────────────────────────▼──────────────────────────────────┐
│                  MONGODB ATLAS  (Cloud)                      │
│            users  ·  tasks  ·  habits                       │
└─────────────────────────────────────────────────────────────┘
```

### 📁 Project Structure

<details>
<summary><strong>Click to expand full directory tree</strong></summary>

```
FlowTask/
├── server/                        # ⚙️ Node.js Backend
│   └── src/
│       ├── config/                # MongoDB connection setup
│       ├── controllers/           # Business logic
│       │   ├── authController.js  # Register, Login, Get profile
│       │   ├── taskController.js  # CRUD for tasks
│       │   └── habitController.js # CRUD + streak logic for habits
│       ├── middleware/            # JWT auth guard, error handler
│       ├── models/                # Mongoose schemas
│       │   ├── User.js            # User schema (username, email, password)
│       │   ├── Task.js            # Task schema (title, completed, owner)
│       │   └── Habit.js           # Habit schema (name, streak, completedDates)
│       ├── routes/                # Express routers
│       │   ├── auth.js            # POST /register, POST /login
│       │   ├── tasks.js           # GET / POST / PATCH / DELETE /tasks
│       │   └── habits.js          # GET / POST / PATCH / DELETE /habits
│       ├── app.js                 # Express app configuration & middleware
│       └── server.js              # Entry point — binds to PORT
│
├── src/                           # 🖥️ React Frontend
│   ├── components/
│   │   ├── Layout.jsx             # App shell: sidebar, header, nav
│   │   ├── ProtectedRoute.jsx     # Auth guard for private pages
│   │   └── GuestModal.jsx         # Guest-mode prompt
│   ├── pages/
│   │   ├── Login.jsx              # Login form
│   │   ├── Register.jsx           # Registration form
│   │   ├── Dashboard.jsx          # Overview — stat cards & recent activity
│   │   ├── Tasks.jsx              # Task list with create / complete / delete
│   │   ├── Habits.jsx             # Habit tracker with streak display
│   │   └── Analytics.jsx          # Charts & performance insights
│   ├── services/                  # Axios API instance & helpers
│   ├── store/                     # React Context (AuthContext, AppContext)
│   ├── App.jsx                    # Route definitions (React Router)
│   └── main.jsx                   # React entry point
│
├── public/                        # Static assets
├── index.html                     # Vite HTML entry point
├── tailwind.config.js             # Tailwind theme configuration
├── vite.config.js                 # Vite build configuration
├── vercel.json                    # Vercel SPA routing config
└── package.json                   # Frontend dependencies
```

</details>

### 🗃️ API Endpoints

<details>
<summary><strong>Click to expand API reference</strong></summary>

#### 🔐 Auth — `/api/auth`
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| `POST` | `/register` | Create a new user account | ❌ |
| `POST` | `/login` | Login & receive JWT token | ❌ |
| `GET` | `/me` | Get authenticated user profile | ✅ |

#### ✅ Tasks — `/api/tasks`
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| `GET` | `/` | Get all tasks for current user | ✅ |
| `POST` | `/` | Create a new task | ✅ |
| `PATCH` | `/:id` | Update / toggle task completion | ✅ |
| `DELETE` | `/:id` | Delete a task | ✅ |

#### 📈 Habits — `/api/habits`
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| `GET` | `/` | Get all habits for current user | ✅ |
| `POST` | `/` | Create a new habit | ✅ |
| `PATCH` | `/:id` | Mark habit as done for today | ✅ |
| `DELETE` | `/:id` | Delete a habit | ✅ |

</details>

---

## 🚀 Quick Start

> Get the full stack running locally in under 5 minutes.

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 18+ |
| npm | 9+ |
| MongoDB Atlas | Free tier account |

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/FlowTask.git
cd FlowTask
```

### Step 2 — Backend Setup

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/flowtask
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start the backend dev server:

```bash
npm run dev
# ✅ Backend running at http://localhost:5000
```

### Step 3 — Frontend Setup

Open a **new terminal** in the project root:

```bash
# Install frontend dependencies
npm install
```

Create a `.env` file in the **project root**:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend dev server:

```bash
npm run dev
# ✅ Frontend running at http://localhost:5173
```

> **Both servers must be running simultaneously.** Use two terminal windows or a tool like `concurrently`.

---

## ☁️ Deployment

FlowTask is designed for free-tier deployment — backend on **Render**, frontend on **Vercel**.

### Step 1 — Deploy Backend to Render

1. Push your code to a **GitHub repository**
2. Go to [render.com](https://render.com/) → **New Web Service**
3. Connect your repository and configure:

| Setting | Value |
|---------|-------|
| **Root Directory** | `server` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Node Version** | `18` |

4. Add **Environment Variables**: `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRE`, `NODE_ENV=production`
5. Set `CLIENT_URL` to your Vercel URL (add this after Step 2)
6. Deploy → copy the generated URL (e.g. `https://flowtask-api.onrender.com`)

> ⚠️ In **MongoDB Atlas → Network Access**, allow `0.0.0.0/0` so Render can connect to your database.

### Step 2 — Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com/) → **New Project**
2. Import your GitHub repository
3. Vercel auto-detects **Vite** — no build configuration needed
4. Add **Environment Variable**:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://flowtask-api.onrender.com/api` |

5. Click **Deploy** 🚀

---

## 📊 Project Statistics

<div align="center">

| 🖥️ Pages | 🧩 Components | ⚙️ API Routes | 🗃️ DB Models | 📦 npm Packages |
|:--------:|:-------------:|:-------------:|:------------:|:---------------:|
| **6** | **3** | **11** | **3** | **16** |

</div>

---

## 🔮 Future Enhancements

- [ ] **Dark Mode Toggle** — Full dark/light theme switcher
- [ ] **Recurring Task Scheduling** — Set tasks to repeat daily / weekly
- [ ] **Push Notifications** — Browser notifications for habit reminders
- [ ] **Social Sharing** — Share your habit streaks with friends
- [ ] **Mobile App** — React Native companion app
- [ ] **AI Suggestions** — Smart habit recommendations based on history
- [ ] **Team Workspaces** — Shared task boards for teams
- [ ] **Export Data** — Download tasks & habits as CSV

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License © 2026 — FlowTask
```

---

<div align="center">

Made with 💚 using **React** · **Node.js** · **MongoDB**

⭐ If FlowTask helped you stay productive, give it a **star** on GitHub!

</div>
