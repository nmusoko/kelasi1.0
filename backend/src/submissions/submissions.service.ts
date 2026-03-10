import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '../common/constants/roles.enum';
import { AuthUser } from '../common/types/auth-user.type';
import { CourseAccessService } from '../courses/course-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';

@Injectable()
export class SubmissionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly courseAccessService: CourseAccessService,
  ) {}

  async create(assignmentId: string, user: AuthUser, dto: CreateSubmissionDto) {
    if (user.role !== Role.STUDENT) {
      throw new ForbiddenException('Only students can submit assignments');
    }

    const assignment = await this.prisma.assignment.findUnique({ where: { id: assignmentId } });
    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    await this.courseAccessService.ensureCanReadCourseContent(user, assignment.courseId);

    const student = await this.prisma.student.findUnique({ where: { userId: user.id } });
    if (!student) {
      throw new ForbiddenException('Student profile not found');
    }

    const existing = await this.prisma.submission.findUnique({
      where: {
        assignmentId_studentId: {
          assignmentId,
          studentId: student.id,
        },
      },
    });

    if (existing) {
      throw new ConflictException('Only one submission is allowed per assignment');
    }

    return this.prisma.submission.create({
      data: {
        assignmentId,
        studentId: student.id,
        content: dto.content,
      },
      include: {
        grade: true,
      },
    });
  }

  async listByAssignment(assignmentId: string, user: AuthUser) {
    const assignment = await this.prisma.assignment.findUnique({ where: { id: assignmentId } });
    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    if (user.role === Role.PROFESSOR || user.role === Role.ADMIN) {
      await this.courseAccessService.ensureCanReadCourseContent(user, assignment.courseId);

      if (user.role === Role.PROFESSOR) {
        await this.courseAccessService.ensureProfessorAssigned(user, assignment.courseId);
      }

      return this.prisma.submission.findMany({
        where: { assignmentId },
        include: {
          student: { include: { user: true } },
          grade: true,
        },
      });
    }

    if (user.role === Role.STUDENT) {
      await this.courseAccessService.ensureCanReadCourseContent(user, assignment.courseId);

      const student = await this.prisma.student.findUnique({ where: { userId: user.id } });
      if (!student) {
        throw new ForbiddenException('Student profile not found');
      }

      return this.prisma.submission.findMany({
        where: { assignmentId, studentId: student.id },
        include: { grade: true },
      });
    }

    throw new ForbiddenException('Role not allowed');
  }
}
