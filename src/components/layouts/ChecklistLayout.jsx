import React, { useState } from 'react';
import textures from '../../styles/textures.module.css';
import Sticker from '../Sticker';
import { getSeededRotation } from '../../utils/randomUtils';

/**
 * ChecklistLayout - Hand-drawn todo list with checkable items
 */
const ChecklistLayout = ({ content, stickers = [], pageId = '1' }) => {
  // Parse items from content or use defaults
  const parseItems = () => {
    if (!content) return defaultItems;
    
    // If content is a string with items separated by | or newlines
    if (typeof content === 'string') {
      const separator = content.includes('|') ? '|' : '\n';
      return content.split(separator).map((item, idx) => ({
        id: idx,
        text: item.trim(),
        checked: false
      }));
    }
    
    return defaultItems;
  };

  const defaultItems = [
    { id: 1, text: 'Ver auroras boreales', checked: false },
    { id: 2, text: 'Adoptar una mascota', checked: false },
    { id: 3, text: 'Viajar a un lugar nuevo juntos', checked: false },
    { id: 4, text: 'Aprender algo nuevo juntos', checked: false },
    { id: 5, text: 'Envejecer juntos', checked: false },
  ];

  const [items, setItems] = useState(parseItems());

  const toggleItem = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div className={`
      w-full h-full 
      ${textures.kraftPaper}
      flex flex-col items-center justify-start
      p-3 sm:p-4 md:p-6 relative overflow-hidden
    `}>
      {/* Page texture */}
      <div className={textures.agedPaper} style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      {/* Title */}
      <div className={`
        relative z-10 mb-2 sm:mb-4 md:mb-6 text-center flex-shrink-0
        ${getSeededRotation(pageId + '-title')}
      `}>
        <h2 className="font-caveat text-lg sm:text-2xl md:text-3xl text-leather-burgundy font-bold px-2">
          COSAS POR HACER JUNTOS
        </h2>
        <div className="mt-1 w-3/4 mx-auto h-0.5 bg-leather-burgundy/30" 
          style={{ 
            clipPath: 'polygon(0% 50%, 5% 0%, 10% 60%, 20% 20%, 30% 80%, 40% 10%, 50% 90%, 60% 30%, 70% 70%, 80% 20%, 90% 60%, 95% 10%, 100% 50%)' 
          }} 
        />
      </div>

      {/* Checklist - with scrollbar */}
      <div className="relative z-10 w-full max-w-md flex-1 overflow-y-auto overflow-x-hidden px-1 sm:px-2 scrapbook-scroll">
        <div className="space-y-1.5 sm:space-y-3 pb-4">
          {items.map((item, idx) => (
            <div 
              key={item.id}
              className={`
                flex items-start gap-2 sm:gap-3 p-1.5 sm:p-2
                ${textures.notePaper}
                rounded-sm
                ${getSeededRotation(`${pageId}-item-${idx}`)}
                cursor-pointer
                transform hover:scale-[1.02] transition-all duration-200
                hover:shadow-lg
              `}
              onClick={() => toggleItem(item.id)}
            >
              {/* Hand-drawn checkbox */}
              <div className={`
                ${textures.handDrawnCheck}
                ${item.checked ? 'bg-green-50' : 'bg-white'}
                flex-shrink-0 mt-0.5
                transition-colors duration-200
                w-4 h-4 sm:w-5 sm:h-5
              `}>
                {item.checked && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-600 text-sm sm:text-lg font-bold rotate-6">
                    ✓
                  </span>
                )}
              </div>

              {/* Item text */}
              <p className={`
                font-handwriting text-xs sm:text-sm md:text-base text-gray-700
                ${item.checked ? 'line-through text-gray-400' : ''}
                transition-all duration-200
              `}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative doodle */}
      <div className="absolute bottom-8 right-8 opacity-20">
        <svg width="60" height="60" viewBox="0 0 60 60" className="text-leather-burgundy">
          <path 
            d="M30 5 Q35 25 55 30 Q35 35 30 55 Q25 35 5 30 Q25 25 30 5Z" 
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Stickers */}
      {stickers.map((sticker, idx) => (
        <Sticker 
          key={idx}
          type={sticker}
          position={['topRight', 'bottomLeft'][idx % 2]}
          seed={`checklist-${pageId}-${idx}`}
        />
      ))}

      {/* Book spine shadow */}
      <div className={textures.spineGradient} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '30px' }} />
    </div>
  );
};

export default ChecklistLayout;
