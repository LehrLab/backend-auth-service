import { EmailTemplateStrategy } from './email-template.strategy';

export class ConfirmCodeStrategy implements EmailTemplateStrategy {
  private readonly formattedCode: string;

  constructor(code: string) {
    this.formattedCode = code.slice(0, 3) + '-' + code.slice(3);
  }

  getSubject(): string {
    return 'Підтвердження облікового запису';
  }
  getTextBody(): string {
    return `Я тішусь, що ми разом дійшли до кінця реєстрації! Хапай код, щоб активувати обліковий запис: ${this.formattedCode}`;
  }
  getHtmlBody(): string {
    return `
        <img
            src="https://www.quanta.org/thumbs/thumb-orange-640x480-orange.jpg"
            alt="Logo" 
            style="width: 200px;"
        />
        <h2>Я тішусь, що ми разом дійшли до кінця реєстрації!</h2>
        <p>Хапай код, щоб активувати обліковий запис: ${this.formattedCode}</p>
        <p>Якщо це не був ти, то <a href="mailto:noodi.contact@gmail.com>напиши нам</a>, щоб ми видалили обліковий запис з твоєю поштою</p>
    `;
  }
}
