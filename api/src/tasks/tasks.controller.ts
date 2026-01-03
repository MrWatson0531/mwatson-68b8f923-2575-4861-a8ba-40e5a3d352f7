import {Controller, Get, Post, Body} from '@nestjs/common';
import {TasksService} from './tasks.service';

@Controller('tasks')
export class TasksController{
    constructor(private tasksService: TasksService){}

    @Get()
    findAll(){
        return this.tasksService.findAll();
    }

    @Post()
    create(@Body('title') title: string){
        return this.tasksService.create(title);
    }
}