import { User } from '../entities/user.entity';
import { CreateUserRepo } from '../types/create-user.type';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(userData: CreateUserRepo): Promise<User>;
  update(id: User['id'], data: Partial<User>): Promise<User | null>;
  softRemoveUser(id: string): Promise<void>;
  restoreUser(id: string): Promise<void>;
}
