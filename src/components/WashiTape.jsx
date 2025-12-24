import React from 'react';
import { getSeededRotation } from '../utils/randomUtils';

/**
 * WashiTape - Decorative tape element for attaching photos/notes
 */
const WashiTape = ({ 
  color = 'pink', 
  rotation = 'random',
  width = '80px',
  seed = 'tape',
  position = 'top',
  className = ''
}) => {
  const colors = {
    pink: 'bg-washi-pink',
    mint: 'bg-washi-mint', 
    cream: 'bg-washi-cream',
    blue: 'bg-washi-blue',
  };

  const rotationClass = rotation === 'random' 
    ? getSeededRotation(seed) 
    : rotation;

  const positionStyles = {
    top: { top: '-8px', left: '50%', transform: 'translateX(-50%)' },
    topLeft: { top: '-6px', left: '-10px' },
    topRight: { top: '-6px', right: '-10px' },
    bottom: { bottom: '-8px', left: '50%', transform: 'translateX(-50%)' },
    bottomLeft: { bottom: '-6px', left: '-10px' },
    bottomRight: { bottom: '-6px', right: '-10px' },
  };

  return (
    <div 
      className={`
        absolute z-30
        ${rotationClass}
        ${className}
      `}
      style={{
        ...positionStyles[position],
        width,
        height: '20px',
        backgroundColor: colors[color] === 'bg-washi-pink' ? 'rgba(248, 180, 196, 0.55)' :
                         colors[color] === 'bg-washi-mint' ? 'rgba(168, 216, 200, 0.55)' :
                         colors[color] === 'bg-washi-cream' ? 'rgba(245, 230, 200, 0.55)' :
                         colors[color] === 'bg-washi-blue' ? 'rgba(168, 200, 216, 0.55)' :
                         'rgba(248, 180, 196, 0.55)',
        clipPath: 'polygon(0% 2%, 3% 0%, 8% 3%, 15% 0%, 22% 2%, 30% 0%, 38% 3%, 45% 0%, 52% 2%, 60% 0%, 68% 3%, 75% 0%, 82% 2%, 90% 0%, 95% 3%, 100% 0%, 100% 98%, 97% 100%, 92% 97%, 85% 100%, 78% 98%, 70% 100%, 62% 97%, 55% 100%, 48% 98%, 40% 100%, 32% 97%, 25% 100%, 18% 98%, 10% 100%, 5% 97%, 0% 100%)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2), inset 0 0 8px rgba(255,255,255,0.3)',
        backdropFilter: 'blur(0.5px)',
        WebkitBackdropFilter: 'blur(0.5px)',
        borderLeft: '1px dashed rgba(0,0,0,0.08)',
        borderRight: '1px dashed rgba(0,0,0,0.08)',
      }}
    >
      {/* Tape texture overlay - fibrous look */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.25) 2px,
              rgba(255,255,255,0.25) 4px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 4px,
              rgba(255,255,255,0.1) 4px,
              rgba(255,255,255,0.1) 5px
            )
          `,
          opacity: 0.6
        }}
      />
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};

export default WashiTape;
