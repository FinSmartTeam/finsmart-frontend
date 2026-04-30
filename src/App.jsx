import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
  // status: 'landing' | 'auth' | 'dashboard'
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div className="min-h-screen bg-base-dark">
      {currentPage === 'landing' && (
        <LandingPage onStart={() => setCurrentPage('auth')} />
      )}

      {currentPage === 'auth' && (
        <Auth onAuthSuccess={() => setCurrentPage('dashboard')} />
      )}

      {currentPage === 'dashboard' && (
        <Dashboard />
      )}
    </div>
  );
}

export default App;