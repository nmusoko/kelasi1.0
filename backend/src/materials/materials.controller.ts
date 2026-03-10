import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../common/constants/roles.enum';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthUser } from '../common/types/auth-user.type';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { MaterialsService } from './materials.service';

@Controller('courses/:id/materials')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @Roles(Role.PROFESSOR)
  create(
    @Param('id') courseId: string,
    @Req() req: Request & { user: AuthUser },
    @Body() dto: CreateMaterialDto,
  ) {
    return this.materialsService.create(courseId, req.user, dto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.PROFESSOR, Role.STUDENT)
  list(@Param('id') courseId: string, @Req() req: Request & { user: AuthUser }) {
    return this.materialsService.listByCourse(courseId, req.user);
  }

  @Patch(':materialId')
  @Roles(Role.PROFESSOR)
  update(
    @Param('id') courseId: string,
    @Param('materialId') materialId: string,
    @Req() req: Request & { user: AuthUser },
    @Body() dto: UpdateMaterialDto,
  ) {
    return this.materialsService.update(courseId, materialId, req.user, dto);
  }

  @Delete(':materialId')
  @Roles(Role.PROFESSOR)
  remove(
    @Param('id') courseId: string,
    @Param('materialId') materialId: string,
    @Req() req: Request & { user: AuthUser },
  ) {
    return this.materialsService.remove(courseId, materialId, req.user);
  }
}
