import { APIGatewayProxyEvent } from 'aws-lambda';
import { IPagingRequest } from '../infra/interface/IPagingRequest';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setFilterAndPaging = (event: APIGatewayProxyEvent): Array<Record<any, any> | IPagingRequest> => {
  let filter: Record<string, string|number> = {};
  const paging: IPagingRequest = {
    page: 1,
    size: 20,
  };
  if (event.queryStringParameters?.page) {
    if (!Number.isNaN(event.queryStringParameters.page)) {
      paging.page = +event.queryStringParameters.page;
    }
  }
  if (event.queryStringParameters?.size) {
    if (!Number.isNaN(event.queryStringParameters.size)) {
      paging.size = +event.queryStringParameters.size;
    }
  }
  if (event.queryStringParameters?.filter) {
    filter = { ...(JSON.parse(event.queryStringParameters.filter)) };
  }
  return [filter, paging];
};
