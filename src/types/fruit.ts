export interface FruitApiResponse {
  id: number;
  name: string;
  description?: string;
  roman_name?: string;
  type: string;
  filename?: string;
  technicalFile?: string;
}

export interface FruitData {
  id: number;
  name: string;
  romanName: string | 'NA';
  type: string;
  description: string;
  image: string | null;
}