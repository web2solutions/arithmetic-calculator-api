/* eslint-disable import/extensions */
// import { APIGatewayProxyResult } from 'aws-lambda';
import { ResponseVO } from '../model/vo/responseVo';
import { Result } from './Result';
import { ServiceError } from '../infra/ServiceError';

enum StatusCode {
  success = 200,
  paymentRequired = 402,
  notFound = 404,
  unauthorized = 401,
  invalidRequest = 400,
  created = 201,
  unknow = 500,
}

export class Response {
  public static success(data: unknown): ResponseVO {
    const result = new Result(StatusCode.success, 0, 'success', data);
    return result.bodyToString();
  }

  public static created(data: unknown): ResponseVO {
    const result = new Result(StatusCode.created, 0, 'created', data);
    return result.bodyToString();
  }

  public static error(err?: ServiceError): ResponseVO {
    const { code = 500, message = 'Internal Server Error' } = err || {};
    let statusCode: number;
    if (code >= 400 && code <= 499) {
      statusCode = code;
    } else {
      statusCode = StatusCode.unknow;
    }
    const result = new Result(statusCode, code, message);
    return result.bodyToString();
  }
}
