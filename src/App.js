import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/pages/Home/Home';
import Tradefinance from './components/pages/Tradefinance/Tradefinance';
import LPOFinancing from './components/pages/LPOFinancing/LPOFinancing';
import ContactForm from './components/pages/Tradefinance/ContactForm/ContactForm';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tradefinance" element={<Tradefinance />} />
          <Route path="/LPOFinancing" element={<LPOFinancing />} />
          <Route path="/contactform" element={<ContactForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
