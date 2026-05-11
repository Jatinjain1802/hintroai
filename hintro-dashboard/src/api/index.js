/* ============================================================
   src/api/index.js — Centralized API Layer
   
   WHY: All network calls live in one place.
   If the base URL changes, or you need to add auth tokens,
   you only change this ONE file — not every component.
   This is called the "Single Responsibility Principle".
   ============================================================ */

// Base URL comes from .env file (VITE_API_URL).
// If not set, falls back to localhost:3001 (mock server).
// In React/Vite, env variables must start with VITE_
// .replace(/\/$/, '') strips any trailing slash so we never get //api/...
const BASE_URL = (
  import.meta.env.VITE_API_URL || "https://mock-backend-hintro.vercel.app"
).replace(/\/$/, "");

/**
 * apiFetch — A wrapper around the native fetch() API.
 *
 * @param {string} endpoint  - The API path, e.g. "/api/auth/profile"
 * @param {string} userId    - "u1" (empty) or "u2" (has data)
 * @returns {Promise<any>}   - Resolves with the parsed JSON response
 *
 * CONCEPT: async/await
 * Instead of .then().catch() chains, async/await lets you write
 * async code that LOOKS synchronous — much easier to read.
 */
async function apiFetch(endpoint, userId = "u2") {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      // This header tells the mock server WHICH test user to use.
      // u1 = new user (empty data), u2 = active user (has data)
      "x-user-id": userId,
      "Content-Type": "application/json",
    },
  });

  // If the HTTP status is 4xx or 5xx, fetch() does NOT throw.
  // We manually check response.ok (true if status is 200-299)
  if (!response.ok) {
    throw new Error(`API Error ${response.status}: ${response.statusText}`);
  }

  // .json() is also async — it reads the body and parses JSON
  return response.json();
}

/* ============================================================
   Named exports — one function per API endpoint.
   Using named exports means you can import only what you need:
   import { getProfile, getCallStats } from '../api';
   ============================================================ */

/**
 * Fetch the user's profile data.
 * Returns: { id, email, firstName, lastName, status, ... }
 */
export const getProfile = (userId) => apiFetch("/api/auth/profile", userId);

/**
 * Fetch dashboard data: user + subscription + usage stats.
 * Returns: { user, subscription, usage: { kb_files, vocab_terms, notes } }
 */
export const getDashboard = (userId) => apiFetch("/api/auth/dashboard", userId);

/**
 * Fetch call session statistics summary.
 * Returns: { totalSessions, averageDuration, totalAIInteractions, lastSession }
 */
export const getCallStats = (userId) =>
  apiFetch("/api/call-sessions/stats", userId);

/**
 * Fetch recent call sessions (paginated list).
 * @param {number} limit - How many sessions to return (default: 10)
 * Returns: { callSessions: [...], pagination: { page, limit, totalCount, ... } }
 */
export const getCallHistory = (userId, limit = 10) =>
  apiFetch(`/api/call-sessions?limit=${limit}`, userId);
