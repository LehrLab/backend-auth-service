import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ConfirmationCode {
  @PrimaryGeneratedColumn('uuid')
  id: string; //uuid v4

  @Column()
  code: string; // 6 digits

  @Column()
  type: 'email' | 'password_reset';

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.codes, { onDelete: 'CASCADE' })
  user: User;
}
