export interface Item {
  id: string;
  egg_id: string;
  price_gross: number;
  egg_type: string;
}

export interface DataStructure {
  data: {
    items: Item[];
  };
}

export type EggType = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';