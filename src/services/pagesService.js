import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'pages';

/**
 * Normalize media data - converts old mediaUrl string to new media[] array format
 * Maintains backwards compatibility
 * @param {object} pageData - Raw page data from Firestore
 * @returns {object} - Page data with normalized media array
 */
export const normalizeMedia = (pageData) => {
  // If already has media array, return as-is
  if (Array.isArray(pageData.media) && pageData.media.length > 0) {
    return pageData;
  }
  
  // Convert mediaUrl string to media array
  if (pageData.mediaUrl && typeof pageData.mediaUrl === 'string') {
    const urls = pageData.mediaUrl.split(',').map(url => url.trim()).filter(Boolean);
    const media = urls.map(url => ({
      url,
      scale: 1.0,
      offsetX: 0,
      offsetY: 0
    }));
    
    return {
      ...pageData,
      media
    };
  }
  
  // No media
  return {
    ...pageData,
    media: []
  };
};

/**
 * Convert media array back to mediaUrl string for backwards compatibility in storage
 * @param {object} pageData - Page data with media array
 * @returns {object} - Page data with mediaUrl string
 */
export const denormalizeMedia = (pageData) => {
  if (Array.isArray(pageData.media) && pageData.media.length > 0) {
    // Keep both formats for compatibility
    return {
      ...pageData,
      mediaUrl: pageData.media.map(m => m.url).join(', ')
    };
  }
  return pageData;
};

/**
 * Get all pages from Firestore
 */
export const getPages = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => normalizeMedia({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching pages:', error);
    throw error;
  }
};

/**
 * Subscribe to real-time page updates
 */
export const subscribeToPagesRealtime = (callback) => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
  
  return onSnapshot(q, (snapshot) => {
    const pages = snapshot.docs.map(doc => normalizeMedia({
      id: doc.id,
      ...doc.data()
    }));
    callback(pages);
  }, (error) => {
    console.error('Error in realtime subscription:', error);
  });
};

/**
 * Add a new page
 */
export const addPage = async (pageData) => {
  try {
    const normalizedData = denormalizeMedia(pageData);
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...normalizedData,
      createdAt: new Date().toISOString()
    });
    return normalizeMedia({ id: docRef.id, ...normalizedData });
  } catch (error) {
    console.error('Error adding page:', error);
    throw error;
  }
};

/**
 * Update an existing page
 */
export const updatePage = async (pageId, pageData) => {
  try {
    const normalizedData = denormalizeMedia(pageData);
    const pageRef = doc(db, COLLECTION_NAME, pageId);
    await updateDoc(pageRef, {
      ...normalizedData,
      updatedAt: new Date().toISOString()
    });
    return normalizeMedia({ id: pageId, ...normalizedData });
  } catch (error) {
    console.error('Error updating page:', error);
    throw error;
  }
};

/**
 * Delete a page
 */
export const deletePage = async (pageId) => {
  try {
    const pageRef = doc(db, COLLECTION_NAME, pageId);
    await deleteDoc(pageRef);
    return true;
  } catch (error) {
    console.error('Error deleting page:', error);
    throw error;
  }
};

/**
 * Reorder pages
 */
export const reorderPages = async (pages) => {
  try {
    const updatePromises = pages.map((page, index) => 
      updateDoc(doc(db, COLLECTION_NAME, page.id), { order: index + 1 })
    );
    await Promise.all(updatePromises);
    return true;
  } catch (error) {
    console.error('Error reordering pages:', error);
    throw error;
  }
};

/**
 * Seed Firestore with initial data (bulk upload)
 */
export const seedFirestore = async (seedPages) => {
  try {
    console.log(`Seeding ${seedPages.length} pages to Firestore...`);
    
    // Add all pages in parallel
    const addPromises = seedPages.map(page => 
      addDoc(collection(db, COLLECTION_NAME), {
        ...page,
        createdAt: new Date().toISOString()
      })
    );
    
    await Promise.all(addPromises);
    console.log('Seeding complete!');
    return true;
  } catch (error) {
    console.error('Error seeding Firestore:', error);
    throw error;
  }
};

/**
 * Delete all pages from Firestore
 */
export const deleteAllPages = async () => {
  try {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    console.log('All pages deleted');
    return true;
  } catch (error) {
    console.error('Error deleting all pages:', error);
    throw error;
  }
};
