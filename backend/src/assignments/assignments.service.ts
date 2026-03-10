import { Injectable } from '@nestjs/common';
import { AuthUser } from '../common/types/auth-user.type';
import { CourseAccessService } from '../courses/course-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly courseAccessService: CourseAccessService,
  ) {}

  async create(courseId: string, user: AuthUser, dto: CreateAssignmentDto) {
    await this.courseAccessService.ensureProfessorAssigned(user, courseId);

    return this.prisma.assignment.create({
      data: {
        courseId,
        title: dto.title,
        description: dto.description,
        dueDate: new Date(dto.dueDate),
      },
    });
  }

  async listByCourse(courseId: string, user: AuthUser) {
    await this.courseAccessService.ensureCanReadCourseContent(user, courseId);

    return this.prisma.assignment.findMany({
      where: { courseId },
      orderBy: { dueDate: 'asc' },
    });
  }
}
