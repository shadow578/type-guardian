import { matchObject, matchNullable, matchUnion, matchEnumeration, matchArray } from '../../Matchers';

describe('matchObject', () => {
  describe('basics', () => {
    test('rejects null and undefined', () => {
      expect(matchObject({})(undefined)).toBeFalsy();
      expect(matchObject({})(null)).toBeFalsy();
    });

    test('rejects non-objects', () => {
      expect(matchObject({})('i am a string')).toBeFalsy();
      expect(matchObject({})(120)).toBeFalsy();
    });
  });

  describe('direct description', () => {
    test('matches valid object', () => {
      expect(
        matchObject({
          firstName: 'string',
          lastName: 'string',
          age: 'number',
          isSpiderman: 'boolean',
        })({
          firstName: 'Peter',
          lastName: 'Parker',
          age: 24,
          isSpiderman: true,
        }),
      ).toBeTruthy();
    });

    test('rejects object with missing property', () => {
      expect(
        matchObject({
          firstName: 'string',
          lastName: 'string',
          age: 'number',
          isSpiderman: 'boolean',
        })({
          firstName: 'Peter',
          lastName: 'Parker',
          age: 24,
          //isSpiderman: undefined,
        }),
      ).toBeFalsy();
    });

    test('rejects object with wrong property type', () => {
      expect(
        matchObject({
          firstName: 'string',
          lastName: 'string',
          age: 'number',
          isSpiderman: 'boolean',
        })({
          firstName: 'Peter',
          lastName: 'Parker',
          age: 24,
          isSpiderman: 'maybe?',
        }),
      ).toBeFalsy();
    });
  });

  describe('description includes matchers', () => {
    test('matches object including a nullable property', () => {
      expect(
        matchObject({
          firstName: 'string',
          lastName: 'string',
          age: 'number',
          isSpiderman: matchNullable('boolean'),
        })({
          firstName: 'Peter',
          lastName: 'Parker',
          age: 24,
          //isSpiderman: true
        }),
      ).toBeTruthy();
    });

    test('matches object with union type property', () => {
      expect(
        matchObject({
          firstName: 'string',
          lastName: 'string',
          age: 'number',
          gwenLikesHim: matchUnion('boolean', 'string'),
        })({
          firstName: 'Peter',
          lastName: 'Parker',
          age: 24,
          gwenLikesHim: true,
        }),
      ).toBeTruthy();

      expect(
        matchObject({
          firstName: 'string',
          lastName: 'string',
          age: 'number',
          gwenLikesHim: matchUnion('boolean', 'string'),
        })({
          firstName: 'Peter',
          lastName: 'Parker',
          age: 24,
          gwenLikesHim: 'sometimes i guess...',
        }),
      ).toBeTruthy();
    });

    test('matches object with array property', () => {
      expect(
        matchObject({
          firstName: 'string',
          lastName: 'string',
          age: 'number',
          friends: matchArray('string'),
        })({
          firstName: 'Peter',
          lastName: 'Parker',
          age: 24,
          friends: ['Tony', 'Aunt May', "Uncle Ben (if he wasn't dead)"],
        }),
      ).toBeTruthy();
    });

    test('matches object with enum property', () => {
      expect(
        matchObject({
          firstName: 'string',
          lastName: 'string',
          age: 'number',
          gwenLikesHim: matchEnumeration('yes', 'no', 'maybe'),
        })({
          firstName: 'Peter',
          lastName: 'Parker',
          age: 24,
          gwenLikesHim: 'maybe',
        }),
      ).toBeTruthy();
    });
  });
});
