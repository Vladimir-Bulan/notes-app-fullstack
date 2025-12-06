import React from 'react';
import { Note } from '@/types';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onToggleArchive: (id: string, archived: boolean) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete, onToggleArchive }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800 flex-1">{note.title}</h3>
        {note.archived && (
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
            Archived
          </span>
        )}
      </div>
      
      <p className="text-gray-600 mb-4 whitespace-pre-wrap">{note.content}</p>
      
      {note.categories && note.categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.categories.map((category) => (
            <span
              key={category.id}
              className="text-xs px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => onEdit(note)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onToggleArchive(note.id, note.archived)}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors"
        >
          {note.archived ? 'Unarchive' : 'Archive'}
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
