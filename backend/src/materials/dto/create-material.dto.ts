import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUrl()
  fileUrl: string;
}
