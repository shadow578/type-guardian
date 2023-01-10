import { match, matchArray } from './Matchers';

/**
 * {@link TypeGuard} for 'string' type
 */
export const isString = match<string>('string');

/**
 * {@link TypeGuard} for 'string[]' type
 */
export const isStringArray = matchArray<string[]>('string');

/**
 * {@link TypeGuard} for 'number' type
 */
export const isNumber = match<number>('number');

/**
 * {@link TypeGuard} for 'number[]' type
 */
export const isNumberArray = matchArray<number[]>('number');

/**
 * {@link TypeGuard} for 'bigint' type
 */
export const isBigInt = match<bigint>('bigint');

/**
 * {@link TypeGuard} for 'bigint[]' type
 */
export const isBigIntArray = matchArray<bigint[]>('bigint');

/**
 * {@link TypeGuard} for 'boolean' type
 */
export const isBoolean = match<boolean>('boolean');

/**
 * {@link TypeGuard} for 'boolean[]' type
 */
export const isBooleanArray = matchArray<boolean[]>('boolean');

/**
 * {@link TypeGuard} for 'Symbol' type
 */
export const isSymbol = match<symbol>('symbol');

/**
 * {@link TypeGuard} for 'Symbol[]' type
 */
export const isSymbolArray = matchArray<symbol[]>('symbol');

/**
 * {@link TypeGuard} for 'any' type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAny = match<any>('any');

/**
 * {@link TypeGuard} for 'undefined' type
 */
export const isUndefined = match<undefined>('undefined');

/**
 * {@link TypeGuard} for 'void' type
 */
export const isVoid = match<void>('undefined');
