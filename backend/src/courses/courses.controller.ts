import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../common/constants/roles.enum';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AssignProfessorDto } from './dto/assign-professor.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { EnrollStudentDto } from './dto/enroll-student.dto';
import { CoursesService } from './courses.service';

@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateCourseDto) {
    return this.coursesService.createCourse(dto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.PROFESSOR, Role.STUDENT)
  list(@Req() req: Request & { user: { id: string; role: Role } }) {
    return this.coursesService.listCourses(req.user);
  }

  @Post(':id/enroll')
  @Roles(Role.ADMIN)
  enroll(@Param('id') id: string, @Body() dto: EnrollStudentDto) {
    return this.coursesService.enrollStudent(id, dto);
  }

  @Post(':id/assign-professor')
  @Roles(Role.ADMIN)
  assignProfessor(@Param('id') id: string, @Body() dto: AssignProfessorDto) {
    return this.coursesService.assignProfessor(id, dto);
  }
}
