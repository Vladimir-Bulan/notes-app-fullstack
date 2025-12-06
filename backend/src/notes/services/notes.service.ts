import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { NotesRepository } from '../repositories/notes.repository';
import { CategoriesRepository } from '../repositories/categories.repository';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { Note } from '../entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    private readonly notesRepository: NotesRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const { title, content, categoryIds } = createNoteDto;

    let categories = [];
    if (categoryIds && categoryIds.length > 0) {
      categories = await this.categoriesRepository.findByIds(categoryIds);
      if (categories.length !== categoryIds.length) {
        throw new BadRequestException('One or more category IDs are invalid');
      }
    }

    const note = await this.notesRepository.create({
      title,
      content,
      categories,
    });

    return note;
  }

  async findAll(): Promise<Note[]> {
    return await this.notesRepository.findAll();
  }

  async findActive(): Promise<Note[]> {
    return await this.notesRepository.findActive();
  }

  async findArchived(): Promise<Note[]> {
    return await this.notesRepository.findArchived();
  }

  async findOne(id: string): Promise<Note> {
    const note = await this.notesRepository.findById(id);
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  async findByCategory(categoryId: string): Promise<Note[]> {
    const category = await this.categoriesRepository.findById(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
    return await this.notesRepository.findByCategoryIds([categoryId]);
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.findOne(id);

    const { categoryIds, ...updateData } = updateNoteDto;

    if (categoryIds !== undefined) {
      if (categoryIds.length > 0) {
        const categories = await this.categoriesRepository.findByIds(categoryIds);
        if (categories.length !== categoryIds.length) {
          throw new BadRequestException('One or more category IDs are invalid');
        }
        note.categories = categories;
      } else {
        note.categories = [];
      }
      await this.notesRepository.update(id, { ...updateData });
      await this.notesRepository.repository.save(note);
    } else {
      await this.notesRepository.update(id, updateData);
    }

    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const note = await this.findOne(id);
    const deleted = await this.notesRepository.delete(id);
    if (!deleted) {
      throw new BadRequestException(`Failed to delete note with ID ${id}`);
    }
  }

  async archive(id: string): Promise<Note> {
    const note = await this.findOne(id);
    const archived = await this.notesRepository.archive(id);
    if (!archived) {
      throw new BadRequestException(`Failed to archive note with ID ${id}`);
    }
    return archived;
  }

  async unarchive(id: string): Promise<Note> {
    const note = await this.findOne(id);
    const unarchived = await this.notesRepository.unarchive(id);
    if (!unarchived) {
      throw new BadRequestException(`Failed to unarchive note with ID ${id}`);
    }
    return unarchived;
  }
}
