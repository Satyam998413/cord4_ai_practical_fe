import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import AIDashboard from './pages/AIDashboard';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
             <Route path="/ai" element={<AIDashboard />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App; 