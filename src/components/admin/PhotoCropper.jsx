import React, { useState, useRef, useCallback, useEffect } from 'react';
import { transformDriveLink } from '../../utils/driveHelper';
import textures from '../../styles/textures.module.css';

/**
 * PhotoCropper - Visual crop/pan/zoom editor for photos
 * Opens as a modal, allows drag-to-pan and slider zoom
 */
const PhotoCropper = ({ 
  photo, // { url, scale, offsetX, offsetY }
  onSave, 
  onCancel,
  aspectRatio = '4/3'
}) => {
  const [scale, setScale] = useState(photo?.scale || 1.0);
  const [offsetX, setOffsetX] = useState(photo?.offsetX || 0);
  const [offsetY, setOffsetY] = useState(photo?.offsetY || 0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef(null);
  const imageUrl = transformDriveLink(photo?.url || '');

  // Handle mouse/touch drag for panning
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStart({ 
      x: clientX - offsetX, 
      y: clientY - offsetY 
    });
  }, [offsetX, offsetY]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    let newOffsetX = clientX - dragStart.x;
    let newOffsetY = clientY - dragStart.y;
    
    // Clamp offsets to -50 to 50 range
    newOffsetX = Math.max(-50, Math.min(50, newOffsetX));
    newOffsetY = Math.max(-50, Math.min(50, newOffsetY));
    
    setOffsetX(newOffsetX);
    setOffsetY(newOffsetY);
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global listeners for drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Handle keyboard for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  const handleSave = () => {
    onSave({
      ...photo,
      scale: parseFloat(scale.toFixed(2)),
      offsetX: parseFloat(offsetX.toFixed(1)),
      offsetY: parseFloat(offsetY.toFixed(1))
    });
  };

  const handleReset = () => {
    setScale(1.0);
    setOffsetX(0);
    setOffsetY(0);
  };

  const hasChanges = scale !== 1.0 || offsetX !== 0 || offsetY !== 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div 
        className={`
          ${textures.kraftPaper}
          rounded-lg p-4 sm:p-6 relative overflow-hidden 
          w-full max-w-lg max-h-[90vh] overflow-y-auto
          shadow-2xl animate-modal-in
        `}
      >
        <div className={textures.agedPaper} style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-caveat text-xl sm:text-2xl text-leather-burgundy">
              🖼️ Ajustar imagen
            </h3>
            <button
              onClick={onCancel}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-red-100 
                flex items-center justify-center shadow transition-colors"
            >
              <span className="text-lg">✕</span>
            </button>
          </div>

          {/* Preview area */}
          <div 
            ref={containerRef}
            className="relative bg-gray-200 rounded-lg overflow-hidden mb-4 cursor-move
              border-4 border-white shadow-lg"
            style={{ aspectRatio }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            {/* The cropped preview - this is what will appear in the book */}
            <img
              src={imageUrl}
              alt="Preview"
              draggable={false}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover select-none"
              style={{
                transform: scale !== 1 ? `scale(${scale})` : undefined,
                transformOrigin: 'center center',
                objectPosition: `${Math.max(0, Math.min(100, 50 - offsetX))}% ${Math.max(0, Math.min(100, 50 - offsetY))}%`,
                transition: isDragging ? 'none' : 'all 0.1s ease-out'
              }}
            />
            
            {/* Drag indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className={`
                bg-black/40 text-white px-3 py-1.5 rounded-full font-handwriting text-sm
                transition-opacity duration-300
                ${isDragging ? 'opacity-100' : 'opacity-0'}
              `}>
                Arrastrando...
              </div>
            </div>

            {/* Corner guides */}
            <div className="absolute inset-2 border-2 border-dashed border-white/50 rounded pointer-events-none" />
          </div>

          {/* Zoom slider */}
          <div className="mb-4">
            <label className="flex items-center justify-between mb-2">
              <span className="font-handwriting text-amber-900">
                🔍 Zoom: {(scale * 100).toFixed(0)}%
              </span>
              <span className="text-xs text-amber-700/60 font-handwriting">
                (0.5x - 2x)
              </span>
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.05"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer
                bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-leather-burgundy
                [&::-webkit-slider-thumb]:shadow-md
                [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>

          {/* Position sliders */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-handwriting text-amber-900 mb-1 text-sm">
                ↔️ Horizontal: {offsetX > 0 ? '+' : ''}{offsetX.toFixed(0)}
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                step="1"
                value={offsetX}
                onChange={(e) => setOffsetX(parseFloat(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-amber-200
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-leather-burgundy
                  [&::-webkit-slider-thumb]:shadow"
              />
            </div>
            <div>
              <label className="block font-handwriting text-amber-900 mb-1 text-sm">
                ↕️ Vertical: {offsetY > 0 ? '+' : ''}{offsetY.toFixed(0)}
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                step="1"
                value={offsetY}
                onChange={(e) => setOffsetY(parseFloat(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-amber-200
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-leather-burgundy
                  [&::-webkit-slider-thumb]:shadow"
              />
            </div>
          </div>

          {/* Instructions */}
          <p className="text-xs text-amber-700/70 font-handwriting mb-4 text-center">
            💡 Arrastrá la imagen o usá los sliders para ajustar el encuadre
          </p>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              disabled={!hasChanges}
              className={`
                px-4 py-2 rounded-md font-handwriting text-sm transition-colors
                ${hasChanges 
                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-800' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
              `}
            >
              ↩️ Reset
            </button>
            
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-md border-2 border-amber-300
                font-handwriting text-sm text-amber-800 hover:bg-amber-100 transition-colors"
            >
              Cancelar
            </button>
            
            <button
              onClick={handleSave}
              className="flex-1 py-2 px-4 rounded-md
                bg-leather-burgundy hover:bg-leather-dark
                text-amber-100 font-caveat text-lg
                transition-colors shadow-lg"
            >
              ✓ Guardar ajuste
            </button>
          </div>
        </div>

        {/* Animation styles */}
        <style>{`
          @keyframes modal-in {
            from {
              opacity: 0;
              transform: scale(0.95) translateY(10px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          .animate-modal-in {
            animation: modal-in 0.2s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default PhotoCropper;
