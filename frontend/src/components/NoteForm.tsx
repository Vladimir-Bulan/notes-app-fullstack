import React, { useState, useEffect } from 'react';
import { Note, Category, CreateNoteDto, UpdateNoteDto } from '@/types';

interface NoteFormProps {
  note?: Note | null;
  categories: Category[];
  onSubmit: (data: any) => void | Promise<void>;
  onCancel: () => void;
}

export const NoteForm: React.FC<NoteFormProps> = ({ note, categories, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setSelectedCategories(note.categories?.map(c => c.id) || []);
    } else {
      setTitle('');
      setContent('');
      setSelectedCategories([]);
    }
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      content,
      categoryIds: selectedCategories,
    });
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {note ? 'Edit Note' : 'Create New Note'}
      </h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          placeholder="Enter note title"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={6}
          required
          placeholder="Enter note content"
        />
      </div>

      {categories.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categories (Phase 2)
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => toggleCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${selectedCategories.includes(category.id)
                  ? 'text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                style={
                  selectedCategories.includes(category.id)
                    ? { backgroundColor: category.color }
                    : {}
                }
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors font-medium"
        >
          {note ? 'Update Note' : 'Create Note'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
