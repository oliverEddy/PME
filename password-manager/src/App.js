// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Passwords from './pages/Passwords';
import Account from './pages/Account';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar'; // Import NavBar component

function App() {
  return (
    <Router>
      <div>
        <NavBar /> {/* Render the NavBar component outside of the Routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/passwords"
            element={
              <PrivateRoute>
                <Passwords />
              </PrivateRoute>
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
