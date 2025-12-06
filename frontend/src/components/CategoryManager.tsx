import React, { useState } from 'react';
import { Category, CreateCategoryDto } from '@/types';

interface CategoryManagerProps {
  categories: Category[];
  onCreateCategory: (data: CreateCategoryDto) => void;
  onDeleteCategory: (id: string) => void;
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  onCreateCategory,
  onDeleteCategory,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3B82F6');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateCategory({ name, color });
    setName('');
    setColor('#3B82F6');
    setShowForm(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Categories (Phase 2)</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          {showForm ? 'Cancel' : '+ New Category'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="mb-3">
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              id="categoryName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="e.g., Work, Personal"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoryColor" className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <input
              id="categoryColor"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 px-1 py-1 border border-gray-300 rounded cursor-pointer"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Create Category
          </button>
        </form>
      )}

      <div className="space-y-2">
        {categories.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No categories yet. Create one!</p>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-medium text-gray-800">{category.name}</span>
              </div>
              <button
                onClick={() => onDeleteCategory(category.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
