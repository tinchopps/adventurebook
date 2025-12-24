/**
 * Seed Data - Initial pages for the Adventure Book
 * "Las Aventuras de Camila y Martín"
 * Based on the movie "Up" aesthetic - Pixar
 * 
 * Layout Types:
 * - cover: Portada con textura de cuero
 * - index: Índice con todas las secciones
 * - photo_single: Foto tipo Polaroid con caption
 * - quote_center: Frase emotiva centrada
 * - checklist: Lista separada por pipes (|)
 * - collage: Múltiples fotos separadas por comas
 * 
 * Sticker Types: balloon, heart, grape_soda, star, compass, stamp_travel, capybara, russell
 * 
 * Section Field: Groups pages by theme for the index
 */
export const seedPages = [
  // ========== COVER ==========
  {
    order: 0,
    layout: 'cover',
    section: 'Portada',
    content: 'LAS AVENTURAS DE CAMILA Y MARTÍN',
    mediaUrl: '',
    caption: '14/02/25 - Can I go <3',
    stickers: ['balloon']
  },

  // ========== ÍNDICE ==========
  {
    order: 1,
    layout: 'index',
    section: 'Índice',
    content: 'Orígenes:2 | Lugares Favoritos:5 | Actividades Favoritas:7 | Mascotas:15 | Cumpleaños:16 | Vacaciones:18 | Libros Favoritos:19 | Animes Favoritos:32 | Series Favoritas:33 | Películas Favoritas:34 | Canciones Favoritas:38 | Comidas Favoritas:55 | Nuestras Metas:56 | Parque de la Costa:57',
    mediaUrl: '',
    caption: '',
    stickers: ['heart', 'star']
  },

  // ========== ORÍGENES ==========
  {
    order: 2,
    layout: 'quote_center',
    section: 'Orígenes',
    content: 'ACÁ ES DONDE TODO COMENZÓ',
    mediaUrl: '',
    caption: 'Estación Sarmiento • Estreno de Dune',
    stickers: ['star', 'compass']
  },
  {
    order: 3,
    layout: 'photo_single',
    section: 'Orígenes',
    content: 'Donde empezó nuestra aventura épica 🎬',
    mediaUrl: 'https://drive.google.com/file/d/1wOhyUNhAZDgG6gWxo9Y9a7BgLWDBgwwl/view?usp=sharing',
    caption: 'NUESTRA PRIMERA CITA - Dune 2 🏜️',
    stickers: ['star', 'heart']
  },
  {
    order: 4,
    layout: 'quote_center',
    section: 'Orígenes',
    content: 'Hamburguesas, Snickers y Pipas Gigantes 🍔',
    mediaUrl: '',
    caption: 'El encanto de la pasión y entregar el corazón',
    stickers: ['heart']
  },

  // ========== LUGARES FAVORITOS ==========
  {
    order: 5,
    layout: 'photo_single',
    section: 'Lugares Favoritos',
    content: 'MORENO - Naturalmente Único',
    mediaUrl: 'https://drive.google.com/file/d/1W0ikC-A3zDHBnbMOrjzkHhPqgzr8j1gv/view?usp=drive_link',
    caption: 'Reserva Los Robles • Dique Roggero',
    stickers: ['stamp_travel', 'balloon'],
    imageStyle: { zoom: 1, position: 'center' }
  },
  {
    order: 6,
    layout: 'photo_single',
    section: 'Lugares Favoritos',
    content: 'Lugares Favoritos',
    mediaUrl: 'https://drive.google.com/file/d/1d8RswyOb9NzBYFXMaDzt7Z7ltgy6zna0/view?usp=sharing',
    caption: '',
    stickers: ['heart', 'star'],
    imageStyle: { zoom: 1.2, position: 'center' }
  },

  // ========== ACTIVIDADES FAVORITAS ==========
  {
    order: 7,
    layout: 'quote_center',
    section: 'Actividades Favoritas',
    content: 'Martín-swan & Cami-swan',
    mediaUrl: '',
    caption: 'Tu acción más pequeña atraerá muchas 🥠',
    stickers: ['heart']
  },
  {
    order: 8,
    layout: 'quote_center',
    section: 'Actividades Favoritas',
    content: 'Ferias de libros, bicicletas y Barrio Chino 📚🚲',
    mediaUrl: '',
    caption: 'Llegarás a la conclusión que tanto buscas',
    stickers: ['stamp_travel', 'balloon']
  },
  {
    order: 9,
    layout: 'quote_center',
    section: 'Actividades Favoritas',
    content: 'RESERVA NATURAL URBANA EL PALOMAR',
    mediaUrl: '',
    caption: 'Los Robles - Exploradores de la naturaleza 🌿',
    stickers: ['capybara', 'russell']
  },
  {
    order: 10,
    layout: 'quote_center',
    section: 'Actividades Favoritas',
    content: 'Dulzura busca la abeja en el seno de la flor...',
    mediaUrl: '',
    caption: 'Los Robles - Junio 2025 • Biblioteca • Los Gliptodontes',
    stickers: ['heart']
  },
  {
    order: 11,
    layout: 'quote_center',
    section: 'Actividades Favoritas',
    content: 'TE AMO ❤️',
    mediaUrl: '',
    caption: 'Mate rojo - Regalo de Aldi',
    stickers: ['heart', 'grape_soda']
  },
  {
    order: 12,
    layout: 'quote_center',
    section: 'Actividades Favoritas',
    content: 'PARQUE DE DIVERSIONES',
    mediaUrl: '',
    caption: 'Sillas voladoras - Volando juntos ✈️',
    stickers: ['balloon', 'heart']
  },

  // ========== EXPERIENCIAS & IT ==========
  {
    order: 13,
    layout: 'photo_single',
    section: 'Actividades Favoritas',
    content: 'CIRCO VERA CRUZ MEXICANO',
    mediaUrl: 'https://drive.google.com/open?id=1yTKBOViBW6GDcDhCPt8DNe_L1UVuK69_',
    caption: 'Una noche de magia y tacos en Gral. Rodríguez 🎪🌮',
    stickers: ['balloon', 'heart']
  },
  {
    order: 14,
    layout: 'collage',
    section: 'Actividades Favoritas',
    content: 'Nerdearla Santander Cloud | Salidas | Cine',
    mediaUrl: 'https://drive.google.com/open?id=1X63ZX7Lnmtj8NzC-1m1Q4lWT0Gols2nn, https://drive.google.com/open?id=1JKzKQBF1s4agMe7i6oTLxf9PaCHJWpB-, https://drive.google.com/open?id=19uBDHRFrrddpg20mZP2PYr-B1u7A8GJM',
    caption: 'Nuestras salidas por Buenos Aires y eventos IT de 2024 y 2025',
    stickers: ['star', 'compass']
  },

  // ========== MASCOTAS ==========
  {
    order: 15,
    layout: 'collage',
    section: 'Mascotas',
    content: 'Pancho | Dulce | Camilín',
    mediaUrl: 'https://drive.google.com/open?id=1Z3ji6Nz2eyuG9HBOfyHFUIZwgPIbdh9C',
    caption: 'Nuestros compañeros de cuatro patas en sus mejores momentos 🐾',
    stickers: ['heart', 'capybara']
  },

  // ========== CUMPLEAÑOS ==========
  {
    order: 16,
    layout: 'collage',
    section: 'Cumpleaños',
    content: 'Puerto Madero (10/09/24) | Rodríguez (10/09/25) | Tigre (08/11/24)',
    mediaUrl: '',
    caption: 'Desde que fui chiquito mi mamita me enseñó que buscara una niñita tan bonita como vos ❤️',
    stickers: ['capybara', 'star']
  },
  {
    order: 17,
    layout: 'collage',
    section: 'Cumpleaños',
    content: 'CUMPLE MARTÍN 2025 - 4D EXPERIENCE',
    mediaUrl: 'https://drive.google.com/open?id=1pA3dC3QQDKeIv1S4onaW6t1dFy3qb0Zs, https://drive.google.com/open?id=1WSifFdyoLC35fr1htOFPIoixahFvdN3t, https://drive.google.com/open?id=1bxgvBdAyIU8ic-MM0ivV6bdIfpw8cBvk, https://drive.google.com/open?id=1yyFPB7WqPUCltUOl37SLFWplRveY-vII',
    caption: 'Shopping DOT - Demon Slayer en 4D fue una locura ⚔️',
    stickers: ['heart', 'balloon']
  },
  {
    order: 17.5,
    layout: 'collage',
    section: 'Cumpleaños',
    content: 'CUMPLE CAMI 2025 - FESTEJOS',
    mediaUrl: 'https://drive.google.com/open?id=1DrqnLYFnoeIXhTmBLYFRGXdcUgsFD9i0, https://drive.google.com/open?id=1QGcHon1gXwqddro6Nv-LKyQpJzZ44PED, https://drive.google.com/open?id=1ZlZ8MAE1_WoJSgVQjxP8Q3TmSOZy9qla, https://drive.google.com/open?id=1aQf3PJ7NgyfZCBWEpH9ej5vj8qw_fNrO, https://drive.google.com/open?id=1rbfSMpiaC3E8Si-uXgyiX0OiAYq3xdhK, https://drive.google.com/open?id=1WWNWp6YXTmcw7EDETtspKGK4agnmo1bf, https://drive.google.com/open?id=1GU7EoqUvYRBk6Dv3qkuvLwjXupiF-Jlr, https://drive.google.com/open?id=12XKVYJKJRYBqHaxpf-DrvaQJZ5M1R414',
    caption: 'Celebrando a la mejor ingeniera ambiental en su día especial 🌿🎂',
    stickers: ['heart', 'star', 'balloon']
  },

  // ========== VACACIONES ==========
  {
    order: 18,
    layout: 'photo_single',
    section: 'Vacaciones',
    content: 'Mar del Plata 🌊',
    mediaUrl: '',
    caption: 'Selfie en la playa y caminata nocturna por el Lobo Marino',
    stickers: ['capybara', 'stamp_travel']
  },

  // ========== LIBROS FAVORITOS ==========
  {
    order: 19,
    layout: 'collage',
    section: 'Libros Favoritos',
    content: 'Librería Macondo | Menta Fresca | El Ateneo',
    mediaUrl: '',
    caption: 'Aniversario 1er Beso (29/03/24) • Funda de regalo (29/03/25) 📚',
    stickers: ['heart', 'star']
  },
  {
    order: 20,
    layout: 'quote_center',
    section: 'Libros Favoritos',
    content: 'CIEN AÑOS DE SOLEDAD 🦋',
    mediaUrl: '',
    caption: 'El primer libro del que hablamos y que Martín me empezó a leer',
    stickers: ['heart']
  },
  {
    order: 21,
    layout: 'checklist',
    section: 'Libros Favoritos',
    content: 'Mariposas amarillas | Pelotón de fusilamiento | La estirpe de los Buendía',
    mediaUrl: '',
    caption: 'García Márquez - Real Academia Española',
    stickers: ['star']
  },
  {
    order: 22,
    layout: 'photo_single',
    section: 'Libros Favoritos',
    content: 'EL SUEÑO DE GALILEO - Kim Stanley Robinson',
    mediaUrl: '',
    caption: 'Descubriendo las leyes que Dios usó para crear el mundo 🔭',
    stickers: ['compass', 'star']
  },
  {
    order: 23,
    layout: 'quote_center',
    section: 'Libros Favoritos',
    content: 'Amada y amante, mujer amiga. Hoy te quiero contar cuanto te amo, mi vida.',
    mediaUrl: '',
    caption: 'Noche de observación - "Mama Celeste" 🌌',
    stickers: ['heart']
  },
  {
    order: 24,
    layout: 'checklist',
    section: 'Libros Favoritos',
    content: 'Ío (400 volcanes) | Europa (Hielo de agua) | Calisto (Roca y hielo) | Ganímedes (Agua interna)',
    mediaUrl: '',
    caption: 'Júpiter tiene 95 lunas - 4 Galileanas (1610) 🪐',
    stickers: ['star', 'compass']
  },
  {
    order: 25,
    layout: 'photo_single',
    section: 'Libros Favoritos',
    content: 'PLANETARIO GALILEO GALILEI',
    mediaUrl: '',
    caption: 'Aprehensión y Epifanía - Juntos damos un pasito hacia el bien',
    stickers: ['star', 'compass']
  },
  {
    order: 26,
    layout: 'checklist',
    section: 'Libros Favoritos',
    content: 'Martin-swan List | Camilín List | Playlist: Street Fighter Couple',
    mediaUrl: '',
    caption: 'Street Fighter dio origen al nombre de nuestra playlist en Spotify 🎧',
    stickers: ['heart', 'star']
  },
  {
    order: 27,
    layout: 'quote_center',
    section: 'Libros Favoritos',
    content: 'HIKIKOMORI, FUTUOKO Y NEKO 🐈',
    mediaUrl: '',
    caption: '1ra vez que fuimos juntos a Yenny de Plaza Oeste',
    stickers: ['heart']
  },
  {
    order: 28,
    layout: 'photo_single',
    section: 'Libros Favoritos',
    content: 'JUDGE - Nuestro primer manga juntos 📖',
    mediaUrl: '',
    caption: 'Tomo 1 y 2 de Martín. Tomos 3 al 6 juntos. Yo tengo los impares, él los pares ❤️',
    stickers: ['star', 'heart']
  },
  {
    order: 29,
    layout: 'quote_center',
    section: 'Libros Favoritos',
    content: 'SOLANIN - Inio Asano 🎸',
    mediaUrl: '',
    caption: 'Terminamos de leerlo en Carlos Keen - Abril 2025',
    stickers: ['star', 'heart']
  },
  {
    order: 30,
    layout: 'checklist',
    section: 'Libros Favoritos',
    content: 'Aprehender la felicidad | Cantar aunque el mundo sea difícil | PEQUEÑA ESPERANZA ✨',
    mediaUrl: '',
    caption: 'Juntos vamos a dar un pasito hacia el bien',
    stickers: ['heart']
  },
  {
    order: 31,
    layout: 'quote_center',
    section: 'Libros Favoritos',
    content: 'LAS COSAS QUE PERDIMOS EN EL FUEGO 🔥',
    mediaUrl: '',
    caption: 'Patio del Vecino - Mariana Enriquez',
    stickers: ['star', 'heart']
  },

  // ========== ANIMES FAVORITOS ==========
  {
    order: 32,
    layout: 'collage',
    section: 'Animes Favoritos',
    content: 'One Piece | Demon Slayer | Spy x Family | Jujutsu Kaisen | DBZ',
    mediaUrl: '',
    caption: 'Luffy, Nezuko, Anya, Gojo y Goku - Vibeando juntos 🐱',
    stickers: ['heart', 'star']
  },

  // ========== SERIES FAVORITAS ==========
  {
    order: 33,
    layout: 'checklist',
    section: 'Series Favoritas',
    content: 'Breaking Bad (Heisenberg) | El Eternauta (Juan Salvo)',
    mediaUrl: '',
    caption: 'Íconos que marcaron nuestras maratones 📺',
    stickers: ['heart', 'star']
  },

  // ========== PELÍCULAS FAVORITAS ==========
  {
    order: 34,
    layout: 'checklist',
    section: 'Películas Favoritas',
    content: 'Las Reliquias de la Muerte: La Varita de Saúco | La Piedra de la Resurrección | La Capa de Invisibilidad',
    mediaUrl: '',
    caption: 'Hermanos Peverell - Siempre Potterheads ⚡',
    stickers: ['heart', 'star']
  },

  // ========== ANIMES FAVORITOS (Continuación) ==========
  {
    order: 35,
    layout: 'collage',
    section: 'Animes Favoritos',
    content: 'Monkey D. Luffy | Sanji | Roronoa Zoro | Nezuko Kamado | Tanjiro Kamado | Mitsuri Kanroji | Anya Forger | Satoru Gojo | Goku',
    mediaUrl: '',
    caption: 'Nuestro "Nekoverse" de personajes favoritos 🐱✨',
    stickers: ['heart', 'star']
  },
  {
    order: 36,
    layout: 'quote_center',
    section: 'Animes Favoritos',
    content: 'ONE PIECE UNIVERSE 🏴‍☠️',
    mediaUrl: '',
    caption: 'Episodio 169: Las islas del sur son cálidas... | Episodio 1: "Tómalo y cuídalo bien" (Shanks)',
    stickers: ['heart', 'star']
  },
  {
    order: 37,
    layout: 'quote_center',
    section: 'Animes Favoritos',
    content: '¡MUCHAS GRACIAS, YO SIEMPRE HE SIDO MUY FELIZ! 🌸',
    mediaUrl: '',
    caption: 'Episodio 312: Adiós al Going Merry - Water Seven',
    stickers: ['heart', 'star']
  },

  // ========== CANCIONES FAVORITAS ==========
  {
    order: 38,
    layout: 'checklist',
    section: 'Canciones Favoritas',
    content: 'It Gets Dark | Burning Bridges | Plot Twist | Sucker Punch | Mine Right Now | High Five | Home to You',
    mediaUrl: '',
    caption: 'Sigrid en vivo - Teatro Vorterix (24/05/24) 🎤',
    stickers: ['heart', 'star']
  },
  {
    order: 39,
    layout: 'photo_single',
    section: 'Canciones Favoritas',
    content: 'LA BELLA SIGRID CANTANDO 🌟',
    mediaUrl: '',
    caption: 'MacDonalds cercano al Vorterix después del show',
    stickers: ['heart', 'star']
  },
  {
    order: 40,
    layout: 'collage',
    section: 'Canciones Favoritas',
    content: 'Hagov | Magios | Vicente Colombo | Homero 2000',
    mediaUrl: '',
    caption: 'HAY DATA? FEST N°1 - Laberinto Morón (29/06/24) 🎸',
    stickers: ['heart', 'star']
  },
  {
    order: 41,
    layout: 'photo_single',
    section: 'Canciones Favoritas',
    content: 'DILLOM - SHOW LIBRE Y GRATUITO 🤘',
    mediaUrl: '',
    caption: 'Festival FU Moreno - Plaza Buján (21/09/24)',
    stickers: ['heart', 'star']
  },
  {
    order: 42,
    layout: 'checklist',
    section: 'Canciones Favoritas',
    content: 'Rocket Powers | Cirugía | La Primera | 220 | Post Mortem | Pelotuda',
    mediaUrl: '',
    caption: 'Dandara: Me basta cuando me cansé de mí...',
    stickers: ['star']
  },
  {
    order: 43,
    layout: 'quote_center',
    section: 'Canciones Favoritas',
    content: 'NADIE QUE TE RECORTE, TE QUIERE LIBRE 🕊️',
    mediaUrl: '',
    caption: 'Line Up: Malena D’Alessio, Aura, Actitud María Marta, Oney1',
    stickers: ['heart']
  },
  {
    order: 44,
    layout: 'photo_single',
    section: 'Canciones Favoritas',
    content: 'FESTIVAL FU MORENO 2023',
    mediaUrl: '',
    caption: '21/09/23 - Seguimos en la patria',
    stickers: ['heart', 'star']
  },

  // ========== CANCIONES FAVORITAS (Sección Hozier) ==========
  {
    order: 45,
    layout: 'photo_single',
    section: 'Canciones Favoritas',
    content: 'HOZIER - MOVISTAR ARENA 🎤',
    mediaUrl: '',
    caption: 'Fecha: 27/05/2024 • Teloneros: Isu de cams, Gigi Perez',
    stickers: ['heart', 'star']
  },
  {
    order: 46,
    layout: 'checklist',
    section: 'Canciones Favoritas',
    content: 'De Selby (Part 1 & 2) | Jackie and Wilson | Nobody\'s Soldier | Eat Your Young | Angel of Small Death | Dinner and Diatribes',
    mediaUrl: '',
    caption: 'Trína chéile, le chéile claochláite (Juntos: Transformados juntos)',
    stickers: ['heart', 'star']
  },
  {
    order: 47,
    layout: 'quote_center',
    section: 'Canciones Favoritas',
    content: 'FRANCESCA • IT WILL COME BACK • LIKE REAL PEOPLE DO',
    mediaUrl: '',
    caption: 'Canciones que nos hacen llorar juntos 💔',
    stickers: ['heart']
  },
  {
    order: 48,
    layout: 'checklist',
    section: 'Canciones Favoritas',
    content: 'From Eden | I, Carrion | Abstract | Too Sweet | Someone New | Almost (Sweet Music) | Movement | Take me to Church | Cherry Wine',
    mediaUrl: '',
    caption: 'Hay algo mágico en vos, algo tan mágico ✨',
    stickers: ['heart', 'star']
  },
  {
    order: 49,
    layout: 'quote_center',
    section: 'Canciones Favoritas',
    content: 'UNKNOWN/NTH • NINA CRIED POWER • WORK SONG',
    mediaUrl: '',
    caption: 'Las canciones más emotivas del show',
    stickers: ['heart', 'star']
  },
  {
    order: 50,
    layout: 'photo_single',
    section: 'Canciones Favoritas',
    content: 'FIRST TIME • SUNLIGHT • SHRIKE • FOREIGNER\'S GOD',
    mediaUrl: '',
    caption: 'Flores que dejó mi madre - Recuerdos hermosos 🌻',
    stickers: ['heart', 'star']
  },

  // ========== CANCIONES FAVORITAS (Sección Norah Jones) ==========
  {
    order: 51,
    layout: 'photo_single',
    section: 'Canciones Favoritas',
    content: 'NORAH JONES - VISIONS TOUR 2024 🎹',
    mediaUrl: '',
    caption: 'Movistar Arena - Una noche mágica al piano',
    stickers: ['heart', 'star']
  },
  {
    order: 52,
    layout: 'checklist',
    section: 'Canciones Favoritas',
    content: 'What am I to you? | Paradise | Running | Sunrise | After the Fall | I\'m Alive | I just wanna dance | Hurts to be alone | Visions | Little Broken Hearts | Staring at the wall',
    mediaUrl: '',
    caption: 'Una voz que nos lleva a otro mundo',
    stickers: ['star']
  },
  {
    order: 53,
    layout: 'checklist',
    section: 'Canciones Favoritas',
    content: 'Come away with me | Happy Pills | All a dream | Turn me on | The long way home | Don\'t know why | All this time',
    mediaUrl: '',
    caption: 'Como una flor esperando florecer... 🌸',
    stickers: ['heart', 'star']
  },

  // ========== COMIDAS FAVORITAS ==========
  {
    order: 54,
    layout: 'quote_center',
    section: 'Comidas Favoritas',
    content: 'EMPANADAS & HELADOS 🥟🍦',
    mediaUrl: '',
    caption: 'Val Anco - Los mejores helados',
    stickers: ['heart', 'star']
  },
  {
    order: 55,
    layout: 'checklist',
    section: 'Comidas Favoritas',
    content: 'Empanadas | Helados Val Anco',
    mediaUrl: '',
    caption: 'Sección en construcción... (Falta completar) 🍕🍦',
    stickers: ['heart', 'star']
  },

  // ========== NUESTRAS METAS ==========
  {
    order: 56,
    layout: 'checklist',
    section: 'Nuestras Metas',
    content: 'Ver auroras boreales juntos | Adoptar una mascota | Viajar a París | Aprender a bailar juntos | Vivir juntos | Envejecer de la mano | Tener nuestra propia casa | Ir a ver el amanecer a la montaña',
    mediaUrl: '',
    caption: 'Stuff we are going to do ✨',
    stickers: ['balloon', 'heart']
  }
];

/**
 * Demo pages with placeholder images for development
 * Ready for use while configuring Firestore
 * 
 * NOTE: Google Drive URLs will be auto-transformed by driveHelper.js
 * Format: https://drive.google.com/file/d/FILE_ID/view -> embeddable URL
 */
export const demoPages = [
  // ========== COVER ==========
  {
    id: 'cover',
    order: 0,
    layout: 'cover',
    section: 'Portada',
    content: 'LAS AVENTURAS DE CAMILA Y MARTÍN',
    mediaUrl: '',
    caption: '14/02/25 - Can I go <3',
    stickers: ['balloon']
  },

  // ========== ÍNDICE ==========
  {
    id: 'index',
    order: 1,
    layout: 'index',
    section: 'Índice',
    content: 'Orígenes:2 | Lugares Favoritos:5 | Actividades Favoritas:7 | Mascotas:15 | Cumpleaños:16 | Vacaciones:18 | Libros Favoritos:19 | Animes Favoritos:32 | Series Favoritas:33 | Películas Favoritas:34 | Canciones Favoritas:38 | Comidas Favoritas:55 | Nuestras Metas:56 | Parque de la Costa:57',
    mediaUrl: '',
    caption: '',
    stickers: ['heart', 'star']
  },

  // ========== ORÍGENES ==========
  {
    id: 'origenes-title',
    order: 2,
    layout: 'quote_center',
    section: 'Orígenes',
    content: 'ACÁ ES DONDE TODO COMENZÓ',
    mediaUrl: '',
    caption: 'Estación Sarmiento • Estreno de Dune',
    stickers: ['star', 'compass']
  },
  {
    id: 'dune-primera-cita',
    order: 3,
    layout: 'photo_single',
    section: 'Orígenes',
    content: 'Donde empezó nuestra aventura épica 🎬',
    mediaUrl: 'https://drive.google.com/file/d/1wOhyUNhAZDgG6gWxo9Y9a7BgLWDBgwwl/view?usp=sharing',
    caption: 'NUESTRA PRIMERA CITA - Dune 2 🏜️',
    stickers: ['star', 'heart']
  },
  {
    id: 'origenes-recuerdos',
    order: 4,
    layout: 'quote_center',
    section: 'Orígenes',
    content: 'Hamburguesas, Snickers y Pipas Gigantes 🍔',
    mediaUrl: '',
    caption: 'El encanto de la pasión y entregar el corazón',
    stickers: ['heart']
  },

  // ========== LUGARES FAVORITOS ==========
  {
    id: 'moreno-title',
    order: 5,
    layout: 'photo_single',
    section: 'Lugares Favoritos',
    content: 'MORENO - Naturalmente Único',
    mediaUrl: 'https://drive.google.com/file/d/1W0ikC-A3zDHBnbMOrjzkHhPqgzr8j1gv/view?usp=drive_link',
    caption: 'Reserva Los Robles • Dique Roggero',
    stickers: ['stamp_travel', 'balloon']
  },
  {
    id: 'lugares-recuerdos',
    order: 6,
    layout: 'photo_single',
    section: 'Lugares Favoritos',
    content: 'Lugares Favoritos',
    mediaUrl: 'https://drive.google.com/file/d/1d8RswyOb9NzBYFXMaDzt7Z7ltgy6zna0/view?usp=sharing',
    caption: '',
    stickers: ['heart', 'star']
  },

  // ========== ACTIVIDADES FAVORITAS ==========
  {
    id: 'swan-nicknames',
    order: 7,
    layout: 'quote_center',
    section: 'Actividades Favoritas',
    content: 'Martín-swan & Cami-swan',
    mediaUrl: '',
    caption: 'Tu acción más pequeña atraerá muchas 🥠',
    stickers: ['heart']
  },
  {
    id: 'actividades-recuerdos',
    order: 8,
    layout: 'quote_center',
    section: 'Actividades Favoritas',
    content: 'Ferias de libros, bicicletas y Barrio Chino 📚🚲',
    mediaUrl: '',
    caption: 'Llegarás a la conclusión que tanto buscas',
    stickers: ['stamp_travel', 'balloon']
  },
  {
    id: 'palomar-title',
    order: 9,
    layout: 'quote_center',
    section: 'Actividades Favoritas',
    content: 'RESERVA NATURAL URBANA EL PALOMAR',
    mediaUrl: '',
    caption: 'Los Robles - Exploradores de la naturaleza 🌿',
    stickers: ['capybara', 'russell']
  },
  {
    id: 'poesia-flor',
    order: 10,
    layout: 'quote_center',
    section: 'Actividades Favoritas',
    content: 'Dulzura busca la abeja en el seno de la flor...',
    mediaUrl: '',
    caption: 'Los Robles - Junio 2025 • Biblioteca • Los Gliptodontes',
    stickers: ['heart']
  },
  {
    id: 'te-amo',
    order: 11,
    layout: 'quote_center',
    section: 'Actividades Favoritas',
    content: 'TE AMO ❤️',
    mediaUrl: '',
    caption: 'Mate rojo - Regalo de Aldi',
    stickers: ['heart', 'grape_soda']
  },
  {
    id: 'parque-diversiones',
    order: 12,
    layout: 'quote_center',
    section: 'Actividades Favoritas',
    content: 'PARQUE DE DIVERSIONES',
    mediaUrl: '',
    caption: 'Sillas voladoras - Volando juntos ✈️',
    stickers: ['balloon', 'heart']
  },

  // ========== EXPERIENCIAS & IT ==========
  {
    id: 'experiencias-it',
    order: 13,
    layout: 'photo_single',
    section: 'Actividades Favoritas',
    content: 'CIRCO VERA CRUZ MEXICANO',
    mediaUrl: 'https://drive.google.com/open?id=1yTKBOViBW6GDcDhCPt8DNe_L1UVuK69_',
    caption: 'Una noche de magia y tacos en Gral. Rodríguez 🎪🌮',
    stickers: ['balloon', 'heart']
  },
  {
    id: 'nerdearla',
    order: 14,
    layout: 'collage',
    section: 'Actividades Favoritas',
    content: 'Nerdearla Santander Cloud | Salidas | Cine',
    mediaUrl: 'https://drive.google.com/open?id=1X63ZX7Lnmtj8NzC-1m1Q4lWT0Gols2nn, https://drive.google.com/open?id=1JKzKQBF1s4agMe7i6oTLxf9PaCHJWpB-, https://drive.google.com/open?id=19uBDHRFrrddpg20mZP2PYr-B1u7A8GJM',
    caption: 'Nuestras salidas por Buenos Aires y eventos IT de 2024 y 2025',
    stickers: ['star', 'compass']
  },

  // ========== MASCOTAS ==========
  {
    id: 'mascotas',
    order: 15,
    layout: 'collage',
    section: 'Mascotas',
    content: 'Pancho | Dulce | Camilín',
    mediaUrl: 'https://drive.google.com/open?id=1Z3ji6Nz2eyuG9HBOfyHFUIZwgPIbdh9C',
    caption: 'Nuestros compañeros de cuatro patas en sus mejores momentos 🐾',
    stickers: ['heart', 'capybara']
  },

  // ========== CUMPLEAÑOS ==========
  {
    id: 'cumples-fotos',
    order: 16,
    layout: 'collage',
    section: 'Cumpleaños',
    content: 'Puerto Madero (10/09/24) | Rodríguez (10/09/25) | Tigre (08/11/24)',
    mediaUrl: '',
    caption: 'Desde que fui chiquito mi mamita me enseñó que buscara una niñita tan bonita como vos ❤️',
    stickers: ['capybara', 'star']
  },
  {
    id: 'cine-4d',
    order: 17,
    layout: 'collage',
    section: 'Cumpleaños',
    content: 'CUMPLE MARTÍN 2025 - 4D EXPERIENCE',
    mediaUrl: 'https://drive.google.com/open?id=1pA3dC3QQDKeIv1S4onaW6t1dFy3qb0Zs, https://drive.google.com/open?id=1WSifFdyoLC35fr1htOFPIoixahFvdN3t, https://drive.google.com/open?id=1bxgvBdAyIU8ic-MM0ivV6bdIfpw8cBvk, https://drive.google.com/open?id=1yyFPB7WqPUCltUOl37SLFWplRveY-vII',
    caption: 'Shopping DOT - Demon Slayer en 4D fue una locura ⚔️',
    stickers: ['heart', 'balloon']
  },
  {
    id: 'cumple-cami',
    order: 17.5,
    layout: 'collage',
    section: 'Cumpleaños',
    content: 'CUMPLE CAMI 2025 - FESTEJOS',
    mediaUrl: 'https://drive.google.com/open?id=1DrqnLYFnoeIXhTmBLYFRGXdcUgsFD9i0, https://drive.google.com/open?id=1QGcHon1gXwqddro6Nv-LKyQpJzZ44PED, https://drive.google.com/open?id=1ZlZ8MAE1_WoJSgVQjxP8Q3TmSOZy9qla, https://drive.google.com/open?id=1aQf3PJ7NgyfZCBWEpH9ej5vj8qw_fNrO, https://drive.google.com/open?id=1rbfSMpiaC3E8Si-uXgyiX0OiAYq3xdhK, https://drive.google.com/open?id=1WWNWp6YXTmcw7EDETtspKGK4agnmo1bf, https://drive.google.com/open?id=1GU7EoqUvYRBk6Dv3qkuvLwjXupiF-Jlr, https://drive.google.com/open?id=12XKVYJKJRYBqHaxpf-DrvaQJZ5M1R414',
    caption: 'Celebrando a la mejor ingeniera ambiental en su día especial 🌿🎂',
    stickers: ['heart', 'star', 'balloon']
  },

  // ========== VACACIONES ==========
  {
    id: 'mar-del-plata',
    order: 18,
    layout: 'photo_single',
    section: 'Vacaciones',
    content: 'Mar del Plata 🌊',
    mediaUrl: '',
    caption: 'Selfie en la playa y caminata nocturna por el Lobo Marino',
    stickers: ['capybara', 'stamp_travel']
  },

  // ========== LIBROS FAVORITOS ==========
  {
    id: 'librerias',
    order: 19,
    layout: 'collage',
    section: 'Libros Favoritos',
    content: 'Librería Macondo | Menta Fresca | El Ateneo',
    mediaUrl: '',
    caption: 'Aniversario 1er Beso (29/03/24) • Funda de regalo (29/03/25) 📚',
    stickers: ['heart', 'star']
  },
  {
    id: 'cien-anos',
    order: 20,
    layout: 'quote_center',
    section: 'Libros Favoritos',
    content: 'CIEN AÑOS DE SOLEDAD 🦋',
    mediaUrl: '',
    caption: 'El primer libro del que hablamos y que Martín me empezó a leer',
    stickers: ['heart']
  },
  {
    id: 'cien-anos-checklist',
    order: 21,
    layout: 'checklist',
    section: 'Libros Favoritos',
    content: 'Mariposas amarillas | Pelotón de fusilamiento | La estirpe de los Buendía',
    mediaUrl: '',
    caption: 'García Márquez - Real Academia Española',
    stickers: ['star']
  },
  {
    id: 'sueno-galileo',
    order: 22,
    layout: 'photo_single',
    section: 'Libros Favoritos',
    content: 'EL SUEÑO DE GALILEO - Kim Stanley Robinson',
    mediaUrl: '',
    caption: 'Descubriendo las leyes que Dios usó para crear el mundo 🔭',
    stickers: ['compass', 'star']
  },
  {
    id: 'poema-amor',
    order: 23,
    layout: 'quote_center',
    section: 'Libros Favoritos',
    content: 'Amada y amante, mujer amiga. Hoy te quiero contar cuanto te amo, mi vida.',
    mediaUrl: '',
    caption: 'Noche de observación - "Mama Celeste" 🌌',
    stickers: ['heart']
  },
  {
    id: 'lunas-jupiter',
    order: 24,
    layout: 'checklist',
    section: 'Libros Favoritos',
    content: 'Ío (400 volcanes) | Europa (Hielo de agua) | Calisto (Roca y hielo) | Ganímedes (Agua interna)',
    mediaUrl: '',
    caption: 'Júpiter tiene 95 lunas - 4 Galileanas (1610) 🪐',
    stickers: ['star', 'compass']
  },
  {
    id: 'planetario',
    order: 25,
    layout: 'photo_single',
    section: 'Libros Favoritos',
    content: 'PLANETARIO GALILEO GALILEI',
    mediaUrl: '',
    caption: 'Aprehensión y Epifanía - Juntos damos un pasito hacia el bien',
    stickers: ['star', 'compass']
  },
  {
    id: 'playlists',
    order: 26,
    layout: 'checklist',
    section: 'Libros Favoritos',
    content: 'Martin-swan List | Camilín List | Playlist: Street Fighter Couple',
    mediaUrl: '',
    caption: 'Street Fighter dio origen al nombre de nuestra playlist en Spotify 🎧',
    stickers: ['heart', 'star']
  },
  {
    id: 'hikikomori',
    order: 27,
    layout: 'quote_center',
    section: 'Libros Favoritos',
    content: 'HIKIKOMORI, FUTUOKO Y NEKO 🐈',
    mediaUrl: '',
    caption: '1ra vez que fuimos juntos a Yenny de Plaza Oeste',
    stickers: ['heart']
  },
  {
    id: 'judge-manga',
    order: 28,
    layout: 'photo_single',
    section: 'Libros Favoritos',
    content: 'JUDGE - Nuestro primer manga juntos 📖',
    mediaUrl: '',
    caption: 'Tomo 1 y 2 de Martín. Tomos 3 al 6 juntos. Yo tengo los impares, él los pares ❤️',
    stickers: ['star', 'heart']
  },
  {
    id: 'solanin',
    order: 29,
    layout: 'quote_center',
    section: 'Libros Favoritos',
    content: 'SOLANIN - Inio Asano 🎸',
    mediaUrl: '',
    caption: 'Terminamos de leerlo en Carlos Keen - Abril 2025',
    stickers: ['star', 'heart']
  },
  {
    id: 'esperanza',
    order: 30,
    layout: 'checklist',
    section: 'Libros Favoritos',
    content: 'Aprehender la felicidad | Cantar aunque el mundo sea difícil | PEQUEÑA ESPERANZA ✨',
    mediaUrl: '',
    caption: 'Juntos vamos a dar un pasito hacia el bien',
    stickers: ['heart']
  },
  {
    id: 'cosas-fuego',
    order: 31,
    layout: 'quote_center',
    section: 'Libros Favoritos',
    content: 'LAS COSAS QUE PERDIMOS EN EL FUEGO 🔥',
    mediaUrl: '',
    caption: 'Patio del Vecino - Mariana Enriquez',
    stickers: ['star', 'heart']
  },

  // ========== ANIMES FAVORITOS ==========
  {
    id: 'animes',
    order: 32,
    layout: 'collage',
    section: 'Animes Favoritos',
    content: 'One Piece | Demon Slayer | Spy x Family | Jujutsu Kaisen | DBZ',
    mediaUrl: '',
    caption: 'Luffy, Nezuko, Anya, Gojo y Goku - Vibeando juntos 🐱',
    stickers: ['heart', 'star']
  },

  // ========== SERIES FAVORITAS ==========
  {
    id: 'series',
    order: 33,
    layout: 'checklist',
    section: 'Series Favoritas',
    content: 'Breaking Bad (Heisenberg) | El Eternauta (Juan Salvo)',
    mediaUrl: '',
    caption: 'Íconos que marcaron nuestras maratones 📺',
    stickers: ['heart', 'star']
  },

  // ========== PELÍCULAS FAVORITAS ==========
  {
    id: 'peliculas',
    order: 34,
    layout: 'checklist',
    section: 'Películas Favoritas',
    content: 'Las Reliquias de la Muerte: La Varita de Saúco | La Piedra de la Resurrección | La Capa de Invisibilidad',
    mediaUrl: '',
    caption: 'Hermanos Peverell - Siempre Potterheads ⚡',
    stickers: ['heart', 'star']
  },

  // ========== ANIMES FAVORITOS (Continuación) ==========
  {
    id: 'nekoverse',
    order: 35,
    layout: 'collage',
    section: 'Animes Favoritos',
    content: 'Monkey D. Luffy | Sanji | Roronoa Zoro | Nezuko Kamado | Tanjiro Kamado | Mitsuri Kanroji | Anya Forger | Satoru Gojo | Goku',
    mediaUrl: '',
    caption: 'Nuestro "Nekoverse" de personajes favoritos 🐱✨',
    stickers: ['heart', 'star']
  },
  {
    id: 'one-piece-universe',
    order: 36,
    layout: 'quote_center',
    section: 'Animes Favoritos',
    content: 'ONE PIECE UNIVERSE 🏴‍☠️',
    mediaUrl: '',
    caption: 'Episodio 169: Las islas del sur son cálidas... | Episodio 1: "Tómalo y cuídalo bien" (Shanks)',
    stickers: ['heart', 'star']
  },
  {
    id: 'going-merry',
    order: 37,
    layout: 'quote_center',
    section: 'Animes Favoritos',
    content: '¡MUCHAS GRACIAS, YO SIEMPRE HE SIDO MUY FELIZ! 🌸',
    mediaUrl: '',
    caption: 'Episodio 312: Adiós al Going Merry - Water Seven',
    stickers: ['heart', 'star']
  },

  // ========== CANCIONES FAVORITAS ==========
  {
    id: 'sigrid',
    order: 38,
    layout: 'checklist',
    section: 'Canciones Favoritas',
    content: 'It Gets Dark | Burning Bridges | Plot Twist | Sucker Punch | Mine Right Now | High Five | Home to You',
    mediaUrl: '',
    caption: 'Sigrid en vivo - Teatro Vorterix (24/05/24) 🎤',
    stickers: ['heart', 'star']
  },
  {
    id: 'sigrid-photo',
    order: 39,
    layout: 'photo_single',
    section: 'Canciones Favoritas',
    content: 'LA BELLA SIGRID CANTANDO 🌟',
    mediaUrl: '',
    caption: 'MacDonalds cercano al Vorterix después del show',
    stickers: ['heart', 'star']
  },
  {
    id: 'hay-data-fest',
    order: 40,
    layout: 'collage',
    section: 'Canciones Favoritas',
    content: 'Hagov | Magios | Vicente Colombo | Homero 2000',
    mediaUrl: '',
    caption: 'HAY DATA? FEST N°1 - Laberinto Morón (29/06/24) 🎸',
    stickers: ['heart', 'star']
  },
  {
    id: 'dillom',
    order: 41,
    layout: 'photo_single',
    section: 'Canciones Favoritas',
    content: 'DILLOM - SHOW LIBRE Y GRATUITO 🤘',
    mediaUrl: '',
    caption: 'Festival FU Moreno - Plaza Buján (21/09/24)',
    stickers: ['heart', 'star']
  },
  {
    id: 'dandara',
    order: 42,
    layout: 'checklist',
    section: 'Canciones Favoritas',
    content: 'Rocket Powers | Cirugía | La Primera | 220 | Post Mortem | Pelotuda',
    mediaUrl: '',
    caption: 'Dandara: Me basta cuando me cansé de mí...',
    stickers: ['star']
  },
  {
    id: 'libre',
    order: 43,
    layout: 'quote_center',
    section: 'Canciones Favoritas',
    content: 'NADIE QUE TE RECORTE, TE QUIERE LIBRE 🕊️',
    mediaUrl: '',
    caption: 'Line Up: Malena D’Alessio, Aura, Actitud María Marta, Oney1',
    stickers: ['heart']
  },
  {
    id: 'fu-2023',
    order: 44,
    layout: 'photo_single',
    section: 'Canciones Favoritas',
    content: 'FESTIVAL FU MORENO 2023',
    mediaUrl: '',
    caption: '21/09/23 - Seguimos en la patria',
    stickers: ['heart', 'star']
  },

  // ========== CANCIONES FAVORITAS (Sección Hozier) ==========
  {
    id: 'hozier',
    order: 45,
    layout: 'photo_single',
    section: 'Canciones Favoritas',
    content: 'HOZIER - MOVISTAR ARENA 🎤',
    mediaUrl: '',
    caption: 'Fecha: 27/05/2024 • Teloneros: Isu de cams, Gigi Perez',
    stickers: ['heart', 'star']
  },
  {
    id: 'hozier-songs-1',
    order: 46,
    layout: 'checklist',
    section: 'Canciones Favoritas',
    content: 'De Selby (Part 1 & 2) | Jackie and Wilson | Nobody\'s Soldier | Eat Your Young | Angel of Small Death | Dinner and Diatribes',
    mediaUrl: '',
    caption: 'Trína chéile, le chéile claochláite (Juntos: Transformados juntos)',
    stickers: ['heart', 'star']
  },
  {
    id: 'hozier-emotional',
    order: 47,
    layout: 'quote_center',
    section: 'Canciones Favoritas',
    content: 'FRANCESCA • IT WILL COME BACK • LIKE REAL PEOPLE DO',
    mediaUrl: '',
    caption: 'Canciones que nos hacen llorar juntos 💔',
    stickers: ['heart']
  },
  {
    id: 'hozier-songs-2',
    order: 48,
    layout: 'checklist',
    section: 'Canciones Favoritas',
    content: 'From Eden | I, Carrion | Abstract | Too Sweet | Someone New | Almost (Sweet Music) | Movement | Take me to Church | Cherry Wine',
    mediaUrl: '',
    caption: 'Hay algo mágico en vos, algo tan mágico ✨',
    stickers: ['heart', 'star']
  },
  {
    id: 'hozier-power',
    order: 49,
    layout: 'quote_center',
    section: 'Canciones Favoritas',
    content: 'UNKNOWN/NTH • NINA CRIED POWER • WORK SONG',
    mediaUrl: '',
    caption: 'Las canciones más emotivas del show',
    stickers: ['heart', 'star']
  },
  {
    id: 'hozier-flowers',
    order: 50,
    layout: 'photo_single',
    section: 'Canciones Favoritas',
    content: 'FIRST TIME • SUNLIGHT • SHRIKE • FOREIGNER\'S GOD',
    mediaUrl: '',
    caption: 'Flores que dejó mi madre - Recuerdos hermosos 🌻',
    stickers: ['heart', 'star']
  },

  // ========== CANCIONES FAVORITAS (Sección Norah Jones) ==========
  {
    id: 'norah-jones',
    order: 51,
    layout: 'photo_single',
    section: 'Canciones Favoritas',
    content: 'NORAH JONES - VISIONS TOUR 2024 🎹',
    mediaUrl: '',
    caption: 'Movistar Arena - Una noche mágica al piano',
    stickers: ['heart', 'star']
  },
  {
    id: 'norah-songs-1',
    order: 52,
    layout: 'checklist',
    section: 'Canciones Favoritas',
    content: 'What am I to you? | Paradise | Running | Sunrise | After the Fall | I\'m Alive | I just wanna dance | Hurts to be alone | Visions | Little Broken Hearts | Staring at the wall',
    mediaUrl: '',
    caption: 'Una voz que nos lleva a otro mundo',
    stickers: ['star']
  },
  {
    id: 'norah-songs-2',
    order: 53,
    layout: 'checklist',
    section: 'Canciones Favoritas',
    content: 'Come away with me | Happy Pills | All a dream | Turn me on | The long way home | Don\'t know why | All this time',
    mediaUrl: '',
    caption: 'Como una flor esperando florecer... 🌸',
    stickers: ['heart', 'star']
  },

  // ========== COMIDAS FAVORITAS ==========
  {
    id: 'comidas-title',
    order: 54,
    layout: 'quote_center',
    section: 'Comidas Favoritas',
    content: 'EMPANADAS & HELADOS 🥟🍦',
    mediaUrl: '',
    caption: 'Val Anco - Los mejores helados',
    stickers: ['heart', 'star']
  },
  {
    id: 'comidas-list',
    order: 55,
    layout: 'checklist',
    section: 'Comidas Favoritas',
    content: 'Empanadas | Helados Val Anco',
    mediaUrl: '',
    caption: 'Sección en construcción... (Falta completar) 🍕🍦',
    stickers: ['heart', 'star']
  },

  // ========== NUESTRAS METAS ==========
  {
    id: 'metas-checklist',
    order: 56,
    layout: 'checklist',
    section: 'Nuestras Metas',
    content: 'Ver auroras boreales juntos | Adoptar una mascota | Viajar a París | Aprender a bailar juntos | Vivir juntos | Envejecer de la mano | Tener nuestra propia casa | Ir a ver el amanecer a la montaña',
    mediaUrl: '',
    caption: 'Stuff we are going to do ✨',
    stickers: ['balloon', 'heart']
  },

  // ========== PARQUE DE LA COSTA ==========
  {
    id: 'parque-costa-title',
    order: 57,
    layout: 'quote_center',
    section: 'Parque de la Costa',
    content: 'PARQUE DE LA COSTA con el AMOR de mi vida',
    mediaUrl: '',
    caption: '',
    stickers: ['heart', 'star']
  },
  {
    id: 'parque-costa-1',
    order: 58,
    layout: 'photo_single',
    section: 'Parque de la Costa',
    content: '',
    mediaUrl: 'https://drive.google.com/file/d/101Z_AH62sBK9BIx59SHyeZ1o8Viir5oJ/view?usp=drive_link',
    caption: 'Momentos mágicos juntos 🎢',
    stickers: ['balloon']
  },
  {
    id: 'parque-costa-collage-1',
    order: 59,
    layout: 'collage',
    section: 'Parque de la Costa',
    content: 'Aventuras en el parque ❤️',
    mediaUrl: 'https://drive.google.com/file/d/1thCSJ3bt5mjvOR_B5PHP9WGzYu6C1mpu/view?usp=drive_link, https://drive.google.com/file/d/1qj7BLyWTCqRP8ydxLF0gaGiHdHTgqhA1/view?usp=drive_link, https://drive.google.com/file/d/1UfzQHBCoS032_aY1CsYB1Vp8Cml_ZoaW/view?usp=drive_link',
    caption: '',
    stickers: ['heart']
  },
  {
    id: 'parque-costa-2',
    order: 60,
    layout: 'photo_single',
    section: 'Parque de la Costa',
    content: '',
    mediaUrl: 'https://drive.google.com/file/d/1Iddir03x-nWSww4LLfcavlmoHGMRC_Pw/view?usp=drive_link',
    caption: 'Tu sonrisa ilumina todo 💕',
    stickers: ['grape_soda']
  },
  {
    id: 'parque-costa-collage-2',
    order: 61,
    layout: 'collage',
    section: 'Parque de la Costa',
    content: 'Cada segundo contigo es especial',
    mediaUrl: 'https://drive.google.com/file/d/1HEBgYK_StC2I2vuFW5DaGjORVTIjbW84/view?usp=drive_link, https://drive.google.com/file/d/1GUwjdTjFXdiWQNSGV8dQCfZTb20YQVGl/view?usp=drive_link, https://drive.google.com/file/d/1C0HPJRZzK5elHY5n4FevA1IP_0y1WAdc/view?usp=drive_link',
    caption: '',
    stickers: ['star']
  },
  {
    id: 'parque-costa-3',
    order: 62,
    layout: 'photo_single',
    section: 'Parque de la Costa',
    content: '',
    mediaUrl: 'https://drive.google.com/file/d/17Iq7mfYczR2ragvdeBYWKQK7CC0Pc8-M/view?usp=drive_link',
    caption: 'Risas y adrenalina 🎡',
    stickers: ['balloon']
  },
  {
    id: 'parque-costa-final',
    order: 63,
    layout: 'photo_single',
    section: 'Parque de la Costa',
    content: '',
    mediaUrl: 'https://drive.google.com/file/d/14dF1WchTppZ--Y-Wr9ZpwDBcnpWSr-1t/view?usp=drive_link',
    caption: 'El mejor día de todos ✨',
    stickers: ['heart', 'stamp_travel']
  }
];
