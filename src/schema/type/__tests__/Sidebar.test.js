import SidebarType from 'type/Sidebar';

describe('Test Sidebar type', () => {
  test('Test name', () => {
    expect(SidebarType.name).toMatchSnapshot();
  });

  test('Test fields', () => {
    expect(Object.keys(SidebarType.getFields())).toMatchSnapshot();
  });
});
