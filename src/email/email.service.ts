import { Injectable } from '@nestjs/common';
import { IEmailService } from './email.service.contract';
import { createTransport, Transporter } from 'nodemailer';
import { EmailTemplateStrategy } from './strategies/email-template.strategy';

@Injectable()
export class EmailService implements IEmailService {
  private readonly mailer: Transporter;

  constructor() {
    this.mailer = createTransport({});
  }

  async sendWithTemplate(
    to: string,
    strategy: EmailTemplateStrategy,
  ): Promise<void> {
    await this.mailer.sendMail({
      to: to,
      subject: strategy.getSubject(),
      html: strategy.getHtmlBody(),
    });
  }
}
