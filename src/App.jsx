// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';

// Pages
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import NoticePage from './pages/NoticePage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/notices" />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/notices" element={<NoticePage />} />
            <Route path="*" element={<Navigate to="/notices" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;