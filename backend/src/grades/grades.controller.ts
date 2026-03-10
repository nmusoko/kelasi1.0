import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../common/constants/roles.enum';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthUser } from '../common/types/auth-user.type';
import { GradeSubmissionDto } from './dto/grade-submission.dto';
import { GradesService } from './grades.service';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post('submissions/:id/grade')
  @Roles(Role.PROFESSOR)
  grade(
    @Param('id') submissionId: string,
    @Req() req: Request & { user: AuthUser },
    @Body() dto: GradeSubmissionDto,
  ) {
    return this.gradesService.gradeSubmission(submissionId, req.user, dto);
  }

  @Get('students/me/grades')
  @Roles(Role.STUDENT)
  myGrades(@Req() req: Request & { user: AuthUser }) {
    return this.gradesService.listMyGrades(req.user);
  }
}
