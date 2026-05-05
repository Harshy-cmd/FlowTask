# FlowTask

FlowTask is a full-stack productivity web application designed to help you seamlessly manage daily tasks and track long-term habits. Featuring a modern, vibrant UI and a robust Node.js backend.

## Features

- **User Authentication**: Secure JWT-based login and registration.
- **Task Management**: Create, toggle, and delete daily tasks.
- **Habit Tracking**: Build streaks by tracking daily habits over time.
- **Dynamic Dashboard**: View your progress at a glance with a clean, responsive interface.
- **Full-Stack Architecture**: React (Vite) frontend with a Node.js + Express + MongoDB backend.

## Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS, Lucide React, Axios
- **Backend**: Node.js, Express, Mongoose, JWT, bcryptjs
- **Database**: MongoDB (Atlas)

---

## Local Development

### 1. Backend Setup
1. Open a terminal and navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables. Create a `.env` file in the `server/` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<your_username>:<your_password>@cluster0...
   JWT_SECRET=your_super_secret_key
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server should now be running on http://localhost:5000*

### 2. Frontend Setup
1. Open a new terminal in the root directory (`FlowTask/`):
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables. Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The app should now be running on http://localhost:5173*

---

## Production Deployment

### 1. Deploying the Backend (Render)
Render is a great platform for hosting Node.js APIs for free.
1. Push your code to a GitHub repository.
2. Go to [Render](https://render.com/) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the following configuration:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add your Environment Variables:
   - `MONGO_URI` (Your MongoDB Atlas connection string)
   - `JWT_SECRET` (A strong random secret)
   - `JWT_EXPIRE` (e.g. `7d`)
   - `CLIENT_URL` (Your Vercel frontend URL, e.g., `https://flowtask-app.vercel.app`)
   - `NODE_ENV` = `production`
6. Deploy the service and copy the generated URL (e.g., `https://flowtask-api.onrender.com`).

### 2. Deploying the Frontend (Vercel)
Vercel provides seamless deployment for Vite/React applications.
1. Go to [Vercel](https://vercel.com/) and create a new Project.
2. Import your GitHub repository.
3. Vercel should automatically detect that it is a Vite project. If not, use:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add your Environment Variables:
   - `VITE_API_URL` (Set this to your Render backend URL + `/api`, e.g., `https://flowtask-api.onrender.com/api`)
5. Deploy!

## License

MIT