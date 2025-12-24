import React, { createContext, useContext, useState, useCallback } from 'react';

const LightboxContext = createContext();

export const useLightbox = () => {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider');
  }
  return context;
};

export const LightboxProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  const openLightbox = useCallback((src, alt = '') => {
    setImageSrc(src);
    setImageAlt(alt);
    setIsOpen(true);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    setImageSrc('');
    setImageAlt('');
    // Restore body scroll
    document.body.style.overflow = 'unset';
  }, []);

  return (
    <LightboxContext.Provider value={{ isOpen, imageSrc, imageAlt, openLightbox, closeLightbox }}>
      {children}
    </LightboxContext.Provider>
  );
};

export default LightboxContext;
