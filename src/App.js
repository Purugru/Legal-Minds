// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import About from './pages/About';
import NewConversation from './pages/New';
import ConversationHistory from './pages/History';
import Navbar from './components/Navbar';

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
      <Router>
          <Routes>
              <Route path="/login" element={<AuthPage />} />
              <Route
                  path="*"
                  element={isAuthenticated ? (
                      <>
                          <Navbar />
                          <Routes>
                              <Route path="/" element={<Home />} />
                              <Route path="/home" element={<Home />} />
                              <Route path="/about" element={<About />} />
                              <Route path="/new" element={<NewConversation />} />
                              <Route path="/history" element={<ConversationHistory />} />
                          </Routes>
                      </>
                  ) : (
                      <Navigate to="/login" />
                  )}
              />
          </Routes>
      </Router>
  );
}

export default App;