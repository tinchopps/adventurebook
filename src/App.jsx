import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import { LightboxProvider } from './context/LightboxContext';
import ImageLightbox from './components/ImageLightbox';
import './index.css';

function App() {
  return (
    <LightboxProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
      <ImageLightbox />
    </LightboxProvider>
  );
}

export default App;
