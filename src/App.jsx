import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Game from './components/Game';
import Profile from './components/Profile';
import Loginsinup from './components/loginsinup';
import ProtectedRoute from './components/ProtectedRoute';

// ✅ Import new game pages
import Teenpatti from './components/Teenpatti';
import Drigontiger from './components/Drigontiger';
import AndarBahar from './components/AndarBahar';

function App() {
  const [balance, setBalance] = useState(100);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route 
              path="/game" 
              element={<Game balance={balance} setBalance={setBalance} />} 
            />

            {/* ✅ Protected Profile Route */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile balance={balance} setBalance={setBalance} />
                </ProtectedRoute>
              } 
            />

            <Route path="/loginsinup" element={<Loginsinup />} />

            {/* ✅ New game routes */}
            <Route path="/teenpatti" element={<Teenpatti />} />
            <Route path="/drigontiger" element={<Drigontiger />} />
            <Route path="/andarbahar" element={<AndarBahar />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
