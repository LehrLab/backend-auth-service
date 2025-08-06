import { EmailTemplateStrategy } from './email-template.strategy';

export class PasswordResetStrategy implements EmailTemplateStrategy {
  private readonly formattedCode: string;

  constructor(code: string) {
    this.formattedCode = code.slice(0, 3) + '-' + code.slice(3);
  }

  getSubject(): string {
    return 'Скидання паролю';
  }
  getTextBody(): string {
    return `Без формальностей, ось ваш код до скидання паролю: ${this.formattedCode}`;
  }
  getHtmlBody(): string {
    return `
        <img
            src="https://www.quanta.org/thumbs/thumb-orange-640x480-orange.jpg"
            alt="Logo" 
            style="width: 200px;"
        />
        <h2>Йой, хочеш допоможу з скиданням паролю?</h2>
        <p>Хуткіше вводь цей код: ${this.formattedCode}</p>
        <p>Якщо це не був ти, то вибач що потурбував. Якийсь телепень ввів твою пошту замість своєї...</p>
    `;
  }
}
