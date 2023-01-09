import { matchArray } from './Matchers';
import { makeTypeGuard } from './TypeGuard';

/**
 * {@link TypeGuard} for 'string' type
 */
export const isString = makeTypeGuard<string>('string');

/**
 * {@link TypeGuard} for 'string[]' type
 */
export const isStringArray = makeTypeGuard<string[]>(matchArray('string'));

/**
 * {@link TypeGuard} for 'number' type
 */
export const isNumber = makeTypeGuard<number>('number');

/**
 * {@link TypeGuard} for 'number[]' type
 */
export const isNumberArray = makeTypeGuard<number[]>(matchArray('number'));

/**
 * {@link TypeGuard} for 'bigint' type
 */
export const isBigInt = makeTypeGuard<bigint>('bigint');

/**
 * {@link TypeGuard} for 'bigint[]' type
 */
export const isBigIntArray = makeTypeGuard<bigint[]>(matchArray('bigint'));

/**
 * {@link TypeGuard} for 'boolean' type
 */
export const isBoolean = makeTypeGuard<boolean>('boolean');

/**
 * {@link TypeGuard} for 'boolean[]' type
 */
export const isBooleanArray = makeTypeGuard<boolean[]>(matchArray('boolean'));

/**
 * {@link TypeGuard} for 'Symbol' type
 */
export const isSymbol = makeTypeGuard<symbol>('symbol');

/**
 * {@link TypeGuard} for 'Symbol[]' type
 */
export const isSymbolArray = makeTypeGuard<symbol[]>(matchArray('symbol'));

/**
 * {@link TypeGuard} for 'any' type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAny = makeTypeGuard<any>('any');

/**
 * {@link TypeGuard} for 'undefined' type
 */
export const isUndefined = makeTypeGuard<undefined>('undefined');

/**
 * {@link TypeGuard} for 'void' type
 */
export const isVoid = makeTypeGuard<void>('undefined');
