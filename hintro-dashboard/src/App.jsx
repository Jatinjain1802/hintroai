/* ============================================================
   App.jsx — The root component of the application
   
   Right now it simply renders the Dashboard.
   In a larger app, you'd add React Router here to handle
   multiple pages like /dashboard, /settings, /login, etc.
   ============================================================ */

import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return <Dashboard />;
}

export default App;
