import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '../common/constants/roles.enum';
import { AuthUser } from '../common/types/auth-user.type';
import { CourseAccessService } from '../courses/course-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { GradeSubmissionDto } from './dto/grade-submission.dto';

@Injectable()
export class GradesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly courseAccessService: CourseAccessService,
  ) {}

  async gradeSubmission(submissionId: string, user: AuthUser, dto: GradeSubmissionDto) {
    if (user.role !== Role.PROFESSOR) {
      throw new ForbiddenException('Only professors can grade submissions');
    }

    const submission = await this.prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        assignment: true,
      },
    });

    if (!submission) {
      throw new NotFoundException('Submission not found');
    }

    await this.courseAccessService.ensureProfessorAssigned(user, submission.assignment.courseId);

    return this.prisma.grade.upsert({
      where: { submissionId },
      update: {
        score: dto.score,
        feedback: dto.feedback,
        gradedAt: new Date(),
      },
      create: {
        submissionId,
        score: dto.score,
        feedback: dto.feedback,
      },
    });
  }

  async listMyGrades(user: AuthUser) {
    if (user.role !== Role.STUDENT) {
      throw new ForbiddenException('Only students can view this resource');
    }

    const student = await this.prisma.student.findUnique({ where: { userId: user.id } });
    if (!student) {
      throw new NotFoundException('Student profile not found');
    }

    return this.prisma.grade.findMany({
      where: {
        submission: {
          studentId: student.id,
        },
      },
      include: {
        submission: {
          include: {
            assignment: {
              include: {
                course: true,
              },
            },
          },
        },
      },
      orderBy: { gradedAt: 'desc' },
    });
  }
}
