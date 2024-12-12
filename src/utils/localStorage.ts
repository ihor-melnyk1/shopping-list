import { Item } from '../types';

const STORAGE_KEY = 'shopping-list-items';

export const loadItems = (): Item[] => {
  try {
    const items = localStorage.getItem(STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error('Error loading items:', error);
    return [];
  }
};

export const saveItems = (items: Item[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving items:', error);
  }
};