import { ForbiddenException } from '@nestjs/common';
import { Role } from '../common/constants/roles.enum';
import { CourseAccessService } from './course-access.service';

describe('CourseAccessService', () => {
  it('rejects student read when not enrolled', async () => {
    const prisma = {
      course: { findUnique: jest.fn().mockResolvedValue({ id: 'course-1' }) },
      student: { findUnique: jest.fn().mockResolvedValue({ id: 'student-1' }) },
      enrollment: { findUnique: jest.fn().mockResolvedValue(null) },
      professor: { findUnique: jest.fn() },
    } as any;

    const service = new CourseAccessService(prisma);

    await expect(
      service.ensureCanReadCourseContent({ id: 'user-1', role: Role.STUDENT }, 'course-1'),
    ).rejects.toThrow(ForbiddenException);
  });
});
