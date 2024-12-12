import React, { useState } from 'react';
import { Modal } from './Modal';
import { Item, ItemFormData } from '../types';
import { ItemForm } from './ItemForm';

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ItemFormData) => Promise<void>;
  item?: Item | null;
}

export const ItemModal: React.FC<ItemModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  item,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (formData: ItemFormData) => {
    try {
      setIsSubmitting(true);
      setError('');
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={item ? 'Edit Item' : 'Add New Item'}
    >
      {error && (
        <div className="mb-4 p-2 bg-red-50 text-red-500 rounded-md text-sm">
          {error}
        </div>
      )}
      <ItemForm
        onSubmit={handleSubmit}
        initialData={item ? {
          name: item.name,
          quantity: item.quantity,
          category: item.category,
        } : undefined}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
};