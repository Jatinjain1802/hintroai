/* ============================================================
   UserContext.jsx — Global State Management
   
   WHAT IS CONTEXT?
   Context provides a way to pass data through the component tree
   without having to pass props down manually at every level (prop drilling).
   
   WHY USE IT HERE?
   The `userId` (u1 vs u2) needs to be known by the Dashboard, 
   the Feedback page, and the API calls. Storing it here makes
   it accessible everywhere.
   ============================================================ */

import { createContext, useContext, useState } from 'react';

// 1. Create the Context object
const UserContext = createContext();

// 2. Create a Provider component
export function UserProvider({ children }) {
  const [userId, setUserId] = useState('u2'); // Default to active user

  const toggleUser = (id) => {
    setUserId(id);
  };

  // The value prop contains everything we want to share
  return (
    <UserContext.Provider value={{ userId, setUserId, toggleUser }}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Create a custom hook for easy access
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
