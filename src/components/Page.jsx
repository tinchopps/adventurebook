import React from 'react';
import { 
  CoverLayout, 
  PhotoLayout, 
  QuoteLayout, 
  ChecklistLayout, 
  CollageLayout,
  IndexLayout 
} from './layouts';

/**
 * Page Component - Renders the appropriate layout based on page data
 */
const Page = ({ page, isActive = true, onNavigate }) => {
  const { layout, content, mediaUrl, media = [], caption, stickers = [], order, imageStyle = {} } = page;
  const pageId = `page-${order}`;

  const renderLayout = () => {
    switch (layout) {
      case 'cover':
        return (
          <CoverLayout 
            content={content} 
            stickers={stickers}
          />
        );
      
      case 'photo_single':
      case 'photo':
        return (
          <PhotoLayout 
            content={content}
            mediaUrl={mediaUrl}
            media={media}
            caption={caption}
            stickers={stickers}
            pageId={pageId}
            imageStyle={imageStyle}
          />
        );
      
      case 'quote_center':
      case 'quote':
        return (
          <QuoteLayout 
            content={content}
            stickers={stickers}
            pageId={pageId}
          />
        );
      
      case 'checklist':
        return (
          <ChecklistLayout 
            content={content}
            stickers={stickers}
            pageId={pageId}
          />
        );
      
      case 'collage':
        return (
          <CollageLayout 
            content={content}
            mediaUrl={mediaUrl}
            media={media}
            stickers={stickers}
            pageId={pageId}
            imageStyle={imageStyle}
          />
        );

      case 'index':
        return (
          <IndexLayout 
            content={content}
            stickers={stickers}
            pageId={pageId}
            onNavigate={onNavigate}
          />
        );
      
      default:
        // Default to quote layout for unknown types
        return (
          <QuoteLayout 
            content={content || 'Una página de nuestra historia...'}
            stickers={stickers}
            pageId={pageId}
          />
        );
    }
  };

  return (
    <div 
      className={`
        w-full h-full
        ${isActive ? 'opacity-100' : 'opacity-0'}
        transition-opacity duration-300
      `}
    >
      {renderLayout()}
    </div>
  );
};

export default Page;
