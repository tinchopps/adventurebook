import React, { useEffect } from 'react';
import { useLightbox } from '../context/LightboxContext';
import { transformDriveLink } from '../utils/driveHelper';
import textures from '../styles/textures.module.css';

/**
 * ImageLightbox - Cute scrapbook-style lightbox for viewing photos
 * Features: polaroid frame, washi tape decorations, heart stickers
 */
const ImageLightbox = () => {
  const { isOpen, imageSrc, imageAlt, closeLightbox } = useLightbox();

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeLightbox]);

  if (!isOpen) return null;

  const transformedSrc = transformDriveLink(imageSrc);

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      onClick={closeLightbox}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Lightbox Container */}
      <div 
        className="relative max-w-4xl max-h-[90vh] animate-bounce-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cute Polaroid Frame */}
        <div className={`
          relative bg-white p-3 md:p-5 pb-12 md:pb-16 rounded-sm
          shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300
        `}>
          
          {/* Washi Tape Top Left */}
          <div className="absolute -top-3 -left-2 w-16 md:w-20 h-6 md:h-8 bg-washi-pink/80 
            rotate-[-15deg] shadow-sm z-10"
            style={{
              background: 'repeating-linear-gradient(45deg, rgba(255,182,193,0.8), rgba(255,182,193,0.8) 10px, rgba(255,192,203,0.9) 10px, rgba(255,192,203,0.9) 20px)'
            }}
          />
          
          {/* Washi Tape Top Right */}
          <div className="absolute -top-2 -right-3 w-16 md:w-20 h-6 md:h-8 bg-washi-mint/80 
            rotate-[12deg] shadow-sm z-10"
            style={{
              background: 'repeating-linear-gradient(-45deg, rgba(152,251,152,0.7), rgba(152,251,152,0.7) 10px, rgba(144,238,144,0.8) 10px, rgba(144,238,144,0.8) 20px)'
            }}
          />

          {/* Heart sticker decoration */}
          <div className="absolute -bottom-4 -right-4 w-12 h-12 md:w-16 md:h-16 z-20 animate-pulse">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-lg">
              <path 
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                fill="#FF6B8A"
                stroke="#FF4D6D"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          {/* Small star decoration */}
          <div className="absolute top-2 right-12 w-6 h-6 md:w-8 md:h-8 z-20">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path 
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                fill="#FFD700"
                stroke="#FFA500"
                strokeWidth="0.3"
              />
            </svg>
          </div>

          {/* Photo container with tape texture border */}
          <div className="relative bg-kraft-light/30 p-1">
            <img
              src={transformedSrc}
              alt={imageAlt}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[60vh] md:max-h-[70vh] w-auto h-auto object-contain mx-auto block"
            />
          </div>

          {/* Caption area with handwriting style */}
          {imageAlt && (
            <div className="absolute bottom-2 md:bottom-4 left-0 right-0 text-center">
              <p className="font-caveat text-lg md:text-xl text-kraft-dark/70 px-4 truncate">
                {imageAlt}
              </p>
            </div>
          )}

          {/* Corner decoration - flower doodle */}
          <div className="absolute -bottom-2 -left-2 w-10 h-10 md:w-12 md:h-12 z-20">
            <svg viewBox="0 0 40 40" className="w-full h-full">
              {/* Simple flower */}
              <circle cx="20" cy="20" r="4" fill="#FFB6C1"/>
              <circle cx="20" cy="12" r="5" fill="#FFC0CB" opacity="0.8"/>
              <circle cx="27" cy="17" r="5" fill="#FFB6C1" opacity="0.8"/>
              <circle cx="25" cy="26" r="5" fill="#FFC0CB" opacity="0.8"/>
              <circle cx="15" cy="26" r="5" fill="#FFB6C1" opacity="0.8"/>
              <circle cx="13" cy="17" r="5" fill="#FFC0CB" opacity="0.8"/>
              <circle cx="20" cy="20" r="3" fill="#FFD700"/>
            </svg>
          </div>
        </div>

        {/* Close Button - cute X */}
        <button
          onClick={closeLightbox}
          className="absolute -top-4 -right-4 w-10 h-10 md:w-12 md:h-12 
            bg-white rounded-full shadow-lg 
            flex items-center justify-center
            hover:bg-red-50 hover:scale-110 
            transition-all duration-200
            border-2 border-washi-pink/50
            group z-30"
          aria-label="Cerrar"
        >
          <svg 
            className="w-5 h-5 md:w-6 md:h-6 text-kraft-dark/70 group-hover:text-red-400 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* CSS for bounce animation */}
      <style>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3) rotate(-10deg);
          }
          50% {
            transform: scale(1.05) rotate(2deg);
          }
          70% {
            transform: scale(0.95) rotate(-1deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(1deg);
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </div>
  );
};

export default ImageLightbox;
