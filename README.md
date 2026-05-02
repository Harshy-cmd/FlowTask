# 🌿 FlowTask — Your Productivity Hub

A sleek, all-in-one productivity app for managing tasks, building habits, and tracking your progress — all in one beautiful interface.

![FlowTask](https://img.shields.io/badge/FlowTask-v1.0.0-064734?style=for-the-badge&labelColor=E0FFC2)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## ✨ Features

### 📋 Tasks
- Add, complete, and delete tasks with a clean modal form
- Filter by **category** (Work, Health, Learning, Personal) and **priority** (High, Medium, Low)
- Search tasks in real time
- **Today** and **Upcoming** tabs auto-filtered by the current date
- Toggle completed tasks visibility

### 🔁 Habits
- Track daily habits with streak counters and 14-day heatmap history
- Mark habits done with a single tap — streaks update instantly
- Add new habits via a modal with emoji picker and category selection
- Weekly bar chart overview and per-habit completion rates

### 📊 Analytics
- Overall productivity score combining task and habit completion
- Interactive charts: Weekly bar chart, Focus time area chart, Monthly trend, Category pie chart
- Smart insights: Best focus hours, top performing days, streak highlights
- Habit streak leaderboard

### 🗂️ Dashboard
- Personalized greeting with an animated progress bar
- Quick stats: tasks done, habits done, best streak
- Checklist preview of upcoming tasks (clickable to toggle)
- Habits snapshot with quick links to every section

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v3 |
| Charts | Recharts v3 |
| Icons | Lucide React |
| State | React Context API (custom `AppProvider`) |
| Font | Inter (Google Fonts) |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/flowtask.git
cd flowtask

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be live at **http://localhost:5173**

---

## 📦 Build for Production

```bash
npm run build
```

This outputs optimized static files to the `dist/` folder, ready to deploy to any static host.

---

## 🌐 Deployment (Vercel — Recommended)

FlowTask is deployed on **Vercel**. A `vercel.json` is already included in the repo — it handles SPA routing automatically so refreshing `/tasks`, `/habits`, or any route never returns a 404.

### Deploy in 3 steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "ready for deployment"
   git push origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click **"Import Git Repository"** → select your repo
   - Vercel auto-detects Vite — **no build settings needed**
   - Click **Deploy** ✅

3. **Done!** Your live URL will be `https://flowtask-xxx.vercel.app`

### Other platforms

| Platform | Notes |
|---|---|
| **Netlify** | Add `public/_redirects` → `/* /index.html 200` |
| **GitHub Pages** | Set `base` in `vite.config.js`, deploy the `dist/` folder |


---

## 📁 Project Structure

```
flowtask/
├── index.html              # HTML entry with SEO meta tags
├── package.json
├── vite.config.js
├── tailwind.config.js
└── src/
    ├── main.jsx            # React root mount
    ├── App.jsx             # Router setup
    ├── index.css           # Global styles + Tailwind + animations
    ├── components/
    │   └── Layout.jsx      # Sidebar, header, mobile menu
    ├── pages/
    │   ├── Dashboard.jsx   # Overview + quick stats
    │   ├── Tasks.jsx       # Full task manager
    │   ├── Habits.jsx      # Habit tracker
    │   └── Analytics.jsx   # Charts and insights
    └── store/
        └── appStore.jsx    # Global state (Context API)
```

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| Primary Dark | `#064734` | Text, sidebar, buttons |
| Primary Mid | `#0a6b4e` | Hover states, accents |
| Background | `#E0FFC2` | App background, cards |

---

## 🐛 Known Limitations

- Data is **in-memory only** — refreshing the page resets state. Persistence (localStorage or a backend) is not yet implemented.
- The Analytics page uses **demo/static chart data** — charts are not wired to real task/habit history.
- Dates in the sample tasks are from April 2026 (demo data); the "Today" and "Upcoming" filters use the **real current date**.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — feel free to use, modify, and distribute.

---

> Built with 💚 by the FlowTask team
3; 