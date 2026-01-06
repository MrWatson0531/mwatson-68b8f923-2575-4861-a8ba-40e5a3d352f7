import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private repo: Repository<Task>,
  ) {}

  create(title: string, user: any) {
  const task = this.repo.create({ title, org: user.org });
  return this.repo.save(task);
}

  findAll(user: any) {
  if (user.role === 'Owner') return this.repo.find();
  return this.repo.find({ where: { org: { id: user.org.id } } });
}

  async update(id: number, title: string, user: any) {
    const task = await this.repo.findOne({
      where: { id },
      relations: ['org'],
    });

    if (!task || task.org.id !== user.orgId) {
      throw new ForbiddenException('Access denied');
    }

    task.title = title;
    return this.repo.save(task);
  }

  async delete(id: number, user: any) {
    const task = await this.repo.findOne({
      where: { id },
      relations: ['org'],
    });

    if (!task || task.org.id !== user.orgId) {
      throw new ForbiddenException('Access denied');
    }

    await this.repo.remove(task);
    return { success: true };
  }
}
