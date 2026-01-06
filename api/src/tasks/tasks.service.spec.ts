import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

describe('TasksService', () => {
  let service: TasksService;
  let repo: Repository<Task>;

  const mockTask = { id: 1, title: 'Test Task', org: { id: 1 } };
  const demoUser = {
  id: 1,
  role: 'Admin',
  org: { id: 1 },  // <--- must exist
} as any; // mock user

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repo = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should return tasks scoped to user org', async () => {
  let calledWith: any;
(repo.find as jest.Mock).mockImplementation((arg) => {
  calledWith = arg;
  return [mockTask];
});

await service.findAll(demoUser);
expect(calledWith).toEqual({
  where: {
    org: { id: 1 }, // literal id
  },
});

  const tasks = await service.findAll(demoUser);
  expect(tasks).toEqual([mockTask]);
  expect(calledWith).toEqual({ where: { org: { id: demoUser.org.id } } });
});

  it('should create a task in user org', async () => {
  let calledWithCreate: any;
(repo.create as jest.Mock).mockImplementation((arg) => {
  calledWithCreate = arg;
  return mockTask;
});

await service.create('Test Task', demoUser);
expect(calledWithCreate).toEqual({ title: 'Test Task', org: { id: 1 } });
});
});