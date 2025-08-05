import { ConfirmationCode } from '../entities/confirmation-code.entity';
import { ConfirmCodeActions } from '../types/confirm-code-actions.type';

export interface IConfirmCodeRepository {
  getAll(userID: string): Promise<ConfirmationCode[]>;
  getOne(
    userID: string,
    type: ConfirmCodeActions,
  ): Promise<ConfirmationCode | null>;
  create(userID: string, type: ConfirmCodeActions): Promise<ConfirmationCode>;
  deleteExpired(currentDate: Date): Promise<void>;
  deactivate(userID: string, type: ConfirmCodeActions): Promise<void>;
  deactivateAll(userID): Promise<void>;
}
