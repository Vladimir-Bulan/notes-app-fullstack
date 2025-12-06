import { IsString, IsOptional, IsBoolean, IsArray, IsUUID } from 'class-validator';

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  categoryIds?: string[];
}
