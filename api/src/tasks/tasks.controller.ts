import {Controller, Get, Post, Body,UseGuards} from '@nestjs/common';
import {TasksService} from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/libs/auth/roles.guard';
import { Roles } from '../auth/libs/auth/roles.decorator';
import { Role } from '../auth/libs/auth';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController{
    constructor(private tasksService: TasksService){}

    @Get()
    @Roles(Role.OWNER, Role.ADMIN, Role.VIEWER)
    findAll(){
        return this.tasksService.findAll();
    }

    @Post()
    @Roles(Role.OWNER, Role.ADMIN)
    create(@Body('title') title: string){
        return this.tasksService.create(title);
    }
}