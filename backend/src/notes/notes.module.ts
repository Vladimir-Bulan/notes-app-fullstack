import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Category } from './entities/category.entity';
import { NotesController } from './controllers/notes.controller';
import { CategoriesController } from './controllers/categories.controller';
import { NotesService } from './services/notes.service';
import { CategoriesService } from './services/categories.service';
import { NotesRepository } from './repositories/notes.repository';
import { CategoriesRepository } from './repositories/categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Category])],
  controllers: [NotesController, CategoriesController],
  providers: [
    NotesService,
    CategoriesService,
    NotesRepository,
    CategoriesRepository,
  ],
  exports: [NotesService, CategoriesService],
})
export class NotesModule {}
