# Adventure Book - AI Coding Instructions

## Project Overview
A React SPA replicating the "Adventure Book" aesthetic from Pixar's "Up" movie. Features a 3D flipbook with scrapbook textures, decorative elements, and Firebase backend for page management.

## Architecture

### Core Data Flow
```
Firebase Firestore → pagesService.js → Book.jsx → Page.jsx → Layout Components
```

- **Pages** are stored in Firestore `pages` collection, ordered by `order` field
- Each page has a `layout` type that determines which layout component renders it
- Real-time updates via `subscribeToPagesRealtime()` in `pagesService.js`

### Layout System
Pages are rendered by `Page.jsx` which maps `layout` field to components in `components/layouts/`:
- `cover` → `CoverLayout.jsx` (leather texture, embossed title)
- `index` → `IndexLayout.jsx` (table of contents, format: `"Section:pageNum | Section:pageNum"`)
- `photo_single` → `PhotoLayout.jsx` (polaroid frame with washi tape)
- `quote_center` → `QuoteLayout.jsx` (handwritten quote on kraft paper)
- `checklist` → `ChecklistLayout.jsx` (pipe-separated items: `"item1 | item2 | item3"`)
- `collage` → `CollageLayout.jsx` (comma-separated URLs: `"url1, url2, url3"`)

### Page Data Structure
Each page has these fields:
- `order`: Number for page sequence
- `layout`: Layout type string
- `section`: Section name for grouping (used by index)
- `content`: Main text content
- `mediaUrl`: Image URL(s) - Drive links auto-transformed
- `caption`: Secondary text
- `stickers`: Array of sticker types

### Styling Architecture
- **CSS Modules** for textures: `textures.module.css`, `stickers.module.css`
- **Tailwind** for utility classes with custom theme in `tailwind.config.js`
- Custom colors: `kraft`, `leather`, `washi` palettes
- Custom fonts: `font-caveat`, `font-handwriting`, `font-manuscript`

## Key Patterns

### Organic Randomization
Use seeded randomness for consistent "handmade" look across renders:
```jsx
import { getSeededRotation, getRandomOffset } from '../utils/randomUtils';
const rotation = getSeededRotation(pageId);  // Returns Tailwind class like "rotate-2"
```

### Google Drive Images
Always use `transformDriveLink()` from `utils/driveHelper.js` to convert Drive sharing URLs to embeddable format:
```jsx
import { transformDriveLink } from '../utils/driveHelper';
const imageUrl = transformDriveLink(driveShareUrl);
```

### Texture Composition
Layer multiple texture classes for depth:
```jsx
<div className={textures.kraftPaper}>
  <div className={textures.agedPaper} style={{ opacity: 0.3 }} />
  {/* content */}
</div>
```

### Decorative Elements
- `WashiTape.jsx`: Accepts `color` (pink|mint|cream|blue), `position`, and `seed` for rotation
- `Sticker.jsx`: Decorative SVG stickers (balloon, grape_soda, heart, compass, etc.)

## Development Commands
```bash
npm run dev      # Start Vite dev server (port 3000)
npm run build    # Production build
npm run preview  # Preview production build
```

## Firebase Setup
Environment variables (`.env`):
```
VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID,
VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, VITE_FIREBASE_APP_ID
```

Without Firebase configured, app uses `demoPages` from `data/seedData.js`.

## Adding New Features

### New Page Layout
1. Create `components/layouts/NewLayout.jsx` following existing pattern
2. Export from `components/layouts/index.js`
3. Add case in `Page.jsx` switch statement
4. Document in `README.md` layout table

### New Sticker Type
1. Add SVG component in `Sticker.jsx`
2. Add case in `renderSticker()` switch
3. Style in `stickers.module.css`

### New Texture
Add to `textures.module.css` using SVG data URIs for noise/patterns. Use `::before`/`::after` for layering.
