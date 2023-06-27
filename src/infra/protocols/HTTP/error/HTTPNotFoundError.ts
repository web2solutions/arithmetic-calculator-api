import { BaseError } from './BaseError';

export class HTTPNotFoundError extends BaseError {
  constructor(message?: string) {
    super({
      message: message ?? 'Not found',
      code: 404,
    });
  }
}
