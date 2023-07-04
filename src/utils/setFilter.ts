import { APIGatewayProxyEvent } from 'aws-lambda';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setFilter = (event: APIGatewayProxyEvent): Record<any, any> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let filter: Record<any, any> = {};
  if (event.queryStringParameters?.filter) {
    filter = { ...(JSON.parse(event.queryStringParameters.filter)) };
  }
  return filter;
};
