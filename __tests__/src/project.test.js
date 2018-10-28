import * as project from '../../src/project';

test('Project creation', async () => {
  // Given
  const event = 'event';
  const context = 'context';
  const callback = () => {};
  // When
  const result = await project.create(event, context, callback);
  // Then
  expect(result.statusCode).toEqual(200);
  expect(result.body).toEqual('"Hi"');
});
