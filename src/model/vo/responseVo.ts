export interface ResponseBodyVO {
  code: number;
  message: string;
  data?: unknown;
}

export interface ResponseVO {
  statusCode: number;
  body: string;
}
