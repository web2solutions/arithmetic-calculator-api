export class BaseError extends Error {
  public code: number;

  constructor({
    message,
    code,
  }: {
    message: string,
    code: number,
  }) {
    super(message);
    this.code = code;
  }
}
