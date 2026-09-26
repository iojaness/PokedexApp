export const TYPE_COLORS: Record<string, string> = {
  normal: '#A0A29F',
  fire: '#FBA54C',
  water: '#539DDF',
  electric: '#F2D94E',
  grass: '#5FBD58',
  ice: '#75D0C1',
  fighting: '#D3425F',
  poison: '#B763CF',
  ground: '#DA7C4D',
  flying: '#A1BBEC',
  psychic: '#FA8581',
  bug: '#92BC2C',
  rock: '#C9BB8A',
  ghost: '#5F6DBC',
  dragon: '#0C69C8',
  dark: '#595761',
  steel: '#5695A3',
  fairy: '#EE90E6',
};

const TYPE_ICON_BASE_URL =
  'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons';

export function getTypeColor(type: string): string {
  return TYPE_COLORS[type] ?? '#A0A29F';
}

export function getTypeIconUrl(type: string): string {
  return `${TYPE_ICON_BASE_URL}/${type}.svg`;
}