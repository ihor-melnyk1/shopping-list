export interface Item {
  id: string;
  name: string;
  quantity: number;
  category: string;
  purchased: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface ItemFormData {
  name: string;
  quantity: number;
  category: string;
}