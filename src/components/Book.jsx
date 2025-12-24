import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Page from './Page';
import textures from '../styles/textures.module.css';

/**
 * Book Component - Main flipbook with 3D page turn animation
 * Mobile: Single page view, almost full width
 * Desktop: Two-page spread like a real open book
 */
const Book = ({ pages = [] }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTwoPageView, setIsTwoPageView] = useState(false);

  // Check for desktop/two-page view
  useEffect(() => {
    const checkViewMode = () => {
      setIsTwoPageView(window.innerWidth >= 1024);
    };
    
    checkViewMode();
    window.addEventListener('resize', checkViewMode);
    return () => window.removeEventListener('resize', checkViewMode);
  }, []);

  // Sort pages by order
  const sortedPages = [...pages].sort((a, b) => a.order - b.order);
  const totalPages = sortedPages.length;

  // Navigate to a specific page by order number
  const navigateToPageByOrder = useCallback((pageOrder) => {
    // Find the index in sortedPages that matches this order
    const targetIndex = sortedPages.findIndex(p => p.order === pageOrder);
    if (targetIndex !== -1 && targetIndex !== currentPage && !isAnimating) {
      setDirection(targetIndex > currentPage ? 1 : -1);
      setIsAnimating(true);
      
      // In two-page view, adjust to correct spread
      if (isTwoPageView && targetIndex > 0) {
        // Land on odd index for proper spread display
        const adjustedIndex = targetIndex % 2 === 0 ? targetIndex - 1 : targetIndex;
        setCurrentPage(Math.max(1, adjustedIndex));
      } else {
        setCurrentPage(targetIndex);
      }
      
      setTimeout(() => setIsAnimating(false), 700);
    }
  }, [sortedPages, currentPage, isAnimating, isTwoPageView]);
  
  // In two-page view, we navigate by pairs (except first page which is alone like a cover)
  const getSpreadIndex = () => {
    if (!isTwoPageView) return currentPage;
    // Page 0 is alone (cover), then pages go in pairs: [1,2], [3,4], etc.
    if (currentPage === 0) return 0;
    return Math.floor((currentPage + 1) / 2);
  };

  const getTotalSpreads = () => {
    if (!isTwoPageView) return totalPages;
    // 1 for cover + pairs for the rest
    return 1 + Math.ceil((totalPages - 1) / 2);
  };
  
  // Touch/Swipe handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        goToNextPage();
      } else {
        goToPrevPage();
      }
    }
  };

  const goToNextPage = () => {
    if (isAnimating) return;
    
    if (isTwoPageView) {
      // In two-page view, skip by 2 (except from cover)
      const nextPage = currentPage === 0 ? 1 : currentPage + 2;
      if (nextPage < totalPages) {
        setDirection(1);
        setIsAnimating(true);
        setCurrentPage(nextPage);
        // Safety timeout to reset animation state
        setTimeout(() => setIsAnimating(false), 700);
      }
    } else {
      if (currentPage < totalPages - 1) {
        setDirection(1);
        setIsAnimating(true);
        setCurrentPage(prev => prev + 1);
        setTimeout(() => setIsAnimating(false), 700);
      }
    }
  };

  const goToPrevPage = () => {
    if (isAnimating) return;
    
    if (isTwoPageView) {
      // In two-page view, go back by 2 (or to cover)
      const prevPage = currentPage <= 2 ? 0 : currentPage - 2;
      if (currentPage > 0) {
        setDirection(-1);
        setIsAnimating(true);
        setCurrentPage(prevPage);
        setTimeout(() => setIsAnimating(false), 700);
      }
    } else {
      if (currentPage > 0) {
        setDirection(-1);
        setIsAnimating(true);
        setCurrentPage(prev => prev - 1);
        setTimeout(() => setIsAnimating(false), 700);
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isAnimating, isTwoPageView]);

  // Page flip animation variants
  const pageVariants = {
    enter: (direction) => ({
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const pageTransition = {
    type: "tween",
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1],
  };

  if (sortedPages.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-kraft-light font-handwriting text-xl">
        Cargando aventuras...
      </div>
    );
  }

  // Get the pages to display
  const leftPage = isTwoPageView && currentPage > 0 ? sortedPages[currentPage] : null;
  const rightPage = isTwoPageView && currentPage > 0 && currentPage + 1 < totalPages 
    ? sortedPages[currentPage + 1] 
    : null;
  const singlePage = sortedPages[currentPage];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-1 sm:px-2 lg:px-4">
      {/* Book container with 3D perspective */}
      <div 
        className="relative mx-auto"
        style={{ 
          perspective: '2500px',
          perspectiveOrigin: 'center center'
        }}
      >
        {/* Book shadow */}
        <div 
          className="absolute -bottom-3 sm:-bottom-4 lg:-bottom-6 left-1/2 transform -translate-x-1/2 w-[98%] h-4 sm:h-6 lg:h-10 bg-black/30 rounded-full blur-xl"
        />

        {/* Book wrapper */}
        <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* TWO-PAGE SPREAD VIEW (Desktop) */}
          {isTwoPageView && currentPage > 0 ? (
            <div 
              className="relative flex shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Left page */}
              <div 
                className="relative bg-kraft overflow-hidden"
                style={{ 
                  aspectRatio: '3/4',
                  width: '45vw',
                  maxWidth: '500px',
                  minHeight: '500px',
                  maxHeight: '80vh',
                }}
              >
                <AnimatePresence 
                  initial={false} 
                  custom={direction}
                  mode="wait"
                  onExitComplete={() => setIsAnimating(false)}
                >
                  <motion.div
                    key={`left-${currentPage}`}
                    custom={direction}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={pageTransition}
                    className="absolute inset-0"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'right center',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    {leftPage && <Page page={leftPage} isActive={true} onNavigate={navigateToPageByOrder} />}
                  </motion.div>
                </AnimatePresence>
                
                {/* Book spine shadow on left page */}
                <div 
                  className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to left, rgba(0,0,0,0.15) 0%, transparent 100%)'
                  }}
                />
              </div>

              {/* Center spine */}
              <div 
                className={`
                  w-3 ${textures.leatherTexture}
                  relative z-10
                `}
                style={{
                  boxShadow: '0 0 15px rgba(0,0,0,0.4)'
                }}
              />

              {/* Right page */}
              <div 
                className="relative bg-kraft rounded-r-lg overflow-hidden"
                style={{ 
                  aspectRatio: '3/4',
                  width: '45vw',
                  maxWidth: '500px',
                  minHeight: '500px',
                  maxHeight: '80vh',
                }}
              >
                <AnimatePresence 
                  initial={false} 
                  custom={direction}
                  mode="wait"
                >
                  <motion.div
                    key={`right-${currentPage + 1}`}
                    custom={direction}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={pageTransition}
                    className="absolute inset-0"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'left center',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    {rightPage ? (
                      <Page page={rightPage} isActive={true} onNavigate={navigateToPageByOrder} />
                    ) : (
                      <div className={`w-full h-full ${textures.kraftPaper} flex items-center justify-center`}>
                        <span className="font-handwriting text-kraft-dark/30 text-xl">...</span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                
                {/* Book spine shadow on right page */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to right, rgba(0,0,0,0.12) 0%, transparent 100%)'
                  }}
                />
              </div>

              {/* Book binding/spine on left */}
              <div 
                className={`
                  absolute left-0 top-0 bottom-0 w-6
                  ${textures.leatherTexture}
                  rounded-l-md
                  transform -translate-x-full
                `}
                style={{
                  boxShadow: 'inset -5px 0 10px rgba(0,0,0,0.3)'
                }}
              />
            </div>
          ) : (
            /* SINGLE PAGE VIEW (Mobile or Cover) */
            <div 
              className={`
                relative bg-kraft overflow-hidden shadow-2xl touch-pan-y
                ${currentPage === 0 ? 'rounded-r-lg' : 'rounded-lg'}
              `}
              style={{ 
                aspectRatio: '3/4',
                width: isTwoPageView ? '45vw' : '95vw',
                maxWidth: isTwoPageView ? '500px' : '400px',
                minHeight: isTwoPageView ? '500px' : 'min(450px, 75vh)',
                maxHeight: isTwoPageView ? '80vh' : '85vh',
                transformStyle: 'preserve-3d',
                transformOrigin: 'left center',
                margin: '0 auto',
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence 
                initial={false} 
                custom={direction}
                mode="wait"
                onExitComplete={() => setIsAnimating(false)}
              >
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={pageTransition}
                  className="absolute inset-0"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'left center',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <Page 
                    page={singlePage} 
                    isActive={true}
                    onNavigate={navigateToPageByOrder}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Page edge effect */}
              <div 
                className="absolute right-0 top-0 bottom-0 w-2 pointer-events-none"
                style={{
                  background: 'linear-gradient(to left, rgba(0,0,0,0.1) 0%, transparent 100%)'
                }}
              />
              
              {/* Book binding/spine */}
              {currentPage === 0 && (
                <div 
                  className={`
                    absolute left-0 top-0 bottom-0 w-6 sm:w-8
                    ${textures.leatherTexture}
                    rounded-l-md
                    transform -translate-x-full
                  `}
                  style={{
                    boxShadow: 'inset -5px 0 10px rgba(0,0,0,0.3)'
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* Navigation arrows - responsive positioning */}
        {/* Previous page arrow */}
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 0 || isAnimating}
          className={`
            absolute top-1/2 transform -translate-y-1/2
            left-0 -translate-x-2 sm:-translate-x-4 lg:-translate-x-16
            w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full
            bg-leather-burgundy/90 hover:bg-leather-burgundy
            text-amber-100 text-lg sm:text-xl lg:text-2xl
            flex items-center justify-center
            transition-all duration-300
            ${currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 hover:scale-110'}
            shadow-lg z-50
            focus:outline-none focus:ring-2 focus:ring-amber-300
          `}
          aria-label="Página anterior"
        >
          ‹
        </button>

        {/* Next page arrow */}
        <button
          onClick={goToNextPage}
          disabled={(isTwoPageView ? currentPage + 2 >= totalPages : currentPage === totalPages - 1) || isAnimating}
          className={`
            absolute top-1/2 transform -translate-y-1/2
            right-0 translate-x-2 sm:translate-x-4 lg:translate-x-16
            w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full
            bg-leather-burgundy/90 hover:bg-leather-burgundy
            text-amber-100 text-lg sm:text-xl lg:text-2xl
            flex items-center justify-center
            transition-all duration-300
            ${(isTwoPageView ? currentPage + 2 >= totalPages : currentPage === totalPages - 1) 
              ? 'opacity-30 cursor-not-allowed' 
              : 'opacity-100 hover:scale-110'}
            shadow-lg z-50
            focus:outline-none focus:ring-2 focus:ring-amber-300
          `}
          aria-label="Página siguiente"
        >
          ›
        </button>
      </div>

      {/* Page indicator - simplified for mobile */}
      <div className="mt-3 sm:mt-6 lg:mt-8 flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap max-w-[280px] sm:max-w-sm lg:max-w-none mx-auto">
        {sortedPages.map((_, idx) => {
          // In two-page view, highlight pairs
          const isActive = isTwoPageView 
            ? (currentPage === 0 && idx === 0) || (currentPage > 0 && (idx === currentPage || idx === currentPage + 1))
            : idx === currentPage;
          
          return (
            <button
              key={idx}
              onClick={() => {
                if (!isAnimating) {
                  setDirection(idx > currentPage ? 1 : -1);
                  setIsAnimating(true);
                  // In two-page view, navigate to correct spread
                  if (isTwoPageView && idx > 0) {
                    // Make sure we land on odd page number for proper spread
                    setCurrentPage(idx % 2 === 0 ? idx - 1 : idx);
                  } else {
                    setCurrentPage(idx);
                  }
                  // Safety timeout
                  setTimeout(() => setIsAnimating(false), 700);
                }
              }}
              className={`
                w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 rounded-full transition-all duration-300
                ${isActive 
                  ? 'bg-leather-burgundy scale-125' 
                  : 'bg-kraft-dark/40 hover:bg-kraft-dark/60'
                }
                focus:outline-none focus:ring-1 focus:ring-amber-300
              `}
              aria-label={`Ir a página ${idx + 1}`}
            />
          );
        })}
      </div>

      {/* Page number display */}
      <div className="mt-1 sm:mt-2 lg:mt-3 text-center font-handwriting text-kraft-light/70 text-sm sm:text-base lg:text-lg">
        {isTwoPageView && currentPage > 0 
          ? `${currentPage + 1}${rightPage ? ` - ${currentPage + 2}` : ''} / ${totalPages}`
          : `${currentPage + 1} / ${totalPages}`
        }
      </div>

      {/* Navigation hint */}
      <div className="mt-0.5 sm:mt-1 text-center font-handwriting text-kraft-light/40 text-[10px] sm:text-xs">
        <span className="hidden sm:inline">Usa ← → o haz clic para navegar</span>
        <span className="sm:hidden">Desliza o toca las flechas</span>
      </div>
    </div>
  );
};

export default Book;
