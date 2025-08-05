import { InjectRepository } from '@nestjs/typeorm';
import { ConfirmationCode } from '../entities/confirmation-code.entity';
import { ConfirmCodeActions } from '../types/confirm-code-actions.type';
import { IConfirmCodeRepository } from './confirm-code.repository.contract';
import { Repository } from 'typeorm';

export class ConfirmCodeRepository implements IConfirmCodeRepository {
  constructor(
    @InjectRepository(ConfirmationCode)
    private readonly repo: Repository<ConfirmationCode>,
  ) {}

  async getAll(userID: string): Promise<ConfirmationCode[]> {
    const codes = await this.repo.find({ where: { userId: userID } });

    return codes;
  }

  async getOne(
    userID: string,
    type: ConfirmCodeActions,
  ): Promise<ConfirmationCode | null> {
    const code = await this.repo.findOne({
      where: { userId: userID, type: type },
    });

    return code;
  }

  async create(
    userID: string,
    type: ConfirmCodeActions,
  ): Promise<ConfirmationCode> {
    const newCode = {
      userId: userID,
      type: type,
      code: this.generate(),
    };
    const newCodeInDB = this.repo.create(newCode);

    return this.repo.save(newCodeInDB);
  }

  async deactivate(userID: string, type: ConfirmCodeActions): Promise<void> {
    await this.repo
      .createQueryBuilder()
      .update(ConfirmationCode)
      .set({ used: true })
      .where('userId = :userID AND type = :type AND used = false', {
        userID,
        type,
      })
      .execute();
  }

  async deactivateAll(userID: string): Promise<void> {
    await this.repo
      .createQueryBuilder()
      .update(ConfirmationCode)
      .set({ used: true })
      .where('userId = :userID AND used = false', { userID })
      .execute();
  }

  // Cron-task. Used in the UserService
  async deleteExpired(currentDate: Date): Promise<void> {
    await this.repo
      .createQueryBuilder()
      .delete()
      .from(ConfirmationCode)
      .where('expiresAt IS NOT NULL AND expiresAt < :now', { now: currentDate })
      .execute();
  }

  private generate(): string {
    let code = '';

    for (let i = 0; i < 6; i++) {
      code += Math.trunc(10 * Math.random());
    }

    return code;
  }
}
