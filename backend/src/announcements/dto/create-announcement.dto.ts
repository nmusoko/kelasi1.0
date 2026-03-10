import { IsString, MaxLength } from 'class-validator';

export class CreateAnnouncementDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  content: string;
}
