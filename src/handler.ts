import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { NamingService } from './naming.service';
import { NameRequest } from './types';

export const generateName: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const { country, minAge, maxAge, sex } = body as NameRequest;

    const resp = NamingService.generate({ country, minAge, maxAge, sex });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resp)
    };
  } catch (err: any) {
    console.error(err);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: err.message })
    };
  }
};