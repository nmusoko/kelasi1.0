import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '../common/constants/roles.enum';
import { AuthUser } from '../common/types/auth-user.type';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CourseAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async ensureCourseExists(courseId: string) {
    const course = await this.prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async ensureProfessorAssigned(user: AuthUser, courseId: string) {
    if (user.role !== Role.PROFESSOR) {
      throw new ForbiddenException('Only professors can perform this action');
    }

    const professor = await this.prisma.professor.findUnique({ where: { userId: user.id } });
    if (!professor) {
      throw new ForbiddenException('Professor profile not found');
    }

    const course = await this.ensureCourseExists(courseId);

    if (course.professorId !== professor.id) {
      throw new ForbiddenException('Professor is not assigned to this course');
    }

    return course;
  }

  async ensureCanReadCourseContent(user: AuthUser, courseId: string) {
    if (user.role === Role.ADMIN) {
      return this.ensureCourseExists(courseId);
    }

    if (user.role === Role.PROFESSOR) {
      return this.ensureProfessorAssigned(user, courseId);
    }

    if (user.role === Role.STUDENT) {
      const student = await this.prisma.student.findUnique({ where: { userId: user.id } });
      if (!student) {
        throw new ForbiddenException('Student profile not found');
      }

      const enrollment = await this.prisma.enrollment.findUnique({
        where: {
          studentId_courseId: {
            studentId: student.id,
            courseId,
          },
        },
      });

      if (!enrollment) {
        throw new ForbiddenException('Student is not enrolled in this course');
      }

      return this.ensureCourseExists(courseId);
    }

    throw new ForbiddenException('Role is not supported');
  }
}
