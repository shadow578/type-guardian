import { matchNullable } from '../../Matchers';

describe('matchNullable', () => {
  test('matches undefined and null', () => {
    expect(matchNullable('string')(undefined)).toBeTruthy();
    expect(matchNullable('string')(null)).toBeTruthy();
  });

  test('matches non-null value', () => {
    expect(matchNullable('string')('i am a string')).toBeTruthy();
    expect(matchNullable('number')(12)).toBeTruthy();
    expect(matchNullable('object')({})).toBeTruthy();
  });

  test('rejects anything not matching the type', () => {
    expect(matchNullable('number')('i am a string')).toBeFalsy();
    expect(matchNullable('object')(12)).toBeFalsy();
    expect(matchNullable('string')({})).toBeFalsy();
  });
});
