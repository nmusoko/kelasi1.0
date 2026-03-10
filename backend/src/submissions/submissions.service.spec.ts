import { ConflictException } from '@nestjs/common';
import { Role } from '../common/constants/roles.enum';
import { SubmissionsService } from './submissions.service';

describe('SubmissionsService', () => {
  it('rejects second submission for same assignment/student', async () => {
    const prisma = {
      assignment: { findUnique: jest.fn().mockResolvedValue({ id: 'a1', courseId: 'c1' }) },
      student: { findUnique: jest.fn().mockResolvedValue({ id: 's1' }) },
      submission: {
        findUnique: jest.fn().mockResolvedValue({ id: 'existing' }),
        create: jest.fn(),
      },
    } as any;

    const courseAccessService = {
      ensureCanReadCourseContent: jest.fn().mockResolvedValue({ id: 'c1' }),
    } as any;

    const service = new SubmissionsService(prisma, courseAccessService);

    await expect(
      service.create('a1', { id: 'u1', role: Role.STUDENT }, { content: 'answer' }),
    ).rejects.toThrow(ConflictException);
  });
});
