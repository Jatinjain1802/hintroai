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

This project is built using a modern, scalable web stack designed for performance and developer experience.

| Technology | Role | Why we use it |
| :--- | :--- | :--- |
| **JavaScript (ES6+)** | Core Logic | The engine of the web. We use modern features like `async/await`, `destructuring`, and `modules`. |
| **React 19** | UI Framework | A component-based library that makes building interactive user interfaces efficient and predictable. |
| **Vite** | Build Tool | A next-generation frontend tool that provides lightning-fast Hot Module Replacement (HMR). |
| **React Router 7** | Navigation | Handles Single Page Application (SPA) routing with advanced data loading capabilities. |
| **CSS Modules** | Styling | Provides scoped CSS to prevent class name collisions, ensuring maintainable and scalable styles. |
| **Context API** | State Mgmt | A built-in React feature to share global data (like user info) without "prop drilling". |
| **Lucide React** | Iconography | A beautiful, lightweight icon library that matches our premium aesthetic. |
| **Node.js** | Environment | Used as the runtime environment for our development tools (Vite, npm). |
| **Fetch API** | Networking | Native browser API for making network requests to our mock backend. |

## 🧠 Architecture Concepts

To help you learn how these pieces fit together, here is the core logic used in this project:

1. **Component-Based UI**: Every part of the screen (Sidebar, Header, StatsCard) is a separate React component. This makes the code reusable and easy to debug.
2. **Global State (Context API)**: We use `UserContext.jsx` to store the logged-in user's information. This allows any component in the app to access the user's data without having to pass it down through multiple levels.
3. **Centralized API Layer**: All `fetch()` calls are located in `src/api/index.js`. This keeps the components clean and focused only on the UI.
4. **Custom Hooks**: We use hooks like `useDashboard` to fetch data. This separates the "Logic" (fetching data) from the "View" (rendering the dashboard).
5. **Node.js Environment**: While we don't have a backend server in this repo, we use Node.js to run **npm** (Node Package Manager) and **Vite**.

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
