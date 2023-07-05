import { APIGatewayProxyResult } from 'aws-lambda';

export class Result {
  private statusCode: number;
  private code: number;
  private message: string;
  private data?: unknown;

  constructor(statusCode: number, code: number, message: string, data?: unknown) {
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.data = data;
  }

  /**
   * Serverless: According to the API Gateway specs, the body content must be stringified
   */
  public bodyToString(): APIGatewayProxyResult {
    return {
      statusCode: this.statusCode,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
      },
      body: JSON.stringify({
        code: this.code,
        message: this.message,
        data: this.data,
      }),
    };
  }
}
