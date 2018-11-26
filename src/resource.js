import uuid from 'uuid/v4';
import { CONST, dynamodb, response } from '../lib';

export async function add(event) {
  const {
    bucket: { name: bucket },
    object: { key },
  } = event.Records[0].s3;
  const projectId = key.split('/')[1];
  const resourceId = uuid();
  const params = {
    TableName: CONST.TABLES.RESOURCES,
    Item: {
      projectId,
      resourceId,
      key,
      status: 'ACTIVE',
      createdAt: Date.now(),
    },
  };

  try {
    await dynamodb.call('put', params);
    return response({ bucket, key, projectId, resourceId }, 200);
  } catch (error) {
    return response({ status: false, error }, 500);
  }
}
