import axios from 'axios';
import { Note, Category, CreateNoteDto, UpdateNoteDto, CreateCategoryDto, UpdateCategoryDto } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const notesApi = {
  getAll: (archived?: boolean, categoryId?: string) => {
    const params = new URLSearchParams();
    if (archived !== undefined) params.append('archived', String(archived));
    if (categoryId) params.append('categoryId', categoryId);
    return api.get<Note[]>(`/api/notes?${params.toString()}`);
  },

  getOne: (id: string) => api.get<Note>(`/api/notes/${id}`),

  create: (data: CreateNoteDto) => api.post<Note>('/api/notes', data),

  update: (id: string, data: UpdateNoteDto) => api.put<Note>(`/api/notes/${id}`, data),

  delete: (id: string) => api.delete(`/api/notes/${id}`),

  archive: (id: string) => api.patch<Note>(`/api/notes/${id}/archive`),

  unarchive: (id: string) => api.patch<Note>(`/api/notes/${id}/unarchive`),
};


export const categoriesApi = {
  getAll: () => api.get<Category[]>('/api/categories'),

  getOne: (id: string) => api.get<Category>(`/api/categories/${id}`),

  create: (data: CreateCategoryDto) => api.post<Category>('/api/categories', data),

  update: (id: string, data: UpdateCategoryDto) => api.put<Category>(`/api/categories/${id}`, data),

  delete: (id: string) => api.delete(`/api/categories/${id}`),
};
