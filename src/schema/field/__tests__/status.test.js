import { commentStatus, pingStatus } from 'field/status';

describe('Test schema type field definition', () => {
  test('Test comment_status field', () => {
    expect(commentStatus.comment_status.type.name).toMatchSnapshot();
  });

  test('Test ping_status field', () => {
    expect(pingStatus.ping_status.type.name).toMatchSnapshot();
  });
});
