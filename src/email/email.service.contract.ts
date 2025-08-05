import { EmailTemplateStrategy } from './strategies/email-template.strategy';

export interface IEmailService {
  sendWithTemplate(to: string, strategy: EmailTemplateStrategy): Promise<void>;
}
