import { isEmail } from '../../src/utils/isEmail';

describe('unit test - isEmail', () => {
  it('must return true fo valid email', () => {
    expect.hasAssertions();
    expect(isEmail('admin@admin.com')).toBe(true);
  });
  it('must return false fo valid email', () => {
    expect.hasAssertions();
    expect(isEmail('admin@admin')).toBe(false);
  });
});
