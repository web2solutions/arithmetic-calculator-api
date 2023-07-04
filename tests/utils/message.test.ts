import { Response } from '../../src/utils/message';
import { ResponseVO } from '../../src/model/vo/responseVo';
import { ServiceError } from '../../src/infra/ServiceError';

describe('unit test - lambda responses', () => {
  it('http succcess', () => {
    expect.hasAssertions();
    const response: ResponseVO = Response.success('Ok');
    const responseBody = JSON.parse(response.body);
    expect(responseBody.data).toBe('Ok');
    expect(responseBody.message).toBe('success');
    expect(response.statusCode).toBe(200);
  });
  it('http created', () => {
    expect.hasAssertions();
    const response: ResponseVO = Response.created({
      id: 'string',
      foo: 'bar',
    });
    const responseBody = JSON.parse(response.body);
    expect(responseBody.data).toStrictEqual({
      id: 'string',
      foo: 'bar',
    });
    expect(response.statusCode).toBe(201);
    expect(responseBody.message).toBe('created');
  });
  it('http server error - no params', () => {
    expect.hasAssertions();
    const response: ResponseVO = Response.error();
    const responseBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(500);
    expect(responseBody.message).toBe('Internal Server Error');
  });
  it('http server error - ServiceError as param - no config', () => {
    expect.hasAssertions();
    const response: ResponseVO = Response.error(new ServiceError());
    const responseBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(500);
    expect(responseBody.message).toBe('Unknown Service Error');
  });
  it('http server error - ServiceError as param - with config', () => {
    expect.hasAssertions();
    const response: ResponseVO = Response.error(new ServiceError({
      message: 'error message',
      code: 500,
    }));
    const responseBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(500);
    expect(responseBody.message).toBe('error message');
  });
  it('http error not found', () => {
    expect.hasAssertions();
    const response: ResponseVO = Response.error(new ServiceError({
      code: 404,
      message: 'Not found',
    }));
    const responseBody = JSON.parse(response.body);
    expect(responseBody.message).toBe('Not found');
    expect(response.statusCode).toBe(404);
  });
  it('http error bad request', () => {
    expect.hasAssertions();
    const response: ResponseVO = Response.error(new ServiceError({
      code: 400,
      message: 'Bad request',
    }));
    const responseBody = JSON.parse(response.body);
    expect(responseBody.message).toBe('Bad request');
    expect(response.statusCode).toBe(400);
  });
  it('http error Forbidden', () => {
    expect.hasAssertions();
    const response: ResponseVO = Response.error(new ServiceError({
      code: 403,
      message: 'Forbidden',
    }));
    const responseBody = JSON.parse(response.body);
    expect(responseBody.message).toBe('Forbidden');
    expect(response.statusCode).toBe(403);
  });
  it('http error Payment required', () => {
    expect.hasAssertions();
    const response: ResponseVO = Response.error(new ServiceError({
      code: 402,
      message: 'Payment Required',
    }));
    const responseBody = JSON.parse(response.body);
    expect(responseBody.message).toBe('Payment Required');
    expect(response.statusCode).toBe(402);
  });
});
