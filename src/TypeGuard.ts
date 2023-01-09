import { match } from './Matchers';
import { TypeGuard, TypeName, TypeMatcher } from './Types';

/**
 * create a {@link TypeGuard} from a {@link TypeName} or {@link TypeMatcher}
 * that matches any input matching the given type
 *
 * @param type the type to match against
 * @returns a type guard that matches any input matching the given type
 */
export function makeTypeGuard<T>(type: TypeName | TypeMatcher): TypeGuard<T> {
  return <TypeGuard<T>>match(type);
}
