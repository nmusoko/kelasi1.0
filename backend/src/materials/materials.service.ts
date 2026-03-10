import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '../common/constants/roles.enum';
import { AuthUser } from '../common/types/auth-user.type';
import { CourseAccessService } from '../courses/course-access.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly courseAccessService: CourseAccessService,
  ) {}

  async create(courseId: string, user: AuthUser, dto: CreateMaterialDto) {
    await this.courseAccessService.ensureProfessorAssigned(user, courseId);

    return this.prisma.material.create({
      data: {
        courseId,
        title: dto.title,
        description: dto.description,
        fileUrl: dto.fileUrl,
      },
    });
  }

  async listByCourse(courseId: string, user: AuthUser) {
    await this.courseAccessService.ensureCanReadCourseContent(user, courseId);

    return this.prisma.material.findMany({
      where: { courseId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(courseId: string, materialId: string, user: AuthUser, dto: UpdateMaterialDto) {
    await this.courseAccessService.ensureProfessorAssigned(user, courseId);

    const material = await this.prisma.material.findUnique({ where: { id: materialId } });
    if (!material || material.courseId !== courseId) {
      throw new NotFoundException('Material not found for this course');
    }

    return this.prisma.material.update({
      where: { id: materialId },
      data: dto,
    });
  }

  async remove(courseId: string, materialId: string, user: AuthUser) {
    await this.courseAccessService.ensureProfessorAssigned(user, courseId);

    const material = await this.prisma.material.findUnique({ where: { id: materialId } });
    if (!material || material.courseId !== courseId) {
      throw new NotFoundException('Material not found for this course');
    }

    if (user.role !== Role.PROFESSOR) {
      throw new ForbiddenException('Only professors can delete materials');
    }

    await this.prisma.material.delete({ where: { id: materialId } });
    return { success: true };
  }
}
