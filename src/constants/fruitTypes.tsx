export type FruitCategory = 'paramecia' | 'logia' | 'zoan' | 'other';

const CATEGORY_COLORS: Record<FruitCategory, string> = {
  paramecia: '#6f1485',
  logia: '#b3221a',
  zoan: '#2d8a36',
  other: '#5e5449',
};

const CATEGORY_ICONS: Record<FruitCategory, string> = {
  paramecia: 'hand-left-outline',
  logia: 'flame-outline',
  zoan: 'paw-outline',
  other: 'help-circle-outline',
};

export function normalizeFruitType(type: string | undefined | null): FruitCategory {
  const t = (type ?? '').toLowerCase();
  if (t.includes('zoan')) return 'zoan';
  if (t.includes('logia')) return 'logia';
  if (t.includes('paramecia')) return 'paramecia';
  return 'other';
}

export function getFruitTypeColor(type: string | undefined | null): string {
  return CATEGORY_COLORS[normalizeFruitType(type)];
}

export function getFruitTypeIcon(type: string | undefined | null): string {
  return CATEGORY_ICONS[normalizeFruitType(type)];
}