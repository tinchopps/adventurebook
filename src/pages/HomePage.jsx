import React, { useState, useEffect } from 'react';
import Book from '../components/Book';
import { subscribeToPagesRealtime, getPages } from '../services/pagesService';
import { demoPages } from '../data/seedData';
import Sticker from '../components/Sticker';

/**
 * HomePage - Main book view
 */
const HomePage = () => {
  const [pages, setPages] = useState(demoPages);
  const [loading, setLoading] = useState(false);
  const [useFirebase, setUseFirebase] = useState(false);

  useEffect(() => {
    // Try to load from Firebase
    const loadPages = async () => {
      try {
        const firebasePages = await getPages();
        
        if (firebasePages.length > 0) {
          setPages(firebasePages);
          setUseFirebase(true);
        }
      } catch (error) {
        console.log('Firebase not configured, using demo data');
      }
    };

    loadPages();

    // If Firebase is available, subscribe to real-time updates
    let unsubscribe;
    if (useFirebase) {
      try {
        unsubscribe = subscribeToPagesRealtime((updatedPages) => {
          if (updatedPages.length > 0) {
            setPages(updatedPages);
          }
        });
      } catch (error) {
        console.log('Real-time subscription not available');
      }
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <Sticker type="balloon" position="topLeft" seed="loading" />
          </div>
          <p className="font-handwriting text-2xl text-kraft-light animate-pulse">
            Abriendo el libro...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-2 sm:py-4 lg:py-8 px-0 sm:px-2 lg:px-4 flex flex-col items-center justify-center">
      {/* Floating decorative elements - hidden on mobile/tablet */}
      <div className="fixed top-10 left-10 opacity-30 animate-float pointer-events-none hidden xl:block">
        <Sticker type="cloud" seed="cloud1" />
      </div>
      <div className="fixed bottom-20 right-10 opacity-20 animate-float pointer-events-none hidden xl:block" style={{ animationDelay: '1s' }}>
        <Sticker type="cloud" seed="cloud2" />
      </div>

      {/* Main book */}
      <Book pages={pages} />

      {/* Admin link - subtle */}
      <div className="fixed bottom-2 sm:bottom-4 right-2 sm:right-4">
        <a 
          href="/admin"
          className="text-kraft-light/30 hover:text-kraft-light/60 font-handwriting text-sm
            transition-colors duration-300 p-2"
        >
          ⚙️
        </a>
      </div>

      {/* Demo mode indicator - smaller on mobile */}
      {!useFirebase && (
        <div className="fixed bottom-2 sm:bottom-4 left-2 sm:left-4 text-kraft-light/40 font-handwriting text-[10px] sm:text-xs max-w-[150px] sm:max-w-none">
          <span className="hidden sm:inline">Modo demo • Configura Firebase para guardar páginas</span>
          <span className="sm:hidden">Demo</span>
        </div>
      )}
    </div>
  );
};

export default HomePage;
