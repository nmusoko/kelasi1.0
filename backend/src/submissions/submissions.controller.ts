import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../common/constants/roles.enum';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthUser } from '../common/types/auth-user.type';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { SubmissionsService } from './submissions.service';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post('assignments/:id/submissions')
  @Roles(Role.STUDENT)
  create(
    @Param('id') assignmentId: string,
    @Req() req: Request & { user: AuthUser },
    @Body() dto: CreateSubmissionDto,
  ) {
    return this.submissionsService.create(assignmentId, req.user, dto);
  }

  @Get('assignments/:id/submissions')
  @Roles(Role.ADMIN, Role.PROFESSOR, Role.STUDENT)
  list(@Param('id') assignmentId: string, @Req() req: Request & { user: AuthUser }) {
    return this.submissionsService.listByAssignment(assignmentId, req.user);
  }
}
