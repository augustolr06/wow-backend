export interface ItemDTO {
  id: number;
  binding: number; // TODO: enum
  durability: number;
  inventory_type: number; // TODO: enum
  is_equippable: boolean;
  is_stackable: boolean;
  item_class: number; // TODO: itemClass
  item_stats: number;
  item_sub_class: number; // TODO: itemSubClass
  level: number;
  max_count: number;
  name: string;
  purchase_price: number;
  purchase_quantity: number;
  quality: string;
  required_level: number;
  sell_price: number;
  spells: number[];
  unique_equipped: boolean;
  weapon_stats: number;
}
