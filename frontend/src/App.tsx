import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Note, Category, CreateNoteDto, UpdateNoteDto, CreateCategoryDto } from '@/types';
import { notesApi, categoriesApi } from '@/services/api';
import { NoteCard } from '@/components/NoteCard';
import { NoteForm } from '@/components/NoteForm';
import { CategoryManager } from '@/components/CategoryManager';

type ViewMode = 'active' | 'archived' | 'all';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('active');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    fetchNotes();
    fetchCategories();
  }, [viewMode, selectedCategory]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      let archived: boolean | undefined;
      if (viewMode === 'active') archived = false;
      else if (viewMode === 'archived') archived = true;

      const response = await notesApi.getAll(archived, selectedCategory);
      setNotes(response.data);
    } catch (error) {
      toast.error('Failed to fetch notes');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const handleCreateNote = async (data: CreateNoteDto) => {
    try {
      await notesApi.create(data);
      toast.success('Note created successfully');
      setShowForm(false);
      fetchNotes();
    } catch (error) {
      toast.error('Failed to create note');
      console.error(error);
    }
  };

  const handleUpdateNote = async (data: UpdateNoteDto) => {
    if (!editingNote) return;
    try {
      await notesApi.update(editingNote.id, data);
      toast.success('Note updated successfully');
      setEditingNote(null);
      setShowForm(false);
      fetchNotes();
    } catch (error) {
      toast.error('Failed to update note');
      console.error(error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await notesApi.delete(id);
      toast.success('Note deleted successfully');
      fetchNotes();
    } catch (error) {
      toast.error('Failed to delete note');
      console.error(error);
    }
  };

  const handleToggleArchive = async (id: string, currentlyArchived: boolean) => {
    try {
      if (currentlyArchived) {
        await notesApi.unarchive(id);
        toast.success('Note unarchived');
      } else {
        await notesApi.archive(id);
        toast.success('Note archived');
      }
      fetchNotes();
    } catch (error) {
      toast.error('Failed to update note');
      console.error(error);
    }
  };

  const handleCreateCategory = async (data: CreateCategoryDto) => {
    try {
      await categoriesApi.create(data);
      toast.success('Category created successfully');
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create category');
      console.error(error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await categoriesApi.delete(id);
      toast.success('Category deleted successfully');
      fetchCategories();
      if (selectedCategory === id) {
        setSelectedCategory('');
      }
    } catch (error) {
      toast.error('Failed to delete category');
      console.error(error);
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setEditingNote(null);
    setShowForm(false);
  };

  const filteredNotes = notes;

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />


      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Notes App</h1>
          <p className="text-gray-600 mt-1">Ensolvers Full Stack Challenge</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">

        <div className="mb-6 flex flex-wrap gap-4">
          <button
            onClick={() => {
              setShowForm(true);
              setEditingNote(null);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors font-medium"
          >
            + New Note
          </button>

          <button
            onClick={() => setShowCategories(!showCategories)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors font-medium"
          >
            {showCategories ? 'Hide Categories' : 'Manage Categories'}
          </button>

          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => {
                setViewMode('active');
                setSelectedCategory('');
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${viewMode === 'active'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              Active
            </button>
            <button
              onClick={() => {
                setViewMode('archived');
                setSelectedCategory('');
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${viewMode === 'archived'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              Archived
            </button>
            <button
              onClick={() => {
                setViewMode('all');
                setSelectedCategory('');
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${viewMode === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              All
            </button>
          </div>
        </div>


        {categories.length > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Category:
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-lg transition-colors ${!selectedCategory
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                All Notes
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === category.id
                    ? 'text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  style={
                    selectedCategory === category.id
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


        {showCategories && (
          <div className="mb-6">
            <CategoryManager
              categories={categories}
              onCreateCategory={handleCreateCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          </div>
        )}


        {showForm && (
          <div className="mb-6">
            <NoteForm
              note={editingNote}
              categories={categories}
              onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
              onCancel={handleCancelForm}
            />
          </div>
        )}


        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading notes...</p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No notes found.</p>
            <p className="text-gray-400 mt-2">Create your first note to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
                onToggleArchive={handleToggleArchive}
              />
            ))}
          </div>
        )}
      </main>


      <footer className="bg-white shadow-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>Ensolvers Full Stack Challenge</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
