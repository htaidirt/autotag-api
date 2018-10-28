import response from '../../lib/response';

describe('lib/response', () => {
  test('with body and statusCode', () => {
    // Given
    const body = { text: 'Hello world!' };
    const statusCode = 123;
    // When
    const result = response(body, statusCode);
    // Then
    expect(result.statusCode).toEqual(statusCode);
    expect(result.headers).toEqual({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    });
    expect(result.body).toEqual('{"text":"Hello world!"}');
  });

  test('without statusCode', () => {
    // Given
    const body = { text: 'Hello world!' };
    // When
    const result = response(body);
    // Then
    expect(result.statusCode).toEqual(200);
  });
});
