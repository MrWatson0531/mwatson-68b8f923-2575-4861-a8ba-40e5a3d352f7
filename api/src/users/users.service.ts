import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Org } from '../orgs/org.entity';
import { Role } from '@org/auth';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async create(
    email: string,
    password: string,
    role: Role,
    Org: Org,
  ) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.repo.create({
      email,
      passwordHash,
      role,
      organization: Org,
    });

    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find({ relations: ['organization'] });
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email }, relations: ['organization'] });
  }
}