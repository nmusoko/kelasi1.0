import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../common/constants/roles.enum';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthUser } from '../common/types/auth-user.type';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Controller('courses/:id/announcements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  @Roles(Role.PROFESSOR)
  create(
    @Param('id') courseId: string,
    @Req() req: Request & { user: AuthUser },
    @Body() dto: CreateAnnouncementDto,
  ) {
    return this.announcementsService.create(courseId, req.user, dto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.PROFESSOR, Role.STUDENT)
  list(@Param('id') courseId: string, @Req() req: Request & { user: AuthUser }) {
    return this.announcementsService.listByCourse(courseId, req.user);
  }

  @Patch(':announcementId')
  @Roles(Role.PROFESSOR)
  update(
    @Param('id') courseId: string,
    @Param('announcementId') announcementId: string,
    @Req() req: Request & { user: AuthUser },
    @Body() dto: UpdateAnnouncementDto,
  ) {
    return this.announcementsService.update(courseId, announcementId, req.user, dto);
  }

  @Delete(':announcementId')
  @Roles(Role.PROFESSOR)
  remove(
    @Param('id') courseId: string,
    @Param('announcementId') announcementId: string,
    @Req() req: Request & { user: AuthUser },
  ) {
    return this.announcementsService.remove(courseId, announcementId, req.user);
  }
}
