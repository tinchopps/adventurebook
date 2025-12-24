import React from 'react';
import textures from '../../styles/textures.module.css';
import Sticker from '../Sticker';
import { getSeededRotation } from '../../utils/randomUtils';

/**
 * QuoteLayout - Centered emotional quote with decorative typography
 */
const QuoteLayout = ({ content, stickers = [], pageId = '1' }) => {
  const quote = content || 'El amor es la mejor aventura';

  // Highlight certain words
  const highlightWords = ['AVENTURA', 'MUNDO', 'AMOR', 'SIEMPRE', 'JUNTOS', 'TODO'];
  
  const renderQuote = () => {
    const words = quote.split(' ');
    return words.map((word, idx) => {
      const cleanWord = word.toUpperCase().replace(/[.,!?¡¿]/g, '');
      const isHighlighted = highlightWords.includes(cleanWord);
      const punctuation = word.match(/[.,!?¡¿]/g)?.join('') || '';
      const baseWord = word.replace(/[.,!?¡¿]/g, '');
      
      return (
        <span key={idx}>
          <span className={`
            ${isHighlighted 
              ? 'text-leather-burgundy font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl' 
              : 'text-amber-900/90 text-base sm:text-lg md:text-xl lg:text-2xl'
            }
            ${getSeededRotation(pageId + idx)}
            inline-block mx-0.5
            transition-transform hover:scale-110
          `}
          style={{
            textShadow: isHighlighted 
              ? '2px 2px 4px rgba(0,0,0,0.2)' 
              : '1px 1px 2px rgba(0,0,0,0.1)'
          }}
          >
            {baseWord}
          </span>
          {punctuation && <span className="text-amber-900/90">{punctuation}</span>}
          {' '}
        </span>
      );
    });
  };

  return (
    <div className={`
      w-full h-full 
      ${textures.agedPaper}
      flex flex-col items-center justify-center
      p-3 sm:p-6 md:p-8 relative overflow-hidden
    `}>
      {/* Decorative corner flourishes */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 text-xl sm:text-3xl text-leather-burgundy/20 font-serif">"</div>
      <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-xl sm:text-3xl text-leather-burgundy/20 font-serif rotate-180">"</div>

      {/* Main quote container */}
      <div className="relative z-10 max-w-md text-center px-2 sm:px-4">
        {/* Quote text */}
        <blockquote className="font-caveat leading-relaxed">
          {renderQuote()}
        </blockquote>

        {/* Decorative underline */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-8 h-0.5 bg-leather-burgundy/30 rounded-full" />
          <span className="text-leather-burgundy/50">♥</span>
          <div className="w-8 h-0.5 bg-leather-burgundy/30 rounded-full" />
        </div>
      </div>

      {/* Background decorative elements */}
      <div 
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #722F37 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #722F37 0%, transparent 70%)' }}
      />

      {/* Stickers */}
      {stickers.map((sticker, idx) => (
        <Sticker 
          key={idx}
          type={sticker}
          position={['bottomRight', 'topLeft', 'bottomLeft', 'topRight'][idx % 4]}
          seed={`quote-${pageId}-${idx}`}
        />
      ))}

      {/* Book spine shadow */}
      <div className={textures.spineGradient} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '30px' }} />
    </div>
  );
};

export default QuoteLayout;
