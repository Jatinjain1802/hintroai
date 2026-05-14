# Hintro AI Dashboard

A premium, responsive AI-powered dashboard for managing call insights, feedback, and customer interactions. Built with React, Vite, and modern CSS.

## 🚀 Live Demo
The project is deployed on Vercel. You can access it via the deployment link provided in the Vercel dashboard.

## ✨ Features
- **Smart Dashboard**: Real-time stats visualization for total sessions, average duration, AI interactions, and last session tracking.
- **Call Insights**: Detailed history of recent calls with participant tracking and duration metrics.
- **Feedback Management**: A complete feedback system with submission modals and searchable history.
- **User Context**: Seamless switching between test users (u1/u2) to simulate different account states (new vs. active).
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices with a custom hamburger menu.
- **Premium Aesthetics**: Clean dark/light mode accents, custom glassmorphism effects, and smooth transitions.
- **Mock Integration**: Fully integrated with a mock backend API for realistic data fetching.

## 🛠️ Technology Stack
- **Frontend**: React 19, Vite
- **Styling**: Vanilla CSS Modules (Design Tokens system)
- **Routing**: React Router 7
- **Icons**: Lucide React (react-icons/lu)
- **Deployment**: Vercel

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd hintro-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
VITE_API_URL=https://mock-backend-hintro.vercel.app
```

### 4. Run the development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

## 📂 Project Structure
- `src/api`: Centralized API layer using fetch.
- `src/components`: Reusable UI components (Sidebar, Header, StatsCard, etc.).
- `src/context`: Global UserContext for state management.
- `src/hooks`: Custom React hooks for data fetching (useDashboard).
- `src/pages`: Main page components (Dashboard, Login, Feedback).
- `src/assets`: Images, logos, and global static assets.

## 👥 Test Users
The application supports two mock users via the `x-user-id` header:
- **u1**: Simulates a new user (Empty state demonstration).
- **u2**: Simulates an active user (Rich data demonstration).

---
Developed by **Hintro AI Team**.
