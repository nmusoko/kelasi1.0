import { ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from '../common/constants/roles.enum';
import { PrismaService } from '../prisma/prisma.service';
import { AssignProfessorDto } from './dto/assign-professor.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { EnrollStudentDto } from './dto/enroll-student.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  createCourse(dto: CreateCourseDto) {
    return this.prisma.course.create({
      data: {
        code: dto.code,
        title: dto.title,
        departmentId: dto.departmentId,
      },
    });
  }

  async listCourses(user: { id: string; role: Role }) {
    if (user.role === Role.ADMIN) {
      return this.prisma.course.findMany({
        include: {
          department: true,
          professor: { include: { user: true } },
          enrollments: { include: { student: { include: { user: true } } } },
        },
      });
    }

    if (user.role === Role.PROFESSOR) {
      const professor = await this.prisma.professor.findUnique({
        where: { userId: user.id },
      });
      if (!professor) return [];
      return this.prisma.course.findMany({
        where: { professorId: professor.id },
        include: { department: true },
      });
    }

    if (user.role === Role.STUDENT) {
      const student = await this.prisma.student.findUnique({ where: { userId: user.id } });
      if (!student) return [];
      return this.prisma.course.findMany({
        where: { enrollments: { some: { studentId: student.id } } },
        include: { department: true },
      });
    }

    throw new ForbiddenException('Role not allowed to view courses');
  }

  enrollStudent(courseId: string, dto: EnrollStudentDto) {
    return this.prisma.enrollment.create({
      data: {
        courseId,
        studentId: dto.studentId,
      },
    });
  }

  assignProfessor(courseId: string, dto: AssignProfessorDto) {
    return this.prisma.course.update({
      where: { id: courseId },
      data: {
        professorId: dto.professorId,
      },
    });
  }
}
