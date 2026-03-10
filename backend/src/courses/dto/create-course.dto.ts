import { IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @MaxLength(20)
  code: string;

  @IsString()
  @MaxLength(255)
  title: string;

  @IsUUID()
  departmentId: string;
}
