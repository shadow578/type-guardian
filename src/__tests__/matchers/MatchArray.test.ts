import { matchArray } from '../../Matchers';

describe('matchArray', () => {
  test('matches empty array when matchEmpty = true', () => {
    expect(matchArray('string', true)([])).toBeTruthy();
  });

  test('rejects empty array when matchEmpty = false', () => {
    expect(matchArray('string', false)([])).toBeFalsy();
  });

  test('matches pure string array', () => {
    expect(matchArray('string')(['a string', 'another string'])).toBeTruthy();
  });

  test('rejects mixed array', () => {
    expect(matchArray('string')(['a string', 12])).toBeFalsy();
  });

  test('rejects undefined and null', () => {
    expect(matchArray('string')(undefined)).toBeFalsy();
    expect(matchArray('string')(null)).toBeFalsy();
  });

  test('rejects non-array types', () => {
    expect(matchArray('string')('not a array')).toBeFalsy();
  });
});
