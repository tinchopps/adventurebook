import React, { useState } from 'react';
import SkeletonLoader from './SkeletonLoader';
import { transformDriveLink } from '../utils/driveHelper';
import { useLightbox } from '../context/LightboxContext';

/**
 * LazyImage - Image component with lazy loading and skeleton placeholder
 * 
 * Supports two modes:
 * 1. Legacy: src + imageStyle props
 * 2. New: mediaItem object with { url, scale, offsetX, offsetY }
 * 
 * imageStyle options (legacy, applied on top of mediaItem):
 * - zoom: number (1 = 100%, 1.5 = 150%, etc.)
 * - position: "center" | "top" | "bottom" | etc.
 * - fit: "cover" | "contain" | "fill"
 * - blur: number (0-20)
 * - brightness: number (0-2, 1 = normal)
 * - grayscale: boolean
 * 
 * mediaItem props (new per-photo adjustments):
 * - url: image URL
 * - scale: 0.5-2 zoom
 * - offsetX: -50 to 50 horizontal pan
 * - offsetY: -50 to 50 vertical pan
 */
const LazyImage = ({ 
  src,
  mediaItem,
  alt = '', 
  className = '',
  aspectRatio = '4/3',
  imageStyle = {},
  clickable = true,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { openLightbox } = useLightbox();

  // Get the URL - prefer mediaItem over src
  const rawUrl = mediaItem?.url || src;
  
  // Transform Drive links to direct URLs
  const imageSrc = transformDriveLink(rawUrl);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
    onError?.();
  };

  // Parse legacy imageStyle options
  const {
    zoom = 1,
    position = 'center',
    fit = 'cover',
    blur = 0,
    brightness = 1,
    grayscale = false
  } = imageStyle;

  // Get per-photo adjustments from mediaItem
  const photoScale = mediaItem?.scale ?? 1;
  const photoOffsetX = mediaItem?.offsetX ?? 0;
  const photoOffsetY = mediaItem?.offsetY ?? 0;

  // Combine zoom: legacy zoom * mediaItem scale
  const combinedScale = zoom * photoScale;

  // Convert position to object-position CSS
  // Base positions map to percentages
  const positionMap = {
    'center': { x: 50, y: 50 },
    'top': { x: 50, y: 0 },
    'bottom': { x: 50, y: 100 },
    'left': { x: 0, y: 50 },
    'right': { x: 100, y: 50 },
    'top-left': { x: 0, y: 0 },
    'top-right': { x: 100, y: 0 },
    'bottom-left': { x: 0, y: 100 },
    'bottom-right': { x: 100, y: 100 }
  };

  // Calculate object-position from base position + offsets
  // offsetX/Y range from -50 to 50, map to 0-100% position
  const basePos = positionMap[position] || { x: 50, y: 50 };
  const finalPosX = Math.max(0, Math.min(100, basePos.x - photoOffsetX));
  const finalPosY = Math.max(0, Math.min(100, basePos.y - photoOffsetY));

  // Build filter string
  const filters = [];
  if (blur > 0) filters.push(`blur(${blur}px)`);
  if (brightness !== 1) filters.push(`brightness(${brightness})`);
  if (grayscale) filters.push('grayscale(100%)');

  const imageStyles = {
    aspectRatio,
    transform: combinedScale !== 1 ? `scale(${combinedScale})` : undefined,
    transformOrigin: 'center center',
    objectPosition: `${finalPosX}% ${finalPosY}%`,
    objectFit: fit,
    filter: filters.length > 0 ? filters.join(' ') : undefined
  };

  const handleClick = () => {
    if (clickable && isLoaded && !hasError) {
      openLightbox(imageSrc, alt);
    }
  };

  return (
    <div 
      className={`relative w-full ${clickable ? 'cursor-pointer group' : ''}`} 
      style={{ aspectRatio }}
      onClick={handleClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(e) => clickable && e.key === 'Enter' && handleClick()}
    >
      {/* Skeleton Loader - shown while loading */}
      {!isLoaded && (
        <div className="absolute inset-0">
          <SkeletonLoader aspectRatio={aspectRatio} />
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-kraft-dark/20 rounded">
          <div className="text-center text-kraft-dark/60">
            <svg className="w-10 h-10 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
            <span className="text-sm font-handwriting">Imagen no disponible</span>
          </div>
        </div>
      )}

      {/* Actual Image */}
      <img
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        referrerPolicy="no-referrer"
        className={`
          w-full h-full
          transition-all duration-500
          ${isLoaded && !hasError ? 'opacity-100' : 'opacity-0'}
          ${clickable ? 'group-hover:brightness-105 group-hover:scale-[1.02] transition-transform' : ''}
          ${className}
        `}
        style={imageStyles}
      />

      {/* Click indicator overlay */}
      {clickable && isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <svg className="w-6 h-6 text-kraft-dark/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
