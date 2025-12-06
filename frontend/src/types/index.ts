export interface Note {
  id: string;
  title: string;
  content: string;
  archived: boolean;
  categories: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteDto {
  title: string;
  content: string;
  categoryIds?: string[];
}

export interface UpdateNoteDto {
  title?: string;
  content?: string;
  archived?: boolean;
  categoryIds?: string[];
}

export interface CreateCategoryDto {
  name: string;
  color?: string;
}

export interface UpdateCategoryDto {
  name?: string;
  color?: string;
}
