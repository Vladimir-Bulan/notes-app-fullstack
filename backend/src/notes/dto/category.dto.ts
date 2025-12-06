import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-F]{6}$/i, { message: 'Color must be a valid hex color code' })
  color?: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-F]{6}$/i, { message: 'Color must be a valid hex color code' })
  color?: string;
}
