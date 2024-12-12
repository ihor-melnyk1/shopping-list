import React from 'react';
import { Filter } from 'lucide-react';
import { SHOPPING_CATEGORIES } from '../constants/categories';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectFilter } from '../store/selectors/shoppingListSelectors';
import { setFilter } from '../store/slices/filterSlice';


export const CategoryFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(selectFilter);
  const onSelectCategory = (category: string) => dispatch(setFilter(category))
  return (
    <div className="flex items-center gap-2 mb-6">
      <Filter size={20} className="text-gray-500" />
      <select
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
        className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
      >
        <option value="all">All Categories</option>
        {SHOPPING_CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};