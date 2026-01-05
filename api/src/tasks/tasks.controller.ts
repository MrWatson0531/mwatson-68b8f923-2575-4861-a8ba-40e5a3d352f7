import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Roles('Admin', 'Owner')
  create(@Body() body: { title: string }, @Req() req) {
    console.log(`[AUDIT] ${req.user.email} created task`);
    return this.tasksService.create(body.title, req.user);
  }

  @Get()
  findAll(@Req() req) {
    return this.tasksService.findAll(req.user);
  }

  @Put(':id')
  @Roles('Admin', 'Owner')
  update(@Param('id') id: number, @Body() body: { title: string }, @Req() req) {
    console.log(`[AUDIT] ${req.user.email} updated task ${id}`);
    return this.tasksService.update(id, body.title, req.user);
  }

  @Delete(':id')
  @Roles('Admin', 'Owner')
  delete(@Param('id') id: number, @Req() req) {
    console.log(`[AUDIT] ${req.user.email} deleted task ${id}`);
    return this.tasksService.delete(id, req.user);
  }
}