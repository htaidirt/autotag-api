import uuid from 'uuid/v4';
import { CONST, response, dynamodb } from '../lib';

export async function create(event) {
  const data = JSON.parse(event.body);
  if (!data.title || !data.type)
    return response(
      { status: false, error: 'Invalid project title or type' },
      500
    );

  const params = {
    TableName: CONST.TABLES.PROJECTS,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      projectId: uuid(),
      title: data.title,
      description: data.description,
      type: data.type,
      status: data.status || 'ACTIVE',
      createdAt: Date.now()
    }
  };

  try {
    await dynamodb.call('put', params);
    return response(params.Item, 201);
  } catch (error) {
    return response({ status: false, error }, 500);
  }
}
