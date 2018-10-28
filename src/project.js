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

export async function get(event) {
  const params = {
    TableName: CONST.TABLES.PROJECTS,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      projectId: event.pathParameters.id
    }
  };

  try {
    const result = await dynamodb.call('get', params);
    if (result.Item) return response(result.Item, 200);
    return response({ status: false, error: 'Project not found' }, 404);
  } catch (error) {
    return response({ status: false, error }, 500);
  }
}
