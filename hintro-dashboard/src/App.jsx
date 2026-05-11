/* ============================================================
   App.jsx — The root component of the application
   
   Right now it simply renders the Dashboard.
   In a larger app, you'd add React Router here to handle
   multiple pages like /dashboard, /settings, /login, etc.
   ============================================================ */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import FeedbackPage from './pages/Feedback/Feedback';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
        {/* Landing page is Login */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Main application pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        
        {/* Redirect empty path to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
