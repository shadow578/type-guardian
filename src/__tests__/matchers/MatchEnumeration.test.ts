import { matchEnumeration } from '../../Matchers';

describe('matchEnumeration', () => {
  test('rejects undefined and null', () => {
    expect(matchEnumeration('string')(undefined)).toBeFalsy();
    expect(matchEnumeration('string')(null)).toBeFalsy();
  });

  test('rejects values of wrong type', () => {
    expect(matchEnumeration('foo', 'bar')(12)).toBeFalsy();
    expect(matchEnumeration('foo', 'bar')([])).toBeFalsy();
  });

  test('matches valid values', () => {
    expect(matchEnumeration('foo', 'bar')('bar')).toBeTruthy();
    expect(matchEnumeration(42, 24)(42)).toBeTruthy();
  });

  test('reject invalid values', () => {
    expect(matchEnumeration('foo', 'bar')('fizz')).toBeFalsy();
    expect(matchEnumeration(42, 24)(25)).toBeFalsy();
  });

  test('only initializes if all valid value have the same type', () => {
    //@ts-expect-error tests a case only possible in js. ts detects the error at compile...
    expect(() => matchEnumeration('a string', 21)).toThrow(TypeError);
  });
});
