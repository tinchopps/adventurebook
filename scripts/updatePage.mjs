// Script para actualizar una página específica en Firebase
import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Actualiza una página específica por su order
 * @param {number} pageOrder - El orden de la página a actualizar
 * @param {object} updates - Los campos a actualizar
 */
async function updatePage(pageOrder, updates) {
  console.log(`🔍 Buscando página con order: ${pageOrder}...`);
  
  const pagesRef = collection(db, 'pages');
  const q = query(pagesRef, where('order', '==', pageOrder));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) {
    console.log(`❌ No se encontró página con order ${pageOrder}`);
    return false;
  }
  
  const pageDoc = snapshot.docs[0];
  console.log(`📝 Actualizando página "${pageDoc.data().content || pageDoc.data().section}"...`);
  
  await updateDoc(doc(db, 'pages', pageDoc.id), {
    ...updates,
    updatedAt: new Date()
  });
  
  console.log(`✅ Página actualizada exitosamente!`);
  return true;
}

// Obtener argumentos de línea de comandos
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log(`
📖 Uso: node updatePage.mjs <order> <campo=valor> [campo2=valor2] ...

Ejemplos:
  node updatePage.mjs 5 mediaUrl="https://drive.google.com/..."
  node updatePage.mjs 6 content="Nuevo título" caption="Nueva descripción"
  node updatePage.mjs 7 imageStyle.zoom=1.5 imageStyle.position=top

Campos disponibles:
  - content: Texto principal
  - caption: Descripción/caption
  - mediaUrl: URL de imagen(es) - se convierte automáticamente a media[]
  - layout: photo_single, collage, quote_center, checklist
  - section: Nombre de sección
  - imageStyle.zoom: 1-3 (zoom de imagen)
  - imageStyle.position: center, top, bottom, left, right
  - imageStyle.brightness: 0.5-1.5
  - imageStyle.grayscale: true/false

Nuevo formato media[] (para ajustes individuales):
  node updatePage.mjs 5 media='[{"url":"https://...","scale":1.2,"offsetX":10,"offsetY":-5}]'
`);
  process.exit(0);
}

const pageOrder = parseFloat(args[0]);
const updates = {};

// Parsear argumentos campo=valor
for (let i = 1; i < args.length; i++) {
  const [key, ...valueParts] = args[i].split('=');
  const value = valueParts.join('='); // Por si el valor tiene =
  
  // Handle media array (JSON format)
  if (key === 'media') {
    try {
      updates.media = JSON.parse(value);
      // Also update mediaUrl for backwards compatibility
      updates.mediaUrl = updates.media.map(m => m.url).join(', ');
    } catch (e) {
      console.error('❌ Error parseando media JSON:', e.message);
      process.exit(1);
    }
    continue;
  }
  
  // Handle mediaUrl - convert to media array format
  if (key === 'mediaUrl') {
    const urls = value.split(',').map(u => u.trim()).filter(Boolean);
    updates.media = urls.map(url => ({
      url,
      scale: 1,
      offsetX: 0,
      offsetY: 0
    }));
    updates.mediaUrl = value;
    continue;
  }
  
  // Manejar campos anidados como imageStyle.zoom
  if (key.includes('.')) {
    const [parent, child] = key.split('.');
    if (!updates[parent]) updates[parent] = {};
    
    // Convertir tipos
    if (value === 'true') updates[parent][child] = true;
    else if (value === 'false') updates[parent][child] = false;
    else if (!isNaN(value)) updates[parent][child] = parseFloat(value);
    else updates[parent][child] = value;
  } else {
    // Convertir tipos
    if (value === 'true') updates[key] = true;
    else if (value === 'false') updates[key] = false;
    else if (!isNaN(value) && key !== 'content' && key !== 'caption') {
      updates[key] = parseFloat(value);
    } else {
      updates[key] = value;
    }
  }
}

console.log('🚀 Actualizando página...\n');
console.log('Cambios:', JSON.stringify(updates, null, 2));
console.log('');

updatePage(pageOrder, updates)
  .then(() => process.exit(0))
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
