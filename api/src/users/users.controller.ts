import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { OrgsService } from '../orgs/orgs.service';
import { Role } from '@org/auth';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private orgsService: OrgsService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  async create(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: Role,
    @Body('organizationId') organizationId: number,
  ) {
    const orgs = await this.orgsService.findAll();
    const org = orgs.find(o => o.id === organizationId);

    if (!org) {
      throw new BadRequestException('Organization not found');
    }

    return this.usersService.create(email, password, role, org);
  }
}