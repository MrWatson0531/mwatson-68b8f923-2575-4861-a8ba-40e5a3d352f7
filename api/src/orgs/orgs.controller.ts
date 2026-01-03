import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrgsService } from './orgs.service';

@Controller('orgs')
export class OrgsController {
  constructor(private orgsService: OrgsService) {}

  @Get()
  findAll() {
    return this.orgsService.findAll();
  }

  @Post()
  create(@Body('name') name: string, @Body('parentId') parentId?: number) {
    return this.orgsService.create(name, parentId);
  }
}