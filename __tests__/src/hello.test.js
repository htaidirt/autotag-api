import * as hello from '../../src/hello';

test('hello success', async () => {
  // Given
  const event = 'event';
  const context = 'context';
  const callback = () => {};
  // When
  const response = await hello.success(event, context, callback);
  // Then
  expect(response.statusCode).toEqual(200);
  expect(response.body).toEqual('"Hi"');
});
