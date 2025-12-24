/**
 * Transforms Google Drive sharing links to direct image URLs
 * @param {string} url - Google Drive sharing URL
 * @returns {string} - Direct image URL for embedding
 */
export const transformDriveLink = (url) => {
  if (!url) return '';
  
  // If it's not a Drive link, return as-is
  if (!url.includes('drive.google.com')) {
    return url;
  }
  
  let fileId = null;
  
  // Extract ID from /file/d/ID/view pattern
  const filePattern = /\/file\/d\/([a-zA-Z0-9_-]+)/;
  const fileMatch = url.match(filePattern);
  if (fileMatch) {
    fileId = fileMatch[1];
  }
  
  // Extract ID from open?id=ID pattern
  const openPattern = /[?&]id=([a-zA-Z0-9_-]+)/;
  const openMatch = url.match(openPattern);
  if (openMatch) {
    fileId = openMatch[1];
  }
  
  // If we extracted an ID, use the direct view URL
  if (fileId) {
    // This format works for publicly shared files
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  
  // Return original URL if it doesn't match Drive patterns
  return url;
};

/**
 * Checks if a URL is a Google Drive link
 * @param {string} url - URL to check
 * @returns {boolean}
 */
export const isDriveLink = (url) => {
  if (!url) return false;
  return url.includes('drive.google.com');
};

/**
 * Gets a thumbnail URL for Google Drive files (faster loading)
 * @param {string} url - Google Drive URL
 * @param {number} size - Thumbnail size (default 400)
 * @returns {string}
 */
export const getDriveThumbnail = (url, size = 400) => {
  const directUrl = transformDriveLink(url);
  if (directUrl.includes('drive.google.com')) {
    const idMatch = directUrl.match(/id=([a-zA-Z0-9_-]+)/);
    if (idMatch) {
      return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w${size}`;
    }
  }
  return directUrl;
};
