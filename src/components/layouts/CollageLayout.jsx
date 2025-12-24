import React from 'react';
import textures from '../../styles/textures.module.css';
import LazyImage from '../LazyImage';
import WashiTape from '../WashiTape';
import Sticker from '../Sticker';
import { getSeededRotation, getRandomOffset } from '../../utils/randomUtils';

/**
 * CollageLayout - Multiple photos arranged in a collage style
 * 
 * Supports:
 * - New media[] array with per-photo adjustments (scale, offsetX, offsetY)
 * - Legacy mediaUrl string (comma-separated) for backwards compatibility
 * - imageStyle for page-level adjustments (applies to all photos)
 */
const CollageLayout = ({ content, mediaUrl, media = [], stickers = [], pageId = '1', imageStyle = {} }) => {
  // Build photos array - prefer media[], fallback to parsing mediaUrl
  let photos = [];
  
  if (media && media.length > 0) {
    photos = media;
  } else if (mediaUrl && typeof mediaUrl === 'string') {
    // Legacy: convert comma-separated URLs to media objects
    photos = mediaUrl.split(',').map(url => ({
      url: url.trim(),
      scale: 1,
      offsetX: 0,
      offsetY: 0
    })).filter(p => p.url);
  }
  
  // Responsive collage positions
  const collagePositions = [
    { top: '5%', left: '3%', rotate: '-5deg', zIndex: 10, size: 'w-28 sm:w-44 md:w-56 lg:w-64' },
    { top: '3%', right: '5%', rotate: '4deg', zIndex: 15, size: 'w-24 sm:w-40 md:w-52 lg:w-60' },
    { bottom: '12%', left: '8%', rotate: '3deg', zIndex: 12, size: 'w-32 sm:w-48 md:w-60 lg:w-72' },
    { bottom: '18%', right: '3%', rotate: '-3deg', zIndex: 8, size: 'w-24 sm:w-36 md:w-48 lg:w-56' },
    { top: '35%', left: '28%', rotate: '-2deg', zIndex: 20, size: 'w-28 sm:w-44 md:w-56 lg:w-64' },
  ];

  return (
    <div className={`
      w-full h-full 
      ${textures.kraftPaper}
      relative overflow-hidden
      p-4
    `}>
      {/* Page texture */}
      <div className={textures.agedPaper} style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

      {/* Photos in collage arrangement */}
      {photos.slice(0, 5).map((photo, idx) => {
        const pos = collagePositions[idx];
        const offset = getRandomOffset(`${pageId}-${idx}`);
        
        return (
          <div
            key={idx}
            className={`
              absolute ${pos.size}
              ${textures.polaroidFrame}
              transform hover:scale-110 hover:z-50
              transition-all duration-300 cursor-pointer
            `}
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              bottom: pos.bottom,
              transform: `rotate(${pos.rotate}) translate(${offset.x}px, ${offset.y}px)`,
              zIndex: pos.zIndex,
              padding: '6px 6px 25px 6px'
            }}
          >
            <WashiTape 
              color={['pink', 'mint', 'cream', 'blue'][idx % 4]}
              position="top"
              seed={`collage-${pageId}-${idx}`}
              width="50px"
            />
            <div className="overflow-hidden">
              <LazyImage 
                mediaItem={photo}
                alt={`Collage ${idx + 1}`}
                aspectRatio="1/1"
                imageStyle={imageStyle}
              />
            </div>
          </div>
        );
      })}

      {/* If no images, show placeholder */}
      {photos.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`
            ${textures.notePaper}
            p-6 max-w-xs text-center
            ${getSeededRotation(pageId)}
          `}>
            <p className="font-handwriting text-xl text-gray-600">
              {content || 'Espacio para nuestros recuerdos...'}
            </p>
          </div>
        </div>
      )}

      {/* Caption/Content overlay */}
      {content && photos.length > 0 && (
        <div className={`
          absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2
          ${textures.notePaper}
          px-3 sm:px-6 py-2 sm:py-3 max-w-[90%] sm:max-w-[80%]
          ${getSeededRotation(pageId + '-caption')}
          z-30
        `}>
          <p className="font-caveat text-sm sm:text-lg md:text-xl text-gray-700 text-center">
            {content}
          </p>
        </div>
      )}

      {/* Stickers */}
      {stickers.map((sticker, idx) => (
        <Sticker 
          key={idx}
          type={sticker}
          position={['topRight', 'bottomLeft', 'topLeft'][idx % 3]}
          seed={`collage-sticker-${pageId}-${idx}`}
        />
      ))}

      {/* Book spine shadow */}
      <div className={textures.spineGradient} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '30px' }} />
    </div>
  );
};

export default CollageLayout;
