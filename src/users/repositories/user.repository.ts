import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserRepo } from '../types/create-user.type';
import { IUserRepository } from './user.repository.contract';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async create(userData: CreateUserRepo): Promise<User> {
    const user = this.repo.create(userData);

    return this.repo.save(user);
  }

  async update(id: User['id'], data: Partial<User>): Promise<User | null> {
    await this.repo.update(id, data);

    return this.repo.findOne({ where: { id } });
  }

  async softRemoveUser(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }

  async restoreUser(id: string): Promise<void> {
    await this.repo.restore(id);
  }
}
