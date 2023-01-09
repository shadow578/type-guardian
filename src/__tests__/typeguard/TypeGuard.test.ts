import { makeTypeGuard } from '../../TypeGuard';

describe('makeTypeGuard', () => {
  test('returns a typeguard function', () => {
    const isString = makeTypeGuard('string');
    expect(isString).not.toBeUndefined();
    expect(isString).not.toBeNull();
    expect(typeof isString).toEqual('function');
  });

  test('typeguard matches valid inputs', () => {
    const isString = makeTypeGuard('string');
    expect(isString('a string')).toBeTruthy();
    expect(isString('another string')).toBeTruthy();
  });

  test('typeguard rejects invalid inputs', () => {
    const isString = makeTypeGuard('string');
    expect(isString(12)).toBeFalsy();
    expect(isString({})).toBeFalsy();
  });
});
