// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import About from './pages/About';
import NewConversation from './pages/New';
import ConversationHistory from './pages/History';
import Navbar from './components/Navbar';
import ProtectedRoutes from './ProtectedRoutes';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route: Login */}
        <Route path="/login" element={<AuthPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route
            path="*"
            element={
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
            }
          />
        </Route>

        {/* Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
