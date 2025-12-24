import React from 'react';
import textures from '../../styles/textures.module.css';
import LazyImage from '../LazyImage';
import WashiTape from '../WashiTape';
import Sticker from '../Sticker';
import { getSeededRotation } from '../../utils/randomUtils';

/**
 * PhotoLayout - Polaroid-style photo with handwritten caption
 * 
 * Supports:
 * - New media[] array with per-photo adjustments (scale, offsetX, offsetY)
 * - Legacy mediaUrl string for backwards compatibility
 * - imageStyle for page-level adjustments
 */
const PhotoLayout = ({ content, mediaUrl, media = [], caption, stickers = [], pageId = '1', imageStyle = {} }) => {
  const rotation = getSeededRotation(pageId);
  
  // Get the first photo - prefer media array, fallback to mediaUrl
  const firstPhoto = media[0] || (mediaUrl ? { url: mediaUrl, scale: 1, offsetX: 0, offsetY: 0 } : null);
  const hasPhoto = firstPhoto && firstPhoto.url;
  
  return (
    <div className={`
      w-full h-full 
      ${textures.kraftPaper}
      flex flex-col items-center justify-center
      p-3 sm:p-6 md:p-10 relative overflow-hidden
    `}>
      {/* Page texture overlay */}
      <div className={textures.agedPaper} style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
      
      {/* Polaroid frame */}
      <div 
        className={`
          relative 
          ${textures.polaroidFrame}
          ${rotation}
          w-[85%] max-w-[260px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[500px]
          transform hover:scale-105 transition-transform duration-300
        `}
      >
        {/* Washi tape decorations */}
        <WashiTape 
          color="pink" 
          position="topLeft" 
          seed={`${pageId}-tape1`}
          width="60px"
        />
        <WashiTape 
          color="mint" 
          position="topRight" 
          seed={`${pageId}-tape2`}
          width="55px"
        />

        {/* Photo */}
        <div className="relative bg-gray-100 overflow-hidden">
          {hasPhoto ? (
            <LazyImage 
              mediaItem={firstPhoto}
              alt={caption || 'Foto de aventura'}
              aspectRatio="4/3"
              className="w-full"
              imageStyle={imageStyle}
            />
          ) : (
            <div 
              className="w-full bg-gradient-to-br from-kraft-light to-kraft flex items-center justify-center"
              style={{ aspectRatio: '4/3' }}
            >
              <span className="text-kraft-dark/40 font-handwriting text-xl">📷</span>
            </div>
          )}
        </div>

        {/* Caption area */}
        <div className="pt-3 sm:pt-5 pb-2 sm:pb-3 px-2 sm:px-3 text-center">
          <p className="font-caveat text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-700 leading-relaxed">
            {caption || content || 'Un momento especial...'}
          </p>
        </div>
      </div>

      {/* Additional text content if different from caption */}
      {content && content !== caption && (
        <div className={`
          mt-3 sm:mt-6 max-w-md text-center px-2
          ${getSeededRotation(pageId + '-text')}
        `}>
          <p className="font-handwriting text-base sm:text-xl md:text-2xl text-amber-900/80">
            {content}
          </p>
        </div>
      )}

      {/* Stickers */}
      {stickers.map((sticker, idx) => (
        <Sticker 
          key={idx}
          type={sticker}
          position={['topRight', 'bottomLeft', 'topLeft', 'bottomRight'][idx % 4]}
          seed={`photo-${pageId}-${idx}`}
        />
      ))}

      {/* Book spine shadow */}
      <div className={textures.spineGradient} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '30px' }} />
    </div>
  );
};

export default PhotoLayout;
