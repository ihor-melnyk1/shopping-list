import React, { useState } from 'react';
import { Loader2, Plus, Save } from 'lucide-react';
import { ItemFormData } from '../types';
import { SHOPPING_CATEGORIES } from '../constants/categories';

interface ItemFormProps {
  onSubmit: (data: ItemFormData) => void;
  initialData?: ItemFormData;
  isSubmitting?: boolean;
}

const DEFAULT_FORM_DATA: ItemFormData = {
  name: '',
  quantity: 1,
  category: SHOPPING_CATEGORIES[0],
};

export const ItemForm: React.FC<ItemFormProps> = ({
  onSubmit,
  initialData = DEFAULT_FORM_DATA,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<ItemFormData>(initialData);
  const [validationError, setValidationError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setValidationError('Name is required');
      return;
    }
    if (!formData.category) {
      setValidationError('Category is required');
      return;
    }
    if (formData.quantity < 1) {
      setValidationError('Quantity must be at least 1');
      return;
    }

    setValidationError('');
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {validationError && (
        <p className="text-red-500 text-sm" role="alert">
          {validationError}
        </p>
      )}
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Item Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border border-solid border-blue-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={!!validationError}
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 border border-solid border-blue-500 p-2"
            disabled={isSubmitting}
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border border-solid border-blue-500"
            disabled={isSubmitting}
            aria-required="true"
          >
            {SHOPPING_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => onSubmit(DEFAULT_FORM_DATA)}
          className="px-4 py-2 text-gray-700 hover:text-gray-900"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 size={20} className="animate-spin" />
          ) : initialData === DEFAULT_FORM_DATA ? (
            <Plus size={20} />
          ) : (
            <Save size={20} />
          )}
          {isSubmitting ? 'Saving...' : initialData === DEFAULT_FORM_DATA ? 'Add Item' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};