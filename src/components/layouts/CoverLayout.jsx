import React from 'react';
import textures from '../../styles/textures.module.css';
import Sticker from '../Sticker';

/**
 * CoverLayout - Leather-textured book cover with "cut-out" letters
 */
const CoverLayout = ({ content, stickers = [] }) => {
  const title = content || 'NUESTRO LIBRO DE AVENTURAS';
  
  // Split title into words for styling
  const words = title.split(' ');

  return (
    <div className={`
      w-full h-full 
      ${textures.leatherTexture}
      flex flex-col items-center justify-center
      p-8 relative overflow-hidden
      rounded-r-lg
    `}>
      {/* Decorative border */}
      <div className="absolute inset-4 border-2 border-amber-600/30 rounded-lg pointer-events-none" />
      <div className="absolute inset-6 border border-amber-500/20 rounded-lg pointer-events-none" />
      
      {/* Title container */}
      <div className="relative z-10 text-center px-3 sm:px-4">
        {words.map((word, index) => (
          <div 
            key={index}
            className={`
              font-caveat font-bold
              text-amber-100/95
              tracking-wide
              ${word.length > 8 
                ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl' 
                : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
              }
              mb-1 sm:mb-2
              drop-shadow-lg
              ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}
            `}
            style={{
              textShadow: `
                2px 2px 0 rgba(74, 28, 33, 0.8),
                4px 4px 8px rgba(0,0,0,0.5),
                0 0 20px rgba(255, 215, 0, 0.1)
              `,
              letterSpacing: '0.05em'
            }}
          >
            {word}
          </div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-16 h-1 bg-amber-600/40 rounded-full" />
      </div>

      {/* Book binding simulation on the left edge */}
      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
      
      {/* Corner decorations */}
      <div className="absolute top-4 left-8 w-8 h-8 border-t-2 border-l-2 border-amber-600/40 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-600/40 rounded-tr-lg" />
      <div className="absolute bottom-4 left-8 w-8 h-8 border-b-2 border-l-2 border-amber-600/40 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-600/40 rounded-br-lg" />

      {/* Stickers */}
      {stickers.map((sticker, idx) => (
        <Sticker 
          key={idx}
          type={sticker}
          position={idx === 0 ? 'bottomRight' : 'topLeft'}
          seed={`cover-${idx}`}
        />
      ))}

      {/* Default balloon sticker if no stickers specified */}
      {stickers.length === 0 && (
        <Sticker type="balloon" position="bottomRight" seed="cover-balloon" />
      )}
    </div>
  );
};

export default CoverLayout;
