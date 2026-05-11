/* ============================================================
   src/hooks/useDashboard.js — Custom React Hook
   
   WHAT IS A HOOK?
   A hook is just a regular JavaScript function that:
   1. Starts with the word "use" (naming convention)
   2. Can call other React hooks (useState, useEffect, etc.)
   
   WHY MAKE A CUSTOM HOOK?
   It extracts the data-fetching logic OUT of the component.
   Your Dashboard component stays clean — it just reads data
   from the hook instead of doing all the fetch work itself.
   This also makes the hook reusable in other components.
   ============================================================ */

import { useState, useEffect } from 'react';
import { getProfile, getCallStats, getCallHistory } from '../api';

/**
 * useDashboard — Fetches all dashboard data for a given user.
 * 
 * @param {string} userId - "u1" or "u2"
 * @returns {{ profile, stats, calls, loading, error }}
 */
export function useDashboard(userId) {
  // useState returns [currentValue, setterFunction]
  // We use null/[] as initial values — data isn't loaded yet
  const [profile, setProfile] = useState(null);
  const [stats, setStats]     = useState(null);
  const [calls, setCalls]     = useState([]);
  const [loading, setLoading] = useState(true);   // Start as true — we're fetching
  const [error, setError]     = useState(null);

  /* ----------------------------------------------------------
     useEffect — Side Effects in React
     
     "Side effects" = anything that reaches outside React:
     API calls, timers, localStorage, document title changes...
     
     Syntax: useEffect(callback, [dependencies])
     
     The dependency array [userId] means:
     "Run this effect when the component first mounts,
      AND re-run it whenever `userId` changes."
     
     Empty array [] = run once on mount only.
     No array = run on EVERY render (usually a bug!).
  ---------------------------------------------------------- */
  useEffect(() => {
    // Inner async function — we can't make useEffect itself async
    // because useEffect's return value must be a cleanup function,
    // not a Promise.
    async function fetchDashboardData() {
      // Reset state before fetching (important when userId changes)
      setLoading(true);
      setError(null);

      try {
        /* --------------------------------------------------------
           Promise.all([...]) — Parallel Requests
           
           This fires ALL 3 requests at the SAME TIME.
           Result: wait ~300ms instead of 300+300+300 = 900ms.
           
           It returns an array of results in the SAME ORDER
           as the input array, so we destructure it:
           [profileData, statsData, callsData]
        -------------------------------------------------------- */
        const [profileData, statsData, callsData] = await Promise.all([
          getProfile(userId),
          getCallStats(userId),
          getCallHistory(userId, 10),
        ]);

        // Update state with the fetched data
        setProfile(profileData);
        setStats(statsData);
        setCalls(callsData.callSessions);   // The list is nested inside callSessions

      } catch (err) {
        // If ANY of the 3 requests fail, catch it here
        // err.message is the string we threw in apiFetch()
        setError(err.message || 'Something went wrong. Please try again.');
      } finally {
        /* --------------------------------------------------------
           finally block — Runs ALWAYS, whether try succeeded or
           catch was triggered. Perfect for cleanup like setLoading.
           Without finally, if an error occurs, loading stays true
           forever and the spinner never goes away!
        -------------------------------------------------------- */
        setLoading(false);
      }
    }

    fetchDashboardData(); // Call the async function

  }, [userId]); // Re-run whenever userId changes

  // Return all the state values as an object.
  // The component that calls this hook destructures what it needs.
  return { profile, stats, calls, loading, error };
}
