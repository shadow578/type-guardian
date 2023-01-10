import { TypeName, TypeGuard, ObjectDescription } from './Types';

/**
 * check if a input matches a expected type.
 * the expected type can either be directly specified (as a {@link TypeName}),
 * or as a {@link TypeGuard}
 *
 * @param input the input value to check
 * @param expectedType the expected type of the input
 * @returns does the input match the expected type
 */
function matchInput(input: unknown, expectedType: TypeName | TypeGuard): boolean {
  switch (typeof expectedType) {
    case 'string':
      // expected type was directly specified as a string
      //
      // special case: in addition to the typeof() strings, TypeString includes
      // an additional entry 'any' that matches every input
      // in that case, the check is skipped
      return expectedType === 'any' || typeof input === expectedType;
    case 'function':
      // expected type is defined as a function to check if the type is allowed
      return expectedType(input);
    default:
      // invalid type
      throw new TypeError('failed to match input because expected type was invalid');
  }
}

/**
 * creates a {@link TypeGuard} that matches any input that is the given type
 *
 * @param type the type to match
 * @returns a matcher that matches any input with the given type
 */
export function match<T>(type: TypeName | TypeGuard): TypeGuard<T> {
  return <TypeGuard<T>>((input: unknown) => {
    return matchInput(input, type);
  });
}

/**
 * creates a {@link TypeGuard} that matches any input matching at least one of the given types
 *
 * @param validTypes a list of types to match
 * @returns a matcher that matches any input that matches at least one of the given types
 */
export function matchUnion<T>(...validTypes: (TypeName | TypeGuard)[]): TypeGuard<T> {
  return <TypeGuard<T>>((input: unknown) => {
    return validTypes.some((type) => matchInput(input, type));
  });
}

/**
 * creates a {@link TypeGuard} that matches any input that is the given type or undefined/null
 *
 * @param type the type to match
 * @returns a matcher that matches any input with the given type or undefined/null
 */
export function matchNullable<T>(type: TypeName | TypeGuard): TypeGuard<T | undefined | null> {
  return <TypeGuard<T | undefined | null>>((input: unknown) => {
    return input === undefined || input === null || matchInput(input, type);
  });
}

/**
 * creates a {@link TypeGuard} that matches any array where every entry matches a given type
 *
 * @param type the type any entry in the array should have
 * @param emptyBehaviour behaviour for empty arrays
 * @returns a matcher that matches any array where every entry matches the given type
 */
export function matchArray<T>(
  type: TypeName | TypeGuard,
  emptyBehaviour: 'accept-empty' | 'reject-empty' = 'accept-empty',
): TypeGuard<T[]> {
  return <TypeGuard<T[]>>((input: unknown) => {
    // not a array
    if (input === undefined || input == null || !Array.isArray(input)) {
      return false;
    }

    // empty array
    if (input.length === 0) {
      return emptyBehaviour === 'accept-empty';
    }

    // check every entry
    return input.every((entry) => matchInput(entry, type));
  });
}

/**
 * creates a {@link TypeGuard} that matches any input whose value is included in a list of valid values.
 * additionally, the type of the input is checked to match the type of the valid values.
 *
 * @param baseValue the first valid value. At least one valid value is required
 * @param additionalValues additional values that are valid. all valid values must have the same type
 * @returns a matcher that matches any input whose value is included in the list of valid values.
 */
export function matchEnumeration<T>(baseValue: T, ...additionalValues: T[]): TypeGuard<T> {
  // get base value type
  const baseType = typeof baseValue;

  // all valid values must have the same type as the base value
  if (!additionalValues.every((value) => typeof value === baseType)) {
    throw new TypeError('all values must have the same type as the base');
  }

  // build the matcher
  const allValidValues = [baseValue, ...additionalValues];
  return <TypeGuard<T>>((input: unknown) => {
    return matchInput(input, baseType) && allValidValues.includes(<T>input);
  });
}

/**
 * creates a {@link TypeGuard} that matches any object that matches the description
 *
 * @param description the object description to match against
 * @returns a matcher that matches any object that matches the description
 * @example
 * matchObject({
 *  // name: string
 *  "name": "string",
 *  // firstName?: string
 *  "firstName": matchNullable("string"),
 *  // gender?: (string | boolean)
 *  "gender": matchNullable(matchSome("string", "boolean")),
 *  // pets?: string[]
 *  "pets": matchNullable(matchArray("string"))
 * });
 */
export function matchObject<T>(description: ObjectDescription<T>): TypeGuard<T> {
  return <TypeGuard<T>>((obj: unknown) => {
    // if it's not a object or it's null, reject it
    if (typeof obj !== 'object' || obj === null) {
      return false;
    }

    for (const propertyName in description) {
      // get the property value from the object
      // typescript really does not like doing this on a object of
      // unknown type, but since we check the property exists on
      // the object, this should be fine to do...
      // hopefully 🙏
      let propertyValue: unknown = undefined;
      if (propertyName in obj) {
        propertyValue = (<never>obj)[propertyName];
      }

      // get the expected type from the description and check
      // if the property value does match that type
      if (!matchInput(propertyValue, description[propertyName])) {
        return false;
      }
    }

    // every property in the description was found and matched the description
    return true;
  });
}
