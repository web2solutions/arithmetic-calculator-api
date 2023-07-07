import { APIGatewayProxyEvent } from 'aws-lambda';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setFilter = (event: APIGatewayProxyEvent): Record<any, any> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let filter: Record<any, any> = {};
  if (event.queryStringParameters?.filter) {
    const decodedFilterString = Buffer.from(event.queryStringParameters?.filter, 'base64').toString();
    let decodedFilter;
    try {
      decodedFilter = JSON.parse(decodedFilterString);
    } catch (error) {
      decodedFilter = {};
    }
    filter = { ...decodedFilter };
  }
  return filter;
};
