/**
 * directly matchable type names.
 * equal to what typeof(x) would return, in addition of 'any'
 */
export type TypeName =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function'
  | 'any';

/**
 * a function that checks if a unknown input matches a pre-defined type
 */
export type TypeMatcher = (input: unknown) => boolean;

/**
 * a record describing a object by listing each property and a expected type
 */
export type ObjectDescription = Readonly<Record<string, TypeName | TypeMatcher>>;
