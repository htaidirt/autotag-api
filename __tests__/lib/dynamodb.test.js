const lib = '../../lib/dynamodb';

jest.mock('aws-sdk');
// const AWS = require('aws-sdk');

const mockedAction = jest.fn();
jest.mock('aws-sdk/DynamoDB/DocumentClient', () => {
  return class DocumentClient {
    action(params) {
      return { promise: mockedAction };
    }
  };
});

describe('lib/dynamodb', () => {
  test('DocumentClient should be called', () => {
    // Given
    const action = 'action';
    const params = { id: '123' };
    // When
    const call = require(lib).call(action, params);
    // Then
    expect(mockedAction).toHaveBeenCalled();
  });
});
