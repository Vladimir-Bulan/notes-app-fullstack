import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Note } from '../entities/note.entity';

@Injectable()
export class NotesRepository {
  constructor(
    @InjectRepository(Note)
    public readonly repository: Repository<Note>,
  ) {}

  async create(noteData: Partial<Note>): Promise<Note> {
    const note = this.repository.create(noteData);
    return await this.repository.save(note);
  }

  async findAll(): Promise<Note[]> {
    return await this.repository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findActive(): Promise<Note[]> {
    return await this.repository.find({
      where: { archived: false },
      order: { createdAt: 'DESC' },
    });
  }

  async findArchived(): Promise<Note[]> {
    return await this.repository.find({
      where: { archived: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<Note | null> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async findByCategoryIds(categoryIds: string[]): Promise<Note[]> {
    return await this.repository
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.categories', 'category')
      .where('category.id IN (:...categoryIds)', { categoryIds })
      .orderBy('note.createdAt', 'DESC')
      .getMany();
  }

  async update(id: string, noteData: Partial<Note>): Promise<Note | null> {
    await this.repository.update(id, noteData);
    return await this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }

  async archive(id: string): Promise<Note | null> {
    return await this.update(id, { archived: true });
  }

  async unarchive(id: string): Promise<Note | null> {
    return await this.update(id, { archived: false });
  }
}
