import { IsUUID } from 'class-validator';

export class AssignProfessorDto {
  @IsUUID()
  professorId: string;
}
