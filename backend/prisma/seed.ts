import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Password123!', 10);

  const department = await prisma.department.upsert({
    where: { name: 'Computer Science' },
    update: {},
    create: { name: 'Computer Science' },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@kelasi.com' },
    update: {},
    create: {
      email: 'admin@kelasi.com',
      passwordHash,
      firstName: 'System',
      lastName: 'Admin',
      role: Role.admin,
    },
  });

  const professorUser = await prisma.user.upsert({
    where: { email: 'professor@kelasi.com' },
    update: {},
    create: {
      email: 'professor@kelasi.com',
      passwordHash,
      firstName: 'Grace',
      lastName: 'Hopper',
      role: Role.professor,
    },
  });

  const studentUser1 = await prisma.user.upsert({
    where: { email: 'student1@kelasi.com' },
    update: {},
    create: {
      email: 'student1@kelasi.com',
      passwordHash,
      firstName: 'Ada',
      lastName: 'Lovelace',
      role: Role.student,
    },
  });

  const studentUser2 = await prisma.user.upsert({
    where: { email: 'student2@kelasi.com' },
    update: {},
    create: {
      email: 'student2@kelasi.com',
      passwordHash,
      firstName: 'Alan',
      lastName: 'Turing',
      role: Role.student,
    },
  });

  const professor = await prisma.professor.upsert({
    where: { userId: professorUser.id },
    update: {},
    create: {
      userId: professorUser.id,
      departmentId: department.id,
      staffNo: 'STAFF-0001',
    },
  });

  const student1 = await prisma.student.upsert({
    where: { userId: studentUser1.id },
    update: {},
    create: {
      userId: studentUser1.id,
      departmentId: department.id,
      matricNo: 'MAT-0001',
    },
  });

  await prisma.student.upsert({
    where: { userId: studentUser2.id },
    update: {},
    create: {
      userId: studentUser2.id,
      departmentId: department.id,
      matricNo: 'MAT-0002',
    },
  });

  const course = await prisma.course.upsert({
    where: { code: 'CSC101' },
    update: {},
    create: {
      code: 'CSC101',
      title: 'Introduction to Computer Science',
      departmentId: department.id,
      professorId: professor.id,
    },
  });

  await prisma.enrollment.upsert({
    where: {
      studentId_courseId: {
        studentId: student1.id,
        courseId: course.id,
      },
    },
    update: {},
    create: {
      studentId: student1.id,
      courseId: course.id,
    },
  });


  const assignment = await prisma.assignment.upsert({
    where: { id: '11111111-1111-1111-1111-111111111111' },
    update: {},
    create: {
      id: '11111111-1111-1111-1111-111111111111',
      courseId: course.id,
      title: 'Week 1 Intro Quiz',
      description: 'Short intro assignment',
      dueDate: new Date('2030-01-15T23:59:59.000Z'),
    },
  });

  const submission = await prisma.submission.upsert({
    where: {
      assignmentId_studentId: {
        assignmentId: assignment.id,
        studentId: student1.id,
      },
    },
    update: {},
    create: {
      assignmentId: assignment.id,
      studentId: student1.id,
      content: 'My first submission',
    },
  });

  await prisma.grade.upsert({
    where: { submissionId: submission.id },
    update: {},
    create: {
      submissionId: submission.id,
      score: 88,
      feedback: 'Good start.',
    },
  });
  console.log({ adminUser, professorUser, studentUser1, studentUser2, department, course, assignment });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
