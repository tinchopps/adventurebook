/**
 * Generates a random rotation class for organic imperfection
 * @returns {string} Tailwind rotation class
 */
export const getRandomRotation = () => {
  const rotations = ['rotate-1', 'rotate-2', 'rotate-3', '-rotate-1', '-rotate-2', '-rotate-3'];
  return rotations[Math.floor(Math.random() * rotations.length)];
};

/**
 * Generates a seeded random rotation (consistent per element)
 * @param {string} seed - Seed string for consistent randomness
 * @returns {string} Tailwind rotation class
 */
export const getSeededRotation = (seed) => {
  const rotations = ['rotate-1', 'rotate-2', 'rotate-3', '-rotate-1', '-rotate-2', '-rotate-3'];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  return rotations[Math.abs(hash) % rotations.length];
};

/**
 * Generates random offset for stickers/elements
 * @param {string} seed - Seed for consistent positioning
 * @returns {{ x: number, y: number }}
 */
export const getRandomOffset = (seed) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  return {
    x: (Math.abs(hash) % 20) - 10,
    y: (Math.abs(hash >> 8) % 20) - 10
  };
};

/**
 * Corner positions for stickers
 */
export const cornerPositions = {
  topLeft: { top: '10px', left: '10px' },
  topRight: { top: '10px', right: '10px' },
  bottomLeft: { bottom: '10px', left: '10px' },
  bottomRight: { bottom: '10px', right: '10px' },
};
