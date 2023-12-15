export class HttpException extends Error {
  name: string;
  statusCode: number;
  messageText: string[];

  constructor(name: string, statusCode: number, message?: string[] | string) {
    const messageText = message ? new Array().concat(message) : [];
    super(messageText.join(', '));
    this.name = name;
    this.statusCode = statusCode;
    this.messageText = messageText;
  }
}
