import { useEffect, useState } from 'react';
import { ShoppingList } from './components/ShoppingList';
import { CategoryFilter } from './components/CategoryFilter';
import { ItemModal } from './components/ItemModal';
import { Item, ItemFormData } from './types';
import { Plus, ShoppingCart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { 
  addItem, 
  editItem, 
  fetchItems 
} from './store/slices/shoppingListSlice';
import { 
  selectFilteredItems, 
  selectStatus,
  selectError 
} from './store/selectors/shoppingListSelectors';

const App = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectFilteredItems);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: ItemFormData) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    if (editingItem) {
      dispatch(editItem({ id: editingItem.id, data: formData }));
    } else {
      dispatch(addItem(formData));
    }
    handleCloseModal();
  };

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <ShoppingCart size={32} className="text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-900">Shopping List</h1>
            </div>
            <button
              onClick={handleOpenModal}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={20} />
              Add New
            </button>
          </div>
          <p className="text-gray-600">
            Keep track of your shopping items and never forget what you need to buy.
          </p>
        </header>

        <main className="space-y-8">
          <CategoryFilter />

          {items.length ?
            <ShoppingList
              onEdit={handleEdit}
            />
          : <div className="flex items-center justify-center">No items found in this category</div>}

          <ItemModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmit}
            item={editingItem}
          />
        </main>
      </div>
    </div>
  );
};

export default App;