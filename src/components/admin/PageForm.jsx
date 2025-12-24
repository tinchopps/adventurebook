import React, { useState, useMemo } from 'react';
import textures from '../../styles/textures.module.css';
import PhotoCropper from './PhotoCropper';
import { transformDriveLink } from '../../utils/driveHelper';
// Note: textures import is correct, using relative path from admin folder

const LAYOUT_OPTIONS = [
  { value: 'cover', label: '📕 Portada', description: 'Cubierta del libro' },
  { value: 'photo_single', label: '📷 Foto', description: 'Foto tipo Polaroid' },
  { value: 'quote_center', label: '💬 Frase', description: 'Texto emotivo centrado' },
  { value: 'checklist', label: '✅ Lista', description: 'Cosas por hacer' },
  { value: 'collage', label: '🎨 Collage', description: 'Múltiples fotos' },
];

const STICKER_OPTIONS = [
  { value: 'balloon', label: '🎈 Globos' },
  { value: 'grape_soda', label: '🏅 Grape Soda' },
  { value: 'stamp_travel', label: '✈️ Sello viaje' },
  { value: 'heart', label: '❤️ Corazón' },
  { value: 'star', label: '⭐ Estrella' },
  { value: 'compass', label: '🧭 Brújula' },
];

/**
 * Convert mediaUrl string to media array
 */
const parseMediaFromUrl = (mediaUrl) => {
  if (!mediaUrl) return [];
  return mediaUrl.split(',').map(url => ({
    url: url.trim(),
    scale: 1,
    offsetX: 0,
    offsetY: 0
  })).filter(m => m.url);
};

/**
 * PageForm - Form for creating/editing pages
 * Order is managed via up/down buttons in the list, not here
 */
const PageForm = ({ page = null, onSubmit, onCancel, existingPagesCount = 0, existingOrders = [] }) => {
  // For new pages, find the max order and add 1
  const getNextOrder = () => {
    if (page?.order) return page.order;
    if (existingOrders.length > 0) {
      return Math.max(...existingOrders) + 1;
    }
    return existingPagesCount + 1;
  };

  // Initialize media array from page data
  const initialMedia = useMemo(() => {
    if (page?.media && Array.isArray(page.media) && page.media.length > 0) {
      return page.media;
    }
    return parseMediaFromUrl(page?.mediaUrl);
  }, [page]);

  const [formData, setFormData] = useState({
    layout: page?.layout || 'photo_single',
    content: page?.content || '',
    mediaUrl: page?.mediaUrl || '',
    caption: page?.caption || '',
    stickers: page?.stickers || [],
    order: getNextOrder(),
    section: page?.section || '',
  });

  const [media, setMedia] = useState(initialMedia);
  const [loading, setLoading] = useState(false);
  const [editingPhotoIndex, setEditingPhotoIndex] = useState(null);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStickerToggle = (sticker) => {
    setFormData(prev => ({
      ...prev,
      stickers: prev.stickers.includes(sticker)
        ? prev.stickers.filter(s => s !== sticker)
        : [...prev.stickers, sticker]
    }));
  };

  // Photo management
  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    setMedia(prev => [...prev, {
      url: newPhotoUrl.trim(),
      scale: 1,
      offsetX: 0,
      offsetY: 0
    }]);
    setNewPhotoUrl('');
  };

  const handleRemovePhoto = (index) => {
    setMedia(prev => prev.filter((_, i) => i !== index));
  };

  const handlePhotoSave = (updatedPhoto) => {
    setMedia(prev => prev.map((p, i) => 
      i === editingPhotoIndex ? updatedPhoto : p
    ));
    setEditingPhotoIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Include media array in submission
      const submitData = {
        ...formData,
        media: media.length > 0 ? media : undefined
      };
      await onSubmit(submitData);
    } finally {
      setLoading(false);
    }
  };

  const showMediaField = ['photo_single', 'collage'].includes(formData.layout);
  const showCaptionField = formData.layout === 'photo_single';
  const maxPhotos = formData.layout === 'collage' ? 5 : 1;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* Layout selector */}
      <div>
        <label className="block font-handwriting text-amber-900 mb-2 sm:mb-3 text-base sm:text-lg">
          Tipo de página
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {LAYOUT_OPTIONS.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, layout: option.value }))}
              className={`
                p-2 sm:p-3 rounded-lg border-2 text-left transition-all
                ${formData.layout === option.value 
                  ? 'border-leather-burgundy bg-leather-burgundy/10' 
                  : 'border-amber-200 hover:border-amber-400 bg-white/50'
                }
              `}
            >
              <div className="font-handwriting text-sm sm:text-lg">{option.label}</div>
              <div className="text-[10px] sm:text-xs text-amber-700/60 hidden sm:block">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Section (optional) */}
      <div>
        <label className="block font-handwriting text-amber-900 mb-1 sm:mb-2 text-sm sm:text-base">
          Sección (para el índice)
        </label>
        <input
          type="text"
          name="section"
          value={formData.section}
          onChange={handleChange}
          className="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-md border-2 border-amber-300 
            bg-white/80 font-handwriting text-sm sm:text-base
            focus:outline-none focus:border-leather-burgundy"
          placeholder="ej: Vacaciones, Cumpleaños..."
        />
      </div>

      {/* Content */}
      <div>
        <label className="block font-handwriting text-amber-900 mb-1 sm:mb-2 text-sm sm:text-base">
          Contenido
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border-2 border-amber-300 
            bg-white/80 font-handwriting text-sm sm:text-base
            focus:outline-none focus:border-leather-burgundy resize-none"
          placeholder={
            formData.layout === 'checklist' 
              ? 'Items separados por |'
              : 'Texto de la página...'
          }
        />
      </div>

      {/* Media URL (for photo layouts) */}
      {showMediaField && (
        <div>
          <label className="block font-handwriting text-amber-900 mb-1 sm:mb-2 text-sm sm:text-base">
            📷 Fotos ({media.length}/{maxPhotos})
          </label>
          
          {/* Photo thumbnails grid */}
          {media.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
              {media.map((photo, idx) => {
                const hasAdjustments = photo.scale !== 1 || photo.offsetX !== 0 || photo.offsetY !== 0;
                return (
                  <div 
                    key={idx}
                    className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden
                      border-2 border-amber-200 hover:border-leather-burgundy transition-colors"
                  >
                    <img
                      src={transformDriveLink(photo.url)}
                      alt={`Foto ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      style={{
                        transform: photo.scale !== 1 ? `scale(${photo.scale})` : undefined,
                        transformOrigin: 'center center',
                        objectPosition: `${Math.max(0, Math.min(100, 50 - photo.offsetX))}% ${Math.max(0, Math.min(100, 50 - photo.offsetY))}%`
                      }}
                    />
                    
                    {/* Adjustment indicator */}
                    {hasAdjustments && (
                      <div className="absolute top-1 left-1 w-4 h-4 bg-green-500 rounded-full 
                        flex items-center justify-center text-white text-[10px] shadow">
                        ✓
                      </div>
                    )}
                    
                    {/* Hover actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                      transition-opacity flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => setEditingPhotoIndex(idx)}
                        className="p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors"
                        title="Ajustar encuadre"
                      >
                        <span className="text-sm">🖼️</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(idx)}
                        className="p-1.5 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                        title="Eliminar foto"
                      >
                        <span className="text-sm">🗑️</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Add new photo */}
          {media.length < maxPhotos && (
            <div className="flex gap-2">
              <input
                type="url"
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPhoto())}
                className="flex-1 px-3 py-2 rounded-md border-2 border-amber-300 
                  bg-white/80 font-handwriting text-sm
                  focus:outline-none focus:border-leather-burgundy"
                placeholder="https://drive.google.com/..."
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                disabled={!newPhotoUrl.trim()}
                className={`
                  px-3 py-2 rounded-md font-handwriting text-sm transition-colors
                  ${newPhotoUrl.trim() 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                `}
              >
                + Agregar
              </button>
            </div>
          )}
          
          <p className="mt-1 text-[10px] sm:text-xs text-amber-700/60 font-handwriting">
            {formData.layout === 'collage' 
              ? 'Agregá hasta 5 fotos. Click en 🖼️ para ajustar encuadre.'
              : 'Agregá una foto. Click en 🖼️ para ajustar encuadre.'
            }
          </p>
        </div>
      )}

      {/* Caption (for photo layout) */}
      {showCaptionField && (
        <div>
          <label className="block font-handwriting text-amber-900 mb-1 sm:mb-2 text-sm sm:text-base">
            Pie de foto
          </label>
          <input
            type="text"
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border-2 border-amber-300 
              bg-white/80 font-handwriting text-sm sm:text-base
              focus:outline-none focus:border-leather-burgundy"
            placeholder="Un momento especial..."
          />
        </div>
      )}

      {/* Stickers */}
      <div>
        <label className="block font-handwriting text-amber-900 mb-2 sm:mb-3 text-sm sm:text-base">
          Stickers
        </label>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {STICKER_OPTIONS.map(sticker => (
            <button
              key={sticker.value}
              type="button"
              onClick={() => handleStickerToggle(sticker.value)}
              className={`
                px-2 py-1 sm:px-3 sm:py-2 rounded-full border-2 transition-all font-handwriting text-xs sm:text-sm
                ${formData.stickers.includes(sticker.value)
                  ? 'border-leather-burgundy bg-leather-burgundy text-white'
                  : 'border-amber-300 bg-white/50 hover:border-amber-400'
                }
              `}
            >
              {sticker.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-amber-200">
        <button
          type="submit"
          disabled={loading}
          className={`
            flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-md
            bg-leather-burgundy hover:bg-leather-dark
            text-amber-100 font-caveat text-base sm:text-xl
            transition-colors duration-300
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
            shadow-lg
          `}
        >
          {loading ? '...' : (page ? 'Actualizar' : 'Crear')}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-md border-2 border-amber-300
              font-handwriting text-sm sm:text-base text-amber-800 hover:bg-amber-100
              transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>

      {/* Photo Cropper Modal */}
      {editingPhotoIndex !== null && media[editingPhotoIndex] && (
        <PhotoCropper
          photo={media[editingPhotoIndex]}
          onSave={handlePhotoSave}
          onCancel={() => setEditingPhotoIndex(null)}
          aspectRatio={formData.layout === 'collage' ? '1/1' : '4/3'}
        />
      )}
    </form>
  );
};

export default PageForm;
