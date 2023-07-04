import { IErrorData } from './interface/IErrorData';

export class ServiceError extends Error {
  public message: string;
  public code: number;
  public name: string;
  public at: unknown;
  public messageParams?: unknown;
  public originalError?: unknown;
  public customContext?: unknown;
  constructor(data?: IErrorData) {
    super(data?.message ?? 'Unknown Service Error');
    this.message = data?.message ?? 'Unknown Service Error';
    this.name = data?.name ?? 'UnknownServiceError';
    this.at = data?.name ?? 'Service';
    this.code = data?.code ?? 500;
    this.originalError = data?.originalError ?? null;
    this.messageParams = data?.messageParams ?? null;
    this.customContext = data?.customContext ?? null;
  }
}
