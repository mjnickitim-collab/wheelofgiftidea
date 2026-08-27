import { Gift, FilterCriteria } from '../types';

export interface FilterResult {
  items: Gift[];
  relaxedMessage: string | null;
  thinWarning: boolean;
}

export function matchesField(arr: string[] | undefined, val: string): boolean {
  if (!val || val === 'any') return true;
  if (!arr || arr.length === 0) return true;
  return arr.includes('any') || arr.includes(val);
}

export function filterGifts(catalog: Gift[], criteria: FilterCriteria): FilterResult {
  const relaxationSteps: { ignores: string[]; msg: string | null }[] = [
    { ignores: [], msg: null },
    { ignores: ['occasion'], msg: 'Expanded search: Included wonderful gift ideas for other occasions.' },
    { ignores: ['occasion', 'relationship'], msg: 'Expanded search: Relaxed occasion and relationship filters to give you more options.' },
    { ignores: ['occasion', 'relationship', 'age'], msg: 'Expanded search: Showing matching gift favorites across all age groups.' },
    { ignores: ['occasion', 'relationship', 'age', 'gender'], msg: 'Expanded search: Showing universally beloved gifts that fit your budget.' },
    { ignores: ['occasion', 'relationship', 'age', 'gender', 'budget'], msg: '⚠️ Very few gifts matched every filter, so we had to include some outside your budget too.' }
  ];

  const checkGift = (gift: Gift, ignores: string[]): boolean => {
    if (!ignores.includes('budget')) {
      if (criteria.budget && criteria.budget !== 'any') {
        if (gift.budget !== 'any' && gift.budget !== criteria.budget) {
          return false;
        }
      }
    }

    if (!ignores.includes('gender')) {
      if (!matchesField(gift.genders, criteria.gender)) {
        return false;
      }
    }

    if (!ignores.includes('age')) {
      if (!matchesField(gift.ageBands, criteria.age)) {
        return false;
      }
    }

    if (!ignores.includes('relationship')) {
      if (!matchesField(gift.relationships, criteria.relationship)) {
        return false;
      }
    }

    if (!ignores.includes('occasion')) {
      if (!matchesField(gift.occasions, criteria.occasion)) {
        return false;
      }
    }

    return true;
  };

  let matchedGifts: Gift[] = [];
  let appliedMessage: string | null = null;

  for (const step of relaxationSteps) {
    const candidates = catalog.filter(g => checkGift(g, step.ignores));
    if (candidates.length >= 3 || step.ignores.includes('budget')) {
      matchedGifts = candidates;
      appliedMessage = step.msg;
      break;
    }
  }

  // Deduplicate by ID
  const uniqueMap = new Map<string, Gift>();
  for (const g of matchedGifts) {
    uniqueMap.set(g.id, g);
  }
  let uniqueList = Array.from(uniqueMap.values());

  // Shuffle without artificial duplication
  const shuffled = [...uniqueList];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Cap at 20 slices
  const finalItems = shuffled.slice(0, 20);

  return {
    items: finalItems,
    relaxedMessage: appliedMessage,
    thinWarning: finalItems.length < 6 && finalItems.length > 0
  };
}

export function pickWinningIndex(items: Gift[], lastWinningId: string | null): number {
  if (items.length <= 1) return 0;

  let chosenIndex = Math.floor(Math.random() * items.length);

  // Anti-repeat check
  if (lastWinningId && items[chosenIndex].id === lastWinningId) {
    chosenIndex = (chosenIndex + 1) % items.length;
  }

  return chosenIndex;
}
