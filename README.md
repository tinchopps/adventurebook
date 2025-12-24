# 📚 Nuestro Libro de Aventuras

Una Single Page Application que replica la estética del libro de aventuras de la película "Up" de Pixar. Diseñado para ser emotivo, orgánico y personal.

![Up Adventure Book](https://i.imgur.com/placeholder.png)

## ✨ Características

- 🎨 **Diseño Scrapbook Realista**: Texturas de papel kraft, cuero, cinta washi y efectos de envejecimiento
- 📖 **Animación de Páginas 3D**: Efecto flipbook con Framer Motion
- 📷 **Integración con Google Drive**: Carga imágenes directamente desde Drive
- 🎈 **Stickers Decorativos**: Globos, insignias, sellos de viaje
- ✏️ **Panel de Administración**: Gestiona páginas con Firebase
- 📱 **Responsive**: Funciona en móvil, tablet y desktop

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
cd our-adventure-book
npm install
```

### 2. Configurar Firebase (Opcional)

Crea un archivo `.env` basado en `.env.example`:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

La app estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── layouts/         # Layouts de página (Cover, Photo, Quote, etc.)
│   ├── admin/           # Componentes del panel admin
│   ├── Book.jsx         # Componente principal del libro
│   ├── Page.jsx         # Renderizador de páginas
│   ├── LazyImage.jsx    # Imagen con lazy loading
│   ├── Sticker.jsx      # Stickers decorativos
│   └── WashiTape.jsx    # Cinta adhesiva decorativa
├── config/
│   └── firebase.js      # Configuración de Firebase
├── context/
│   └── AuthContext.jsx  # Contexto de autenticación
├── data/
│   └── seedData.js      # Datos iniciales
├── pages/
│   ├── HomePage.jsx     # Vista principal del libro
│   └── AdminPage.jsx    # Panel de administración
├── services/
│   └── pagesService.js  # Operaciones con Firestore
├── styles/
│   ├── textures.module.css  # Texturas CSS
│   └── stickers.module.css  # Estilos de stickers
├── utils/
│   ├── driveHelper.js   # Transformación de links de Drive
│   └── randomUtils.js   # Utilidades de aleatorización
├── App.jsx
├── main.jsx
└── index.css
```

## 📖 Tipos de Página

| Layout | Descripción |
|--------|-------------|
| `cover` | Portada con textura de cuero |
| `photo_single` | Foto estilo Polaroid con caption |
| `quote_center` | Frase emotiva centrada |
| `checklist` | Lista de cosas por hacer |
| `collage` | Múltiples fotos superpuestas |

## 🖼️ Uso de Google Drive

Para usar imágenes de Google Drive:

1. Sube la imagen a Drive
2. Click derecho > Obtener enlace
3. Asegúrate de que sea "Cualquier persona con el enlace"
4. Pega el link en el formulario admin

El helper `transformDriveLink()` convertirá automáticamente el link al formato correcto.

## 🔐 Panel de Administración

Accede a `/admin` para gestionar las páginas:

1. Configura Firebase Auth
2. Crea un usuario en Firebase Console
3. Inicia sesión en `/admin`
4. Añade, edita o elimina páginas

## 🎨 Personalización

### Colores (tailwind.config.js)

```js
colors: {
  'kraft': { /* Tonos papel kraft */ },
  'leather': { /* Tonos cuero */ },
  'washi': { /* Tonos cinta adhesiva */ },
}
```

### Fuentes

- **Caveat**: Títulos grandes
- **Patrick Hand**: Texto manuscrito
- **Indie Flower**: Notas casuales
- **Courier Prime**: Texto tipo máquina de escribir

## 🚢 Deploy

### Vercel
```bash
npm run build
vercel deploy
```

### Firebase Hosting
```bash
npm run build
firebase deploy
```

## 📝 Modelo de Datos (Firestore)

```typescript
interface Page {
  order: number;        // Orden de la página
  layout: string;       // Tipo de layout
  content: string;      // Texto principal
  mediaUrl: string;     // URL de imagen
  caption: string;      // Pie de foto
  stickers: string[];   // Stickers decorativos
}
```

## 💝 Créditos

Inspirado en la película "Up" de Pixar/Disney.
Hecho con amor para contar historias de aventuras.

---

*"La aventura está ahí afuera"* 🎈
