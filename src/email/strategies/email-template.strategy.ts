export interface EmailTemplateStrategy {
  getSubject(): string;
  getTextBody(): string;
  getHtmlBody(): string;
}
