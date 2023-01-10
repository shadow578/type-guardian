import { match, matchNullable, matchArray, matchUnion, matchEnumeration, matchObject } from '../index';

describe('examples in README', () => {
  test('match', () => {
    const isString = match<string>('string');

    expect(isString('')).toBeTruthy();
    expect(isString('i am a string')).toBeTruthy();
    expect(isString(0)).toBeFalsy();
    expect(isString(null)).toBeFalsy();
    expect(isString(undefined)).toBeFalsy();
  });

  test('matchNullable', () => {
    const isNullableString = matchNullable<string | undefined | null>('string');

    expect(isNullableString('')).toBeTruthy();
    expect(isNullableString('i am a string')).toBeTruthy();
    expect(isNullableString(null)).toBeTruthy();
    expect(isNullableString(undefined)).toBeTruthy();
    expect(isNullableString(0)).toBeFalsy();
  });

  test('matchArray, emptyBehaviour = accept-empty (default)', () => {
    const isStringArray = matchArray<string[]>('string'); // equivalent to matchArray('string', 'accept-empty')

    expect(isStringArray(['a string'])).toBeTruthy();
    expect(isStringArray(['a string', 0])).toBeFalsy();
    expect(isStringArray([])).toBeTruthy();
    expect(isStringArray(null)).toBeFalsy();
  });

  test('matchArray, emptyBehaviour = reject-empty', () => {
    const isStringArray = matchArray<string[]>('string', 'reject-empty');

    expect(isStringArray(['a string'])).toBeTruthy();
    expect(isStringArray(['a string', 0])).toBeFalsy();
    expect(isStringArray([])).toBeFalsy();
    expect(isStringArray(null)).toBeFalsy();
  });

  test('matchUnion', () => {
    const isStringOrBoolean = matchUnion<string | boolean>('string', 'boolean');

    expect(isStringOrBoolean('i am a string')).toBeTruthy();
    expect(isStringOrBoolean(true)).toBeTruthy();
    expect(isStringOrBoolean(null)).toBeFalsy();
    expect(isStringOrBoolean(undefined)).toBeFalsy();
    expect(isStringOrBoolean(0)).toBeFalsy();
  });

  test('matchEnum', () => {
    const isMyEnum = matchEnumeration<'yes' | 'no' | 'maybe'>('yes', 'no', 'maybe');

    expect(isMyEnum('yes')).toBeTruthy();
    expect(isMyEnum('no')).toBeTruthy();
    expect(isMyEnum('maybe')).toBeTruthy();
    expect(isMyEnum('something else')).toBeFalsy();
    expect(isMyEnum('')).toBeFalsy();
  });

  test('matchObject', () => {
    interface MyObject {
      name: string;
      age: number;
    }

    const isMyObject = matchObject<MyObject>({
      name: 'string',
      age: 'number',
    });

    expect(
      isMyObject({
        name: 'Peter',
        age: 23,
      }),
    ).toBeTruthy();
    expect(
      isMyObject({
        name: 'Peter',
      }),
    ).toBeFalsy();
    expect(isMyObject({})).toBeFalsy();
    expect(isMyObject(null)).toBeFalsy();
  });
});
