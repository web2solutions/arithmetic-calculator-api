export interface IErrorData {
  message: string;
  name?: string;
  at?: unknown;
  messageParams?: unknown;
  originalError?: unknown;
  customContext?: unknown;
  code?: number;
}
