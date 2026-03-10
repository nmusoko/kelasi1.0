# Kelasi Backend v1

Initial backend foundation for Kelasi built with NestJS, Prisma, PostgreSQL, and JWT authentication.

## Features

- NestJS modular backend foundation
- Prisma ORM configured for PostgreSQL
- JWT auth (`POST /auth/login`)
- Role-based access control (`admin`, `professor`, `student`)
- Core models:
  - User
  - Department
  - Student
  - Professor
  - Course
  - Enrollment
  - Assignment
  - Submission
  - Grade
- Seed script with:
  - 1 admin
  - 1 professor
  - 2 students
  - 1 department
  - 1 course
  - 1 enrollment

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
cp .env.example .env
```

3. Ensure PostgreSQL is running and `DATABASE_URL` matches your local DB.

4. Generate Prisma client:

```bash
npm run prisma:generate
```

5. Apply migration:

```bash
npm run prisma:migrate
```

6. Seed data:

```bash
npm run prisma:seed
```

7. Start API:

```bash
npm run start:dev
```

## Default Seed Credentials

All seeded users use password: `Password123!`

- Admin: `admin@kelasi.com`
- Professor: `professor@kelasi.com`
- Student 1: `student1@kelasi.com`
- Student 2: `student2@kelasi.com`

## API Endpoints

- `POST /auth/login`
- `GET /users/me` (authenticated)
- `POST /courses` (admin)
- `GET /courses` (admin/professor/student)
- `POST /courses/:id/enroll` (admin)
- `POST /courses/:id/assign-professor` (admin)
- `POST /courses/:id/materials` (assigned professor)
- `GET /courses/:id/materials` (admin/assigned professor/enrolled student)
- `PATCH /courses/:id/materials/:materialId` (assigned professor)
- `DELETE /courses/:id/materials/:materialId` (assigned professor)
- `POST /courses/:id/announcements` (assigned professor)
- `GET /courses/:id/announcements` (admin/assigned professor/enrolled student)
- `PATCH /courses/:id/announcements/:announcementId` (assigned professor)
- `DELETE /courses/:id/announcements/:announcementId` (assigned professor)
- `POST /courses/:id/assignments` (assigned professor)
- `GET /courses/:id/assignments` (admin/assigned professor/enrolled student)
- `POST /assignments/:id/submissions` (student, one submission per assignment)
- `GET /assignments/:id/submissions` (admin/assigned professor sees course submissions, student sees own)
- `POST /submissions/:id/grade` (assigned professor)
- `GET /students/me/grades` (student)

## Role Behavior

- `admin`: create courses, assign professors, enroll students, view all courses.
- `professor`: view only assigned courses.
- `student`: view only enrolled courses.
- `professor`: can create/update/delete/list materials and announcements only for assigned courses.
- `student`: can only read materials and announcements for enrolled courses.
- `professor`: can create assignments for assigned courses and grade submissions for those courses.
- `student`: can submit exactly one submission per assignment and view their own grades/feedback.

## Notes

- This version intentionally excludes chat and file uploads.
- Add unit/e2e tests in the next iteration.
