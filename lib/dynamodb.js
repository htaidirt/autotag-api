import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-west-1' });

const documentClient = () => new AWS.DynamoDB.DocumentClient();

const call = (action, params) =>
  documentClient()
    [action](params)
    .promise();

export default {
  documentClient,
  call
};
