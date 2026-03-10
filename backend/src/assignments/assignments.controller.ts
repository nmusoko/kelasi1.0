import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../common/constants/roles.enum';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthUser } from '../common/types/auth-user.type';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Controller('courses/:id/assignments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  @Roles(Role.PROFESSOR)
  create(
    @Param('id') courseId: string,
    @Req() req: Request & { user: AuthUser },
    @Body() dto: CreateAssignmentDto,
  ) {
    return this.assignmentsService.create(courseId, req.user, dto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.PROFESSOR, Role.STUDENT)
  list(@Param('id') courseId: string, @Req() req: Request & { user: AuthUser }) {
    return this.assignmentsService.listByCourse(courseId, req.user);
  }
}
