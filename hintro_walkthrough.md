# 🚀 Hintro Frontend Assignment — Complete Walkthrough

> **Goal:** Build a React dashboard that connects to a mock backend API, matches the Figma design pixel-perfectly, and works on both desktop and mobile.

---

## 📋 Table of Contents

1. [What Are We Building?](#what-are-we-building)
2. [Tech Stack Explained](#tech-stack-explained)
3. [Folder Structure](#folder-structure)
4. [Design System](#design-system)
5. [Screens Breakdown (Figma)](#screens-breakdown)
6. [API Integration](#api-integration)
7. [Component Tree](#component-tree)
8. [State Management](#state-management)
9. [Step-by-Step Build Plan](#step-by-step-build-plan)
10. [Key React & JS Concepts You'll Learn](#key-concepts)

---

## 1. What Are We Building? {#what-are-we-building}

A **Dashboard web app** for Hintro AI — a tool that helps salespeople during live calls.

The dashboard shows:
- User profile and greeting
- Stats cards (sessions, duration, AI usage)
- Recent call history table
- Sidebar navigation
- Empty state (for new users)
- Logout modal confirmation

There are **2 test users**:

| User ID | What you see |
|---------|-------------|
| `u1` | Empty state — new user, no data |
| `u2` | Active user — randomized real-looking data |

You switch between them by sending a **request header** `x-user-id: u1` or `x-user-id: u2`.

> [!IMPORTANT]
> The backend is already built for you (mock server). Your job is 100% frontend — building the React UI that calls the API and renders the data.

---

## 2. Tech Stack Explained {#tech-stack-explained}

```
React (Vite)      → The UI framework
React Router      → Navigation between pages (if needed)
Axios / Fetch     → Calling the API
CSS Modules       → Scoped, clean styles
```

### Why Vite instead of Create React App?

Vite is **much faster**. It starts the dev server in under 1 second. CRA takes 15-30 seconds. You'll use:

```bash
npx create-vite@latest hintro-dashboard -- --template react
cd hintro-dashboard
npm install
npm run dev
```

### Why CSS Modules?

With CSS Modules, each component gets its own `.module.css` file. The class names are **auto-scoped** so they never conflict with other components:

```jsx
// Button.module.css
.button { background: blue; }

// Button.jsx
import styles from './Button.module.css';
<button className={styles.button}>Click</button>
```

---

## 3. Folder Structure {#folder-structure}

```
src/
├── api/
│   └── index.js           ← All API calls in one place
├── components/
│   ├── Sidebar/
│   │   ├── Sidebar.jsx
│   │   └── Sidebar.module.css
│   ├── StatsCard/
│   │   ├── StatsCard.jsx
│   │   └── StatsCard.module.css
│   ├── RecentCalls/
│   │   ├── RecentCalls.jsx
│   │   └── RecentCalls.module.css
│   ├── LogoutModal/
│   │   ├── LogoutModal.jsx
│   │   └── LogoutModal.module.css
│   └── EmptyState/
│       ├── EmptyState.jsx
│       └── EmptyState.module.css
├── pages/
│   └── Dashboard/
│       ├── Dashboard.jsx
│       └── Dashboard.module.css
├── hooks/
│   └── useDashboard.js    ← Custom hook for API data
├── utils/
│   └── formatters.js      ← Duration / date formatting helpers
├── App.jsx
├── main.jsx
└── index.css              ← Global styles + CSS variables
```

> [!NOTE]
> This structure separates **concerns**: API calls, UI components, pages, and utilities each live in their own folder. This is the professional way to structure React projects.

---

## 4. Design System {#design-system}

All design tokens go in `index.css` as **CSS custom properties (variables)**:

```css
:root {
  /* Colors */
  --color-primary:     #1B4ED1;   /* Blue — buttons, active states */
  --color-primary-hover: #1a44b8; /* Darker blue on hover */
  --color-bg:          #F9FAFB;   /* Page background — light gray */
  --color-surface:     #FFFFFF;   /* Cards, sidebar — pure white */
  --color-border:      #E5E7EB;   /* Dividers, card borders */
  --color-text-primary: #111827;  /* Main heading text */
  --color-text-secondary: #6B7280;/* Subtext, labels */
  --color-accent-purple: #7C3AED; /* Upgrade card */

  /* Typography */
  --font-family: 'Inter', sans-serif;
  --font-size-xs:  12px;
  --font-size-sm:  14px;
  --font-size-md:  16px;
  --font-size-lg:  20px;
  --font-size-xl:  24px;
  --font-size-2xl: 32px;

  /* Spacing */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  32px;

  /* Borders */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 16px;

  /* Shadows */
  --shadow-card: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-modal: 0 20px 60px rgba(0,0,0,0.15);
}
```

> [!TIP]
> Using CSS variables means you can change the entire color palette in one place. This is exactly how professional design systems (like Material UI, Ant Design) work internally.

---

## 5. Screens Breakdown {#screens-breakdown}

The Figma has **8 frames total** — 4 desktop + 4 mobile:

### Desktop Frame 1: `dashboard` (populated)

```
┌─────────────────────────────────────────────────────┐
│ SIDEBAR (240px)     │  MAIN CONTENT                 │
│                     │                               │
│  Hintro logo        │  Hi, John 👋 Welcome to Hintro│
│  ──────────         │  [Start New Call]  ←── button │
│  Dashboard ←active  │                               │
│  Call Insights      │  ┌──────┐┌──────┐┌──────┐┌───┐│
│  Knowledge Base     │  │Total ││Avg   ││AI    ││Last││
│  Prompts            │  │Sess. ││Dur.  ││Used  ││Sess││
│  Busy Contacts      │  └──────┘└──────┘└──────┘└───┘│
│  ──────────         │                               │
│  Feedback History   │  Recent Calls                 │
│  Settings           │  ┌───────────────────────────┐│
│  Log out            │  │ Design Call  | Apr 29 | 1h ││
│                     │  │ Sales Call   | Apr 27 | 45m││
│  [Upgrade Card]     │  └───────────────────────────┘│
└─────────────────────────────────────────────────────┘
```

### Desktop Frame 2: `dashboard/empty state`

Same layout, but:
- Stats cards show `0` / `—`
- Recent Calls section replaced by a centered illustration + message:
  > *"No Recent Calls. Analyze and track your performance with Hintro."*

### Desktop Frame 3: `dashboard/log out`

- Sidebar `Log out` item appears highlighted/active
- Everything else grayed out (modal is about to appear)

### Desktop Frame 4: `logout modal`

A centered overlay dialog:
```
┌─────────────────────────┐
│      Leaving already?   │
│                         │
│  Are you sure you want  │
│  to log out?            │
│                         │
│  [Cancel]   [Log out]   │
└─────────────────────────┘
```

### Mobile Frames (×4)

Same states but the sidebar becomes a **hamburger menu** that slides in from the left. Stats go from 4-column → 2×2 grid.

---

## 6. API Integration {#api-integration}

### Base URL

The mock server runs at `http://localhost:3001` (or a provided hosted URL).

### Endpoints You'll Call

| Endpoint | What it returns |
|----------|----------------|
| `GET /api/auth/profile` | User name, email, status |
| `GET /api/auth/dashboard` | User + subscription + usage stats |
| `GET /api/call-sessions/stats` | totalSessions, avgDuration, AI interactions |
| `GET /api/call-sessions?limit=10` | List of recent calls with pagination |

### The Header Pattern

Every request **must** include:
```
x-user-id: u1   (or u2)
```

### `src/api/index.js` — Your API Layer

```javascript
// This is where ALL network calls live.
// Never call fetch() directly from a component!

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// A helper function that adds the user header to every request
async function apiFetch(endpoint, userId = 'u1') {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'x-user-id': userId,
      'Content-Type': 'application/json',
    },
  });

  // If the server returns an error (4xx, 5xx), throw it
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json(); // Parse JSON automatically
}

// Named exports for each endpoint
export const getProfile = (userId) => apiFetch('/api/auth/profile', userId);
export const getDashboard = (userId) => apiFetch('/api/auth/dashboard', userId);
export const getCallStats = (userId) => apiFetch('/api/call-sessions/stats', userId);
export const getCallHistory = (userId, limit = 10) =>
  apiFetch(`/api/call-sessions?limit=${limit}`, userId);
```

> [!NOTE]
> **Why a separate API file?** If the URL changes, or you need to add auth tokens later, you only change ONE file — not every component. This is called the **Single Responsibility Principle**.

---

## 7. Component Tree {#component-tree}

```
App
└── Dashboard (page)
    ├── Sidebar
    │   ├── NavItem (×5 main links)
    │   ├── NavItem (×3 footer links — Feedback, Settings, Logout)
    │   └── UpgradeCard
    ├── MainContent
    │   ├── Header
    │   │   ├── Greeting (user name from profile API)
    │   │   └── StartCallButton
    │   ├── StatsGrid
    │   │   └── StatsCard ×4
    │   │       • Total Sessions
    │   │       • Average Duration
    │   │       • AI Used
    │   │       • Last Session
    │   └── RecentCalls (or EmptyState)
    │       └── CallRow ×N
    └── LogoutModal (shown conditionally)
```

### How Components Communicate

```
Dashboard (parent) holds all state
    │
    ├─ passes `profile` prop → Header
    ├─ passes `stats` prop  → StatsGrid
    ├─ passes `calls` prop  → RecentCalls
    └─ passes `isOpen` + `onClose` + `onConfirm` → LogoutModal
```

---

## 8. State Management {#state-management}

You'll use **React's built-in hooks** — no Redux needed for this size.

### State that lives in Dashboard:

```javascript
const [userId, setUserId] = useState('u2');       // which test user
const [profile, setProfile] = useState(null);     // from /profile
const [stats, setStats] = useState(null);         // from /stats
const [calls, setCalls] = useState([]);           // from /call-sessions
const [loading, setLoading] = useState(true);     // show skeleton/spinner
const [error, setError] = useState(null);         // show error message
const [logoutOpen, setLogoutOpen] = useState(false); // modal visibility
```

### Custom Hook: `useDashboard.js`

```javascript
// This hook fetches all data needed by the dashboard.
// Hooks are just functions that use React state/effects.

import { useState, useEffect } from 'react';
import { getProfile, getCallStats, getCallHistory } from '../api';

export function useDashboard(userId) {
  const [data, setData] = useState({ profile: null, stats: null, calls: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // useEffect runs after the component renders.
    // The [userId] dependency means: re-run if userId changes.
    
    setLoading(true);
    setError(null);

    // Promise.all fires all 3 requests SIMULTANEOUSLY (faster!)
    Promise.all([
      getProfile(userId),
      getCallStats(userId),
      getCallHistory(userId, 10),
    ])
      .then(([profile, stats, callsData]) => {
        setData({
          profile,
          stats,
          calls: callsData.callSessions,
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

  }, [userId]); // ← dependency array

  return { ...data, loading, error };
}
```

> [!TIP]
> `Promise.all([...])` is a JavaScript feature that runs multiple async operations in **parallel**. Instead of waiting 300ms + 300ms + 300ms = 900ms, you wait ~300ms total. Always use this when requests don't depend on each other.

---

## 9. Step-by-Step Build Plan {#step-by-step-build-plan}

### Phase 1 — Setup (Day 1)
- [ ] Create Vite React project
- [ ] Install dependencies: `react-router-dom` (if needed)
- [ ] Set up `index.css` with all CSS variables
- [ ] Set up Google Fonts (Inter) in `index.html`
- [ ] Create the folder structure

### Phase 2 — Static Layout (Day 1-2)
- [ ] Build `Sidebar` component with all nav items (hardcoded, no logic)
- [ ] Build page shell: sidebar left + main content right
- [ ] Add `Header` with hardcoded name and "Start New Call" button
- [ ] Build `StatsCard` component (static props)
- [ ] Lay out 4 StatsCards in a grid
- [ ] Build `RecentCalls` table with hardcoded rows

### Phase 3 — API Integration (Day 2-3)
- [ ] Create `src/api/index.js` with all fetch functions
- [ ] Create `useDashboard` custom hook
- [ ] Wire `Dashboard` component to the hook
- [ ] Replace all hardcoded data with real API data
- [ ] Add loading skeleton states
- [ ] Add error state handling

### Phase 4 — Empty State & Interactions (Day 3)
- [ ] Detect when `calls.length === 0` → show `EmptyState` component
- [ ] Build `LogoutModal` component
- [ ] Wire "Log out" sidebar click → open modal
- [ ] Wire "Cancel" → close modal, "Log out" → actually log out (or reset state)

### Phase 5 — Mobile Responsive (Day 4)
- [ ] Add hamburger menu button on mobile (`< 768px`)
- [ ] Sidebar becomes slide-in overlay on mobile
- [ ] Stats grid: 4-col → 2×2 grid on mobile
- [ ] Recent calls table → simplified card list on very small screens

### Phase 6 — Polish (Day 4-5)
- [ ] Add hover effects on nav items, buttons, call rows
- [ ] Smooth modal open/close animation (CSS transitions)
- [ ] Format durations: `3871 seconds` → `1h 4m 31s`
- [ ] Format dates: ISO string → `"2 days ago"` or `Apr 29`
- [ ] User switcher UI (for dev testing — a small toggle for u1/u2)
- [ ] Test with both u1 and u2

---

## 10. Key React & JS Concepts You'll Learn {#key-concepts}

### JavaScript Concepts

| Concept | Where You'll Use It |
|---------|---------------------|
| `async/await` | Inside `apiFetch()` for cleaner async code |
| `Promise.all()` | Fetching profile + stats + calls simultaneously |
| Template literals | Building URL strings: `` `/api/call-sessions?limit=${limit}` `` |
| Destructuring | `const { profile, stats, calls } = useDashboard(userId)` |
| Optional chaining | `stats?.totalSessions ?? 0` — safe access on null |
| Arrow functions | `calls.map((call) => <CallRow key={call._id} data={call} />)` |
| Array methods | `.map()`, `.filter()`, `.length` for rendering lists |

### React Concepts

| Concept | Where You'll Use It |
|---------|---------------------|
| `useState` | Loading state, modal open/close, userId toggle |
| `useEffect` | Trigger API fetch when component mounts or userId changes |
| Custom Hooks | `useDashboard()` — reusable data-fetching logic |
| Props | Passing data from Dashboard → StatsCard, → CallRow |
| Conditional rendering | `{calls.length === 0 ? <EmptyState /> : <RecentCalls />}` |
| Key prop | `calls.map(c => <CallRow key={c._id} ... />)` — list identity |
| Event handlers | `onClick={() => setLogoutOpen(true)}` |
| CSS Modules | Per-component scoped styles |

### Formatting Helpers (`utils/formatters.js`)

```javascript
// Convert seconds to human-readable duration
export function formatDuration(seconds) {
  if (!seconds || seconds === 0) return '—';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

// Convert ISO date string to "X days ago"
export function timeAgo(dateString) {
  if (!dateString) return '—';
  const diff = Date.now() - new Date(dateString).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

// Format ISO date to "Apr 29"
export function formatDate(dateString) {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
```

---

## Evaluation Checklist (What They're Looking For)

| Requirement | Details |
|-------------|---------|
| ✅ Pixel-perfect Figma match | Colors, spacing, layout match the Figma design |
| ✅ API integration | All 4 endpoints called correctly with `x-user-id` header |
| ✅ u1 empty state | When no data, show empty state illustration + message |
| ✅ u2 populated state | Real data renders in stats cards and call history table |
| ✅ Logout modal | Clicking "Log out" shows modal, Cancel/Confirm work |
| ✅ Mobile responsive | Works on 390px screens, sidebar becomes slide-in |
| ✅ Loading states | Skeleton or spinner while data is fetching |
| ✅ Error handling | Shows something meaningful if API fails |
| ✅ Clean code | Component separation, no logic in JSX, named functions |
| ✅ README | How to run, env vars, user switching instructions |

> [!IMPORTANT]
> The **most important** thing evaluators look for: Does it match Figma? Does it handle both u1 and u2 correctly? Is the code clean and organized?

---

## Quick Reference

### Mock Server Users
```
x-user-id: u1  → Empty state (new user)
x-user-id: u2  → Populated (active user, random data)
```

### All API Endpoints
```
GET /health
GET /api/auth/profile
GET /api/auth/dashboard
GET /api/call-sessions/stats
GET /api/call-sessions?limit=10
```

### Figma Design
```
https://www.figma.com/design/jtzv2E5cRbBDwdy3vKwJsm/Frontend-Assignment?node-id=0-1
```

### Frames in Figma
1. `dashboard/empty state` — u1 view
2. `dashboard` — u2 populated view
3. `dashboard/log out` — logout highlight
4. `logout modal` — confirmation dialog
5-8. Mobile versions of all the above
