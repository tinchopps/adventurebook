import React from 'react';
import styles from '../styles/stickers.module.css';
import { getSeededRotation } from '../utils/randomUtils';

/**
 * Balloon bundle SVG - inspired by Up movie
 */
const BalloonSVG = () => (
  <svg viewBox="0 0 100 140" className="w-full h-full">
    {/* Balloon strings */}
    <path d="M50 140 Q45 100 35 85" stroke="#666" strokeWidth="0.5" fill="none"/>
    <path d="M50 140 Q50 100 50 85" stroke="#666" strokeWidth="0.5" fill="none"/>
    <path d="M50 140 Q55 100 65 85" stroke="#666" strokeWidth="0.5" fill="none"/>
    <path d="M50 140 Q48 100 40 80" stroke="#666" strokeWidth="0.5" fill="none"/>
    <path d="M50 140 Q52 100 60 80" stroke="#666" strokeWidth="0.5" fill="none"/>
    
    {/* Balloons */}
    <ellipse cx="30" cy="30" rx="18" ry="22" fill="#e74c3c"/>
    <ellipse cx="30" cy="30" rx="18" ry="22" fill="url(#balloonShine)" opacity="0.3"/>
    
    <ellipse cx="55" cy="25" rx="16" ry="20" fill="#3498db"/>
    <ellipse cx="55" cy="25" rx="16" ry="20" fill="url(#balloonShine)" opacity="0.3"/>
    
    <ellipse cx="75" cy="35" rx="14" ry="18" fill="#f1c40f"/>
    <ellipse cx="75" cy="35" rx="14" ry="18" fill="url(#balloonShine)" opacity="0.3"/>
    
    <ellipse cx="40" cy="50" rx="15" ry="19" fill="#9b59b6"/>
    <ellipse cx="40" cy="50" rx="15" ry="19" fill="url(#balloonShine)" opacity="0.3"/>
    
    <ellipse cx="65" cy="55" rx="17" ry="21" fill="#2ecc71"/>
    <ellipse cx="65" cy="55" rx="17" ry="21" fill="url(#balloonShine)" opacity="0.3"/>
    
    <ellipse cx="25" cy="55" rx="13" ry="16" fill="#e67e22"/>
    <ellipse cx="25" cy="55" rx="13" ry="16" fill="url(#balloonShine)" opacity="0.3"/>
    
    <ellipse cx="50" cy="15" rx="12" ry="15" fill="#1abc9c"/>
    <ellipse cx="50" cy="15" rx="12" ry="15" fill="url(#balloonShine)" opacity="0.3"/>
    
    {/* Balloon ties */}
    <path d="M30 52 L30 58 L28 55 L32 55 Z" fill="#c0392b"/>
    <path d="M55 45 L55 51 L53 48 L57 48 Z" fill="#2980b9"/>
    <path d="M75 53 L75 59 L73 56 L77 56 Z" fill="#d4a300"/>
    <path d="M40 69 L40 75 L38 72 L42 72 Z" fill="#8e44ad"/>
    <path d="M65 76 L65 82 L63 79 L67 79 Z" fill="#27ae60"/>
    
    <defs>
      <radialGradient id="balloonShine" cx="30%" cy="30%">
        <stop offset="0%" stopColor="white"/>
        <stop offset="100%" stopColor="transparent"/>
      </radialGradient>
    </defs>
  </svg>
);

/**
 * Sticker Component - Renders decorative elements
 */
const Sticker = ({ type, position = 'topRight', seed = 'default' }) => {
  const rotation = getSeededRotation(seed + type);
  
  const positionStyles = {
    topLeft: { top: '5px', left: '5px' },
    topRight: { top: '5px', right: '5px' },
    bottomLeft: { bottom: '5px', left: '5px' },
    bottomRight: { bottom: '5px', right: '5px' },
    centerTop: { top: '10px', left: '50%', transform: 'translateX(-50%)' },
  };

  const renderSticker = () => {
    switch (type) {
      case 'balloon':
        return (
          <div className={`${styles.sticker} ${styles.balloonSticker} ${rotation}`}>
            <BalloonSVG />
          </div>
        );
      
      case 'grape_soda':
        return (
          <div className={`${styles.sticker} ${styles.grapeSodaBadge} ${rotation}`}>
            <span>Ellie<br/>Badge</span>
          </div>
        );
      
      case 'stamp_travel':
        return (
          <div className={`${styles.sticker} ${styles.travelStamp} ${rotation}`} />
        );
      
      case 'heart':
        return (
          <div className={`${styles.sticker} ${styles.heartSticker} ${rotation}`}>
            ❤️
          </div>
        );
      
      case 'star':
        return (
          <div className={`${styles.sticker} ${styles.starSticker} ${rotation}`}>
            ⭐
          </div>
        );
      
      case 'cloud':
        return (
          <div className={`${styles.sticker} ${styles.cloudSticker} ${rotation}`} />
        );
      
      case 'compass':
        return (
          <div className={`${styles.sticker} ${styles.compassSticker} ${rotation}`}>
            🧭
          </div>
        );
      
      case 'arrow':
        return (
          <div className={`${styles.sticker} ${styles.arrowSticker} ${rotation}`}>
            ➤
          </div>
        );

      case 'capybara':
        return (
          <div className={`${styles.sticker} ${styles.capybaraSticker} ${rotation}`}>
            🦫
          </div>
        );

      case 'russell':
        return (
          <div className={`${styles.sticker} ${styles.russellBadge} ${rotation}`}>
            <span>🏕️</span>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div style={{ ...positionStyles[position], position: 'absolute', zIndex: 25 }}>
      {renderSticker()}
    </div>
  );
};

export default Sticker;
