// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProductDetailPage from './pages/ProductDetailPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/product' element={<ProductDetailPage/>}/>
        {/* Add more routes here as you build other pages */}
      </Routes>
    </Router>
  );
};

export default App;
