import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async create(categoryData: Partial<Category>): Promise<Category> {
    const category = this.repository.create(categoryData);
    return await this.repository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.repository.find({
      order: { name: 'ASC' },
    });
  }

  async findById(id: string): Promise<Category | null> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async findByIds(ids: string[]): Promise<Category[]> {
    if (!ids || ids.length === 0) return [];
    return await this.repository.find({
      where: { id: In(ids) },
    });
  }

  async findByName(name: string): Promise<Category | null> {
    return await this.repository.findOne({
      where: { name },
    });
  }

  async update(id: string, categoryData: Partial<Category>): Promise<Category | null> {
    await this.repository.update(id, categoryData);
    return await this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
