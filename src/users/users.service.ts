import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { CreateUserRepo } from './types/create-user.type';
import { IUsersService } from './users.service.contract';

@Injectable()
export class UsersService implements IUsersService {
  constructor(private readonly repo: UserRepository) {}

  public async getByID(id: string): Promise<User | null> {
    return this.repo.findById(id);
  }

  public async getByEmail(email: string): Promise<User | null> {
    return this.repo.findByEmail(email);
  }

  public async getAll(): Promise<Array<User>> {
    return this.repo.findAll();
  }

  public async create(userData: CreateUserRepo): Promise<User> {
    return this.repo.create(userData);
  }

  public async update(
    id: User['id'],
    data: Partial<User>,
  ): Promise<User | null> {
    return this.repo.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    return this.repo.softRemoveUser(id);
  }
}
