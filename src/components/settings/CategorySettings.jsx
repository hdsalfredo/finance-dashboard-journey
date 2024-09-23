import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from 'lucide-react';

const CategorySettings = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Food' },
    { id: 2, name: 'Transportation' },
    { id: 3, name: 'Entertainment' },
  ]);
  const [newCategory, setNewCategory] = useState('');

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { id: Date.now(), name: newCategory.trim() }]);
      setNewCategory('');
    }
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Manage Categories</h2>
      <div className="flex space-x-2">
        <Input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
        />
        <Button onClick={addCategory}><Plus className="mr-2 h-4 w-4" /> Add Category</Button>
      </div>
      <ul className="space-y-2">
        {categories.map(category => (
          <li key={category.id} className="flex justify-between items-center">
            <span>{category.name}</span>
            <Button variant="ghost" size="icon" onClick={() => deleteCategory(category.id)}>
              <Trash className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySettings;