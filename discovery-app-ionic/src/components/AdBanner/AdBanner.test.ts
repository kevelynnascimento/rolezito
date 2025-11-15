import { describe, it, expect } from 'vitest';

// Função helper para criar lista com anúncios
// Extraída da lógica implementada nas páginas
const createListWithAds = <T>(items: T[]): Array<{ type: 'item' | 'ad'; data?: T; adId?: string }> => {
  const listWithAds: Array<{ type: 'item' | 'ad'; data?: T; adId?: string }> = [];
  
  items.forEach((item, index) => {
    listWithAds.push({ type: 'item', data: item });
    
    // Adiciona anúncio a cada 5 itens (exceto após o último)
    if ((index + 1) % 5 === 0 && index + 1 < items.length) {
      listWithAds.push({ 
        type: 'ad', 
        adId: `ad-${Math.floor((index + 1) / 5)}` 
      });
    }
  });
  
  return listWithAds;
};

describe('AdBanner Integration Logic', () => {
  describe('createListWithAds', () => {
    it('should not add any ads for less than 6 items', () => {
      const items = [1, 2, 3, 4, 5];
      const result = createListWithAds(items);
      
      expect(result).toHaveLength(5);
      expect(result.every(item => item.type === 'item')).toBe(true);
    });

    it('should add one ad after every 5 items', () => {
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const result = createListWithAds(items);
      
      // 10 items + 1 ad (after item 5)
      expect(result).toHaveLength(11);
      
      // Ad should be at position 5 (after 5 items)
      expect(result[5].type).toBe('ad');
      expect(result[5].adId).toBe('ad-1');
    });

    it('should add two ads for 15 items', () => {
      const items = Array.from({ length: 15 }, (_, i) => i + 1);
      const result = createListWithAds(items);
      
      // 15 items + 2 ads (after items 5 and 10)
      expect(result).toHaveLength(17);
      
      // First ad after 5 items (position 5)
      expect(result[5].type).toBe('ad');
      expect(result[5].adId).toBe('ad-1');
      
      // Second ad after 10 items (position 11, considering first ad)
      expect(result[11].type).toBe('ad');
      expect(result[11].adId).toBe('ad-2');
    });

    it('should not add ad after the last item', () => {
      const items = [1, 2, 3, 4, 5]; // Exactly 5 items
      const result = createListWithAds(items);
      
      expect(result).toHaveLength(5);
      expect(result[result.length - 1].type).toBe('item');
    });

    it('should maintain correct item order', () => {
      const items = [1, 2, 3, 4, 5, 6, 7];
      const result = createListWithAds(items);
      
      const itemsOnly = result.filter(item => item.type === 'item');
      const itemValues = itemsOnly.map(item => item.data);
      
      expect(itemValues).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('should handle 20 items correctly', () => {
      const items = Array.from({ length: 20 }, (_, i) => i + 1);
      const result = createListWithAds(items);
      
      // 20 items + 3 ads (after items 5, 10, 15)
      expect(result).toHaveLength(23);
      
      // Count ads
      const ads = result.filter(item => item.type === 'ad');
      expect(ads).toHaveLength(3);
      
      // Verify ad positions
      expect(result[5].type).toBe('ad');   // After item 5
      expect(result[11].type).toBe('ad');  // After item 10 (+ 1 previous ad)
      expect(result[17].type).toBe('ad');  // After item 15 (+ 2 previous ads)
    });

    it('should generate unique ad IDs', () => {
      const items = Array.from({ length: 20 }, (_, i) => i + 1);
      const result = createListWithAds(items);
      
      const ads = result.filter(item => item.type === 'ad');
      const adIds = ads.map(ad => ad.adId);
      
      expect(adIds).toEqual(['ad-1', 'ad-2', 'ad-3']);
      
      // Verify uniqueness
      const uniqueIds = new Set(adIds);
      expect(uniqueIds.size).toBe(adIds.length);
    });

    it('should work with empty array', () => {
      const items: number[] = [];
      const result = createListWithAds(items);
      
      expect(result).toHaveLength(0);
    });

    it('should work with single item', () => {
      const items = [1];
      const result = createListWithAds(items);
      
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('item');
      expect(result[0].data).toBe(1);
    });

    it('should work with complex objects', () => {
      const places = [
        { id: '1', title: 'Place 1' },
        { id: '2', title: 'Place 2' },
        { id: '3', title: 'Place 3' },
        { id: '4', title: 'Place 4' },
        { id: '5', title: 'Place 5' },
        { id: '6', title: 'Place 6' },
      ];
      
      const result = createListWithAds(places);
      
      // 6 places + 1 ad
      expect(result).toHaveLength(7);
      
      // Verify structure
      expect(result[0].type).toBe('item');
      expect(result[0].data).toEqual({ id: '1', title: 'Place 1' });
      
      expect(result[5].type).toBe('ad');
      expect(result[5].adId).toBe('ad-1');
    });
  });

  describe('Ad placement pattern', () => {
    it('should follow the pattern: 5 items, ad, 5 items, ad, etc.', () => {
      const items = Array.from({ length: 25 }, (_, i) => i + 1);
      const result = createListWithAds(items);
      
      // Expected pattern:
      // Items 1-5 → Ad → Items 6-10 → Ad → Items 11-15 → Ad → Items 16-20 → Ad → Items 21-25
      
      const adPositions: number[] = [];
      result.forEach((item, index) => {
        if (item.type === 'ad') {
          adPositions.push(index);
        }
      });
      
      // Expected ad positions: 5, 11, 17, 23 (in the result array)
      expect(adPositions).toEqual([5, 11, 17, 23]);
    });

    it('should maintain 5-item spacing between ads', () => {
      const items = Array.from({ length: 30 }, (_, i) => i + 1);
      const result = createListWithAds(items);
      
      const adPositions: number[] = [];
      result.forEach((item, index) => {
        if (item.type === 'ad') {
          adPositions.push(index);
        }
      });
      
      // Verify spacing between consecutive ads
      for (let i = 1; i < adPositions.length; i++) {
        const spacing = adPositions[i] - adPositions[i - 1];
        // Should be 6 (5 items + 1 ad)
        expect(spacing).toBe(6);
      }
    });
  });
});
