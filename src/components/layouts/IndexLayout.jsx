import React from 'react';
import textures from '../../styles/textures.module.css';
import Sticker from '../Sticker';
import { getSeededRotation } from '../../utils/randomUtils';

/**
 * IndexLayout - Table of contents for the Adventure Book
 * Displays all sections with page numbers
 * 
 * Content format: "Section Name:pageNum | Section Name:pageNum | ..."
 */
const IndexLayout = ({ content, stickers = [], pageId = '1', onNavigate }) => {
  // Parse sections from pipe-separated content
  // Format: "Orígenes:3 | Zona Oeste:5 | Eventos Culturales:6"
  const sections = content
    ? content.split('|').map(item => {
        const [name, page] = item.trim().split(':');
        return { name: name?.trim(), page: parseInt(page?.trim()) || 0 };
      })
    : [];

  const handleSectionClick = (pageNum) => {
    if (onNavigate && typeof pageNum === 'number') {
      onNavigate(pageNum);
    }
  };

  return (
    <div className={`
      w-full h-full 
      ${textures.kraftPaper}
      flex flex-col items-center justify-start
      p-3 sm:p-4 md:p-6 relative overflow-hidden
    `}>
      {/* Page texture overlay */}
      <div className={textures.agedPaper} style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
      
      {/* Title */}
      <h1 className="
        font-caveat text-2xl sm:text-3xl md:text-4xl 
        text-leather-dark mb-2 sm:mb-4
        relative z-10
        tracking-wide
        flex-shrink-0
      "
      style={{
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
      }}>
        ÍNDICE
      </h1>

      {/* Decorative line */}
      <div className="w-24 sm:w-32 md:w-48 h-0.5 bg-leather-burgundy/40 mb-2 sm:mb-4 relative z-10 flex-shrink-0" />

      {/* Index list - with scrollbar */}
      <div className="
        w-full max-w-md
        relative z-10
        flex-1 overflow-y-auto overflow-x-hidden
        pr-1 sm:pr-2
        scrapbook-scroll
      ">
        <div className="space-y-1 sm:space-y-2 pb-4">
          {sections.map((section, idx) => {
            const rotation = getSeededRotation(`index-${idx}`);
            return (
              <button 
                key={idx}
                onClick={() => handleSectionClick(section.page)}
                className={`
                  w-full flex items-center justify-between
                  py-1 sm:py-1.5 px-1 sm:px-2
                  border-b border-dashed border-kraft-dark/30
                  hover:bg-amber-100/50 hover:scale-[1.02]
                  transition-all duration-200 cursor-pointer
                  rounded-sm
                  group
                `}
                style={{
                  transform: `rotate(${(idx % 2 === 0 ? -0.3 : 0.3)}deg)`
                }}
              >
                {/* Section name */}
                <span className="
                  font-handwriting text-xs sm:text-sm md:text-base
                  text-gray-700 group-hover:text-leather-burgundy
                  flex-shrink-0
                  max-w-[60%]
                  truncate
                  transition-colors
                ">
                  {section.name}
                </span>
                
                {/* Dotted line filler */}
                <span className="
                  flex-1 mx-1 sm:mx-2
                  border-b border-dotted border-gray-400
                  min-w-[10px]
                " />
                
                {/* Page number */}
                <span className="
                  font-caveat text-sm sm:text-base md:text-lg
                  text-leather-burgundy group-hover:font-bold
                  min-w-[20px] sm:min-w-[25px] text-right
                  flex-shrink-0
                  transition-all
                ">
                  {section.page}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stickers */}
      {stickers.map((sticker, idx) => (
        <Sticker 
          key={idx}
          type={sticker}
          position={idx === 0 ? 'bottomRight' : idx === 1 ? 'bottomLeft' : 'topRight'}
          seed={`${pageId}-sticker-${idx}`}
        />
      ))}

      {/* Book spine shadow */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(90deg, rgba(0,0,0,0.15) 0%, transparent 100%)'
        }}
      />
    </div>
  );
};

export default IndexLayout;
