/* eslint-disable import/extensions */
// import { APIGatewayProxyResult } from 'aws-lambda';
import { ResponseVO } from '../model/vo/responseVo';
import { Result } from './Result';
import { ServiceError } from '../infra/ServiceError';

enum StatusCode {
  success = 200,
  notFound = 404,
  created = 201,
  unknow = 500,
}

export class Response {
  public static success(data: unknown): ResponseVO {
    const result = new Result(StatusCode.success, 0, 'success', data);
    return result.bodyToString();
  }

  public static created(data: unknown): ResponseVO {
    const result = new Result(StatusCode.created, 0, 'success', data);
    return result.bodyToString();
  }

  public static error(err: ServiceError): ResponseVO {
    const { code = 500, message } = err;
    let statusCode: number;
    if (code === 404) {
      statusCode = code;
    } else if (code === 400) {
      statusCode = code;
    } else {
      statusCode = 500;
    }
    const result = new Result(statusCode, code, message);
    // console.log(result.bodyToString());
    return result.bodyToString();
  }
}
