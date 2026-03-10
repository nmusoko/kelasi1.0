import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async me(@Req() req: Request & { user: { id: string } }) {
    const user = await this.usersService.findById(req.user.id);
    if (!user) {
      return null;
    }

    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }
}
