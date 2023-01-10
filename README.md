# type-guardian

Functional, composable type guards.


## Installation

Install `type-guardian` using

```shell
npm install type-guardian
```

## Usage

### Function `match`

```typescript
import { match } from 'type-guardian'
```

The `match` function creates a simple type guard. 
The function takes either a `TypeName` or another `TypeGuard` and returns a new guard for that type:

```typescript
const isString = match<string>('string');

isString(''); // returns true
isString('i am a string'); // returns true
isString(0); // returns false
isString(null); // returns false
isString(undefined); // returns false
```


### Function `matchNullable`

```typescript
import { matchNullable } from 'type-guardian'
```

The `matchNullable` function creates a type guard for a nullable type. 
A nullable type accepts every value of the target type, `null` and `undefined`.
The function takes either a `TypeName` or another `TypeGuard` and returns a new guard for that type:

```typescript
const isNullableString = matchNullable<string|undefined|null>('string');

isNullableString(''); // returns true
isNullableString('i am a string'); // returns true
isNullableString(null); // returns true
isNullableString(undefined); // returns true
isNullableString(0); // returns false
```


### Function `matchArray`

```typescript
import { matchArray } from 'type-guardian'
```

The `matchArray` function creates a type guard for a array of a given type. 
`matchArray` can be configured to either accept or reject empty arrays using the `emptyBehaviour` parameter.
Default behaviour is to accept empty arrays (`accept-empty`). 
The function takes either a `TypeName` or another `TypeGuard` and returns a new guard for that type:

```typescript
const isStringArray = matchArray<string[]>('string'); // equivalent to matchArray('string', 'accept-empty')

isStringArray(['a string']); // returns true
isStringArray(['a string', 0]); // returns false
isStringArray([]); // returns true
isStringArray(null); // returns false
```

Or, with `emptyBehaviour` set to `reject-empty`: 

```typescript
const isStringArray = matchArray<string[]>('string', 'reject-empty');

isStringArray(['a string']); // returns true
isStringArray(['a string', 0]); // returns false
isStringArray([]); // returns false
isStringArray(null); // returns false
```


### Function `matchUnion`

```typescript
import { matchUnion } from 'type-guardian'
```

The `matchUnion` function creates a type guard for a union type. 
The function takes a list of either a `TypeName` or another `TypeGuard` and returns a new guard for the corrosponding union type:

```typescript
const isStringOrBoolean = matchUnion<string|boolean>('string', 'boolean');

isStringOrBoolean('i am a string'); // returns true
isStringOrBoolean(true); // returns true
isStringOrBoolean(null); // returns false
isStringOrBoolean(undefined); // returns false
isStringOrBoolean(0); // returns false
```


### Function `matchEnumeration`

```typescript
import { matchEnumeration } from 'type-guardian'
```

The `matchEnumeration` function creates a type guard for a enumeration. 
The function takes a list of either a `TypeName` or another `TypeGuard` and returns a new guard for the corrosponding union type:

```typescript
const isMyEnum = matchEnumeration<'yes'|'no'|'maybe'>('yes', 'no', 'maybe');

isMyEnum('yes'); // returns true
isMyEnum('no'); // returns true
isMyEnum('maybe'); // returns true
isMyEnum('something else'); // returns false
isMyEnum(''); // returns false
```


### Function `matchObject`

```typescript
import { matchObject } from 'type-guardian'
```

The `matchObject` function creates a type guard for a enumeration. 
The function takes a list of either a `TypeName` or another `TypeGuard` and returns a new guard for the corrosponding union type:

```typescript
const isMyObject = matchObject<MyObject>({
    'name': 'string',
    'age': 'number'
});

isMyObject({
    name: 'Peter',
    age: 23
}); // returns true
isMyObject({
    name: 'Peter'
}); // returns false
isMyObject({}); // returns false
isMyObject(null); // returns false
```

For a more complex example, see [`ComplexObject.test.ts`](https://github.com/shadow578/type-guardian/blob/main/src/__tests__/ComplexObject.test.ts).


### `TypeName`

The `TypeName` type is a enumeration of all basic types available in JavaScript (the same as you can get from `typeof`).
Additionally, it contains a special value `'any'` which matches anything.


### `TypeGuard`

A `TypeGuard` is a function that checks if a input matches a pre-defined type. 
Type guards can be nested to define more complex types or even objects.


## Builtin Type Guards

`type-guardian` comes with type guards for commonly used types. 

```typescript
import { isString } from "type-guardian/TypeGuards"
```


## License
> Copyright 2023 shadow578
> 
> Licensed under the Apache License, Version 2.0 (the "License");
> you may not use this file except in compliance with the License.
> You may obtain a copy of the License at
> 
> http://www.apache.org/licenses/LICENSE-2.0
> 
> Unless required by applicable law or agreed to in writing, > software
> distributed under the License is distributed on an "AS IS" BASIS,
> WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or > implied.
> See the License for the specific language governing permissions > and
> limitations under the License.
