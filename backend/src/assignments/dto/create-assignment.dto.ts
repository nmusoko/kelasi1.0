import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  dueDate: string;
}
