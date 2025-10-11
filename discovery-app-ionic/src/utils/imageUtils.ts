/**
 * Utility functions for image handling and fallbacks
 */

// Fallback color palette for when images fail to load
const FALLBACK_COLORS = [
  '#A78BFA', // Primary purple
  '#10B981', // Success green
  '#F59E0B', // Warning yellow
  '#EF4444', // Danger red
  '#FF6B35', // Event orange
  '#7C5CFA', // Secondary purple
  '#6366F1', // Indigo
  '#EC4899', // Pink
];

/**
 * Generate a fallback image URL using a reliable service
 */
export function getFallbackImage(width: number, height: number, seed: string): string {
  // Using picsum.photos as backup (more reliable than via.placeholder.com)
  const seedNumber = Math.abs(hashCode(seed)) % 1000;
  return `https://picsum.photos/seed/${seedNumber}/${width}/${height}`;
}

/**
 * Generate a solid color image as ultimate fallback
 */
export function getSolidColorImage(width: number, height: number, colorIndex: number): string {
  const color = FALLBACK_COLORS[colorIndex % FALLBACK_COLORS.length].substring(1); // Remove #
  // Using a different service for solid colors
  return `https://dummyimage.com/${width}x${height}/${color}/ffffff.png`;
}

/**
 * Get primary image with fallbacks
 */
export function getImageWithFallback(
  primaryUrl: string, 
  width: number = 400, 
  height: number = 300, 
  seed: string = 'default'
): {
  primary: string;
  fallback: string;
  emergency: string;
} {
  const seedNumber = Math.abs(hashCode(seed)) % FALLBACK_COLORS.length;
  
  return {
    primary: primaryUrl,
    fallback: getFallbackImage(width, height, seed),
    emergency: getSolidColorImage(width, height, seedNumber)
  };
}

/**
 * Simple hash function to convert string to number
 */
function hashCode(str: string): number {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

/**
 * Curated image URLs for different categories
 */
export const CURATED_IMAGES = {
  bars: [
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop&crop=center',
  ],
  restaurants: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop&crop=center',
  ],
  events: [
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=300&fit=crop&crop=center',
  ],
  nightlife: [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400&h=300&fit=crop&crop=center',
  ],
  food: [
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop&crop=center',
  ]
};

/**
 * Get a curated image for a specific category
 */
export function getCuratedImage(category: keyof typeof CURATED_IMAGES, index: number = 0): string {
  const images = CURATED_IMAGES[category];
  return images[index % images.length];
}