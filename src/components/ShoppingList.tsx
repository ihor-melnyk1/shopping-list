import React from 'react';
import { Check, Edit2, Trash2 } from 'lucide-react';
import { Item } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectFilteredItems } from '../store/selectors/shoppingListSelectors';
import { removeItem, togglePurchased } from '../store/slices/shoppingListSlice';

interface ShoppingListProps {
  onEdit: (item: Item) => void;
}

export const ShoppingList: React.FC<ShoppingListProps> = ({
  onEdit,
}) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectFilteredItems);
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, Item[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedItems).map(([category, items]) => (
        <div key={category} className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">{category}</h3>
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className={`flex items-center justify-between p-2 rounded-lg ${
                  item.purchased ? 'bg-gray-100' : 'bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch(togglePurchased(item.id))}
                    className={`p-1 rounded-full ${
                      item.purchased
                        ? 'bg-green-500 text-white'
                        : 'border-2 border-gray-300'
                    }`}
                  >
                    <Check size={16} />
                  </button>
                  <span className={item.purchased ? 'line-through text-gray-500' : ''}>
                    {item.name} ({item.quantity})
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="p-1 text-blue-500 hover:text-blue-600"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="p-1 text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};