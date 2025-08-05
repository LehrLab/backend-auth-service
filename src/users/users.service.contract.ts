import { User } from './entities/user.entity';
import { CreateUserRepo } from './types/create-user.type';

export interface IUsersService {
  getByID(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  create(userData: CreateUserRepo): Promise<User>;
  update(id: User['id'], data: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<void>;
}
