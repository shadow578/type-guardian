/* eslint-disable @typescript-eslint/no-empty-function */
import { match } from '../../Matchers';

describe('match', () => {
  // string
  describe('for strings', () => {
    test('strings are accepted', () => {
      expect(match('string')('i am a string')).toBeTruthy();
    });

    test('other types are rejected', () => {
      [
        12, // number
        12.5, // number
        BigInt(6400), // bigint
        BigInt(-12), // bigint
        false, // boolean
        true, // boolean
        Symbol('symbol'), // symbol
        undefined, // undefined
        {}, // object
        null, // object
        () => {}, // function
      ].forEach((value) => {
        expect(match('string')(value)).toBeFalsy();
      });
    });
  });

  // number
  describe('for numbers', () => {
    test('numbers are accepted', () => {
      expect(match('number')(12)).toBeTruthy();
      expect(match('number')(12.5)).toBeTruthy();
    });

    test('other types are rejected', () => {
      [
        'i am a string', // string
        BigInt(6400), // bigint
        BigInt(-12), // bigint
        false, // boolean
        true, // boolean
        Symbol('symbol'), // symbol
        undefined, // undefined
        {}, // object
        null, // object
        () => {}, // function
      ].forEach((value) => {
        expect(match('number')(value)).toBeFalsy();
      });
    });
  });

  // bigint
  describe('for bigints', () => {
    test('bigints are accepted', () => {
      expect(match('bigint')(BigInt(6400))).toBeTruthy();
      expect(match('bigint')(BigInt(-12))).toBeTruthy();
    });

    test('other types are rejected', () => {
      [
        'i am a string', // string
        12, // number
        12.5, // number
        false, // boolean
        true, // boolean
        Symbol('symbol'), // symbol
        undefined, // undefined
        {}, // object
        null, // object
        () => {}, // function
      ].forEach((value) => {
        expect(match('bigint')(value)).toBeFalsy();
      });
    });
  });

  // boolean
  describe('for booleans', () => {
    test('booleans are accepted', () => {
      expect(match('boolean')(true)).toBeTruthy();
      expect(match('boolean')(false)).toBeTruthy();
    });

    test('other types are rejected', () => {
      [
        'i am a string', // string
        12, // number
        12.5, // number
        BigInt(6400), // bigint
        BigInt(-12), // bigint
        Symbol('symbol'), // symbol
        undefined, // undefined
        {}, // object
        null, // object
        () => {}, // function
      ].forEach((value) => {
        expect(match('boolean')(value)).toBeFalsy();
      });
    });
  });

  // symbol
  describe('for symbols', () => {
    test('symbols are accepted', () => {
      expect(match('symbol')(Symbol('symbol'))).toBeTruthy();
    });

    test('other types are rejected', () => {
      [
        'i am a string', // string
        12, // number
        12.5, // number
        BigInt(6400), // bigint
        BigInt(-12), // bigint
        false, // boolean
        true, // boolean
        undefined, // undefined
        {}, // object
        null, // object
        () => {}, // function
      ].forEach((value) => {
        expect(match('symbol')(value)).toBeFalsy();
      });
    });
  });

  // object
  describe('for objects', () => {
    test('objects are accepted', () => {
      expect(match('object')({})).toBeTruthy();
      expect(match('object')({ name: 'Peter' })).toBeTruthy();
    });

    test('null is accepted', () => {
      expect(match('object')(null)).toBeTruthy();
    });

    test('other types are rejected', () => {
      [
        'i am a string', // string
        12, // number
        12.5, // number
        BigInt(6400), // bigint
        BigInt(-12), // bigint
        false, // boolean
        true, // boolean
        Symbol('symbol'), // symbol
        undefined, // undefined
        () => {}, // function
      ].forEach((value) => {
        expect(match('object')(value)).toBeFalsy();
      });
    });
  });

  // function
  describe('for functions', () => {
    test('functions are accepted', () => {
      function foobar() {}
      expect(match('function')(foobar)).toBeTruthy();
    });

    test('arrow functions are accepted', () => {
      expect(match('function')(() => {})).toBeTruthy();
    });

    test('other types are rejected', () => {
      [
        'i am a string', // string
        12, // number
        12.5, // number
        BigInt(6400), // bigint
        BigInt(-12), // bigint
        false, // boolean
        true, // boolean
        Symbol('symbol'), // symbol
        undefined, // undefined
        {}, // object
        null, // object
      ].forEach((value) => {
        expect(match('function')(value)).toBeFalsy();
      });
    });
  });

  // undefined
  describe('for undefined', () => {
    test('undefined is accepted', () => {
      // undefined should be accepted as a typeguard of type 'unaccepted' even if it is not nullable
      expect(match('undefined')(undefined)).toBeTruthy();
    });

    test('other types are rejected', () => {
      [
        'i am a string', // string
        12, // number
        12.5, // number
        BigInt(6400), // bigint
        BigInt(-12), // bigint
        false, // boolean
        true, // boolean
        Symbol('symbol'), // symbol
        {}, // object
        null, // object
        () => {}, // function
      ].forEach((value) => {
        expect(match('undefined')(value)).toBeFalsy();
      });
    });
  });

  // any
  describe('for any', () => {
    test('any type is accepted', () => {
      [
        'i am a string', // string
        12, // number
        12.5, // number
        BigInt(6400), // bigint
        BigInt(-12), // bigint
        false, // boolean
        true, // boolean
        Symbol('symbol'), // symbol
        undefined, // undefined
        {}, // object
        null, // object
        () => {}, // function
      ].forEach((value) => {
        expect(match('any')(value)).toBeTruthy();
      });
    });
  });
});
