import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';

@Controller('api/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createNoteDto: CreateNoteDto) {
    return await this.notesService.create(createNoteDto);
  }

  @Get()
  async findAll(@Query('archived') archived?: string, @Query('categoryId') categoryId?: string) {
    if (categoryId) {
      return await this.notesService.findByCategory(categoryId);
    }
    
    if (archived === 'true') {
      return await this.notesService.findArchived();
    } else if (archived === 'false') {
      return await this.notesService.findActive();
    }
    
    return await this.notesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.notesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return await this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.notesService.remove(id);
  }

  @Patch(':id/archive')
  async archive(@Param('id') id: string) {
    return await this.notesService.archive(id);
  }

  @Patch(':id/unarchive')
  async unarchive(@Param('id') id: string) {
    return await this.notesService.unarchive(id);
  }
}
