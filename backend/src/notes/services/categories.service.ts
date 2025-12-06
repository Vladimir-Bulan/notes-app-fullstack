import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { CategoriesRepository } from '../repositories/categories.repository';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name, color } = createCategoryDto;

    const existingCategory = await this.categoriesRepository.findByName(name);
    if (existingCategory) {
      throw new ConflictException(`Category with name "${name}" already exists`);
    }

    return await this.categoriesRepository.create({
      name,
      color: color || '#3B82F6',
    });
  }

  async findAll(): Promise<Category[]> {
    return await this.categoriesRepository.findAll();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);

    if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
      const existingCategory = await this.categoriesRepository.findByName(updateCategoryDto.name);
      if (existingCategory) {
        throw new ConflictException(`Category with name "${updateCategoryDto.name}" already exists`);
      }
    }

    const updated = await this.categoriesRepository.update(id, updateCategoryDto);
    if (!updated) {
      throw new BadRequestException(`Failed to update category with ID ${id}`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);
    const deleted = await this.categoriesRepository.delete(id);
    if (!deleted) {
      throw new BadRequestException(`Failed to delete category with ID ${id}`);
    }
  }
}
