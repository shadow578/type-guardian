import { matchUnion } from '../../Matchers';

describe('matchUnion', () => {
  test('matches target type', () => {
    expect(matchUnion('string', 'number')('i am a string')).toBeTruthy();
    expect(matchUnion('string', 'number')(12)).toBeTruthy();
  });

  test('rejects undefined and null', () => {
    expect(matchUnion('string')(undefined)).toBeFalsy();
    expect(matchUnion('string')(null)).toBeFalsy();
  });

  test('rejects anything not matching the target type', () => {
    expect(matchUnion('string', 'number')(false)).toBeFalsy();
    expect(matchUnion('string', 'number')({})).toBeFalsy();
  });
});
