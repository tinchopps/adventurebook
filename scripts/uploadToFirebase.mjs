// Script para subir seedData a Firebase
import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { seedPages } from '../src/data/seedData.js';

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

async function deleteAllPages() {
  console.log('🗑️ Eliminando páginas existentes...');
  const pagesRef = collection(db, 'pages');
  const snapshot = await getDocs(pagesRef);
  
  for (const docSnap of snapshot.docs) {
    await deleteDoc(doc(db, 'pages', docSnap.id));
  }
  console.log(`   Eliminadas ${snapshot.docs.length} páginas`);
}

async function uploadPages() {
  console.log('📤 Subiendo nuevas páginas...');
  const pagesRef = collection(db, 'pages');
  
  for (const page of seedPages) {
    await addDoc(pagesRef, {
      ...page,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  console.log(`   Subidas ${seedPages.length} páginas`);
}

async function main() {
  try {
    console.log('🚀 Iniciando subida a Firebase...\n');
    await deleteAllPages();
    await uploadPages();
    console.log('\n✅ ¡Datos subidos exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
