import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthUser } from '../common/types/auth-user.type';
import { CourseAccessService } from '../courses/course-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Injectable()
export class AnnouncementsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly courseAccessService: CourseAccessService,
  ) {}

  async create(courseId: string, user: AuthUser, dto: CreateAnnouncementDto) {
    await this.courseAccessService.ensureProfessorAssigned(user, courseId);

    return this.prisma.announcement.create({
      data: {
        courseId,
        title: dto.title,
        content: dto.content,
      },
    });
  }

  async listByCourse(courseId: string, user: AuthUser) {
    await this.courseAccessService.ensureCanReadCourseContent(user, courseId);

    return this.prisma.announcement.findMany({
      where: { courseId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(
    courseId: string,
    announcementId: string,
    user: AuthUser,
    dto: UpdateAnnouncementDto,
  ) {
    await this.courseAccessService.ensureProfessorAssigned(user, courseId);

    const announcement = await this.prisma.announcement.findUnique({
      where: { id: announcementId },
    });
    if (!announcement || announcement.courseId !== courseId) {
      throw new NotFoundException('Announcement not found for this course');
    }

    return this.prisma.announcement.update({
      where: { id: announcementId },
      data: dto,
    });
  }

  async remove(courseId: string, announcementId: string, user: AuthUser) {
    await this.courseAccessService.ensureProfessorAssigned(user, courseId);

    const announcement = await this.prisma.announcement.findUnique({
      where: { id: announcementId },
    });
    if (!announcement || announcement.courseId !== courseId) {
      throw new NotFoundException('Announcement not found for this course');
    }

    await this.prisma.announcement.delete({ where: { id: announcementId } });
    return { success: true };
  }
}
