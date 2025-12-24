import React from 'react';
import textures from '../styles/textures.module.css';

/**
 * SkeletonLoader - Placeholder while images load from Google Drive
 */
const SkeletonLoader = ({ className = '', aspectRatio = '4/3' }) => {
  return (
    <div 
      className={`${textures.skeletonPulse} rounded-sm ${className}`}
      style={{ 
        aspectRatio,
        width: '100%',
        backgroundColor: 'rgba(180, 170, 150, 0.4)'
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <svg 
          className="w-12 h-12 text-kraft-dark/30 animate-pulse" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>
      </div>
    </div>
  );
};

export default SkeletonLoader;
