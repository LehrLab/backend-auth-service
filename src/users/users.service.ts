import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { User } from './entities/user.entity';

import { UserRepository } from './repositories/user.repository';
import { ConfirmCodeRepository } from './repositories/confirm-code.repository';

import { CreateUserRepo } from './types/create-user.type';
import { IUsersService } from './users.service.contract';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly codeConfirmRepo: ConfirmCodeRepository,
  ) {}

  public async getByID(id: string): Promise<User | null> {
    return this.userRepo.findById(id);
  }

  public async getByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }

  public async getAll(): Promise<Array<User>> {
    return this.userRepo.findAll();
  }

  public async create(userData: CreateUserRepo): Promise<User> {
    return this.userRepo.create(userData);
  }

  public async update(
    id: User['id'],
    data: Partial<User>,
  ): Promise<User | null> {
    return this.userRepo.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    return this.userRepo.softRemoveUser(id);
  }

  @Cron('*/15 * * * *')
  async cleanupExpiredCodes() {
    const now = new Date();

    await this.codeConfirmRepo.deleteExpired(now);
  }
}
