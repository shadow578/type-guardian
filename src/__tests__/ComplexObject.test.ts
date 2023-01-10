import { matchObject, matchNullable, matchUnion, matchEnumeration, matchArray } from '../Matchers';

/**
 * describes details for a single super hero for use in the super-secret database
 */
interface SuperHero {
  /**
   * the given name of the person behind the hero
   */
  givenName: string;

  /**
   * the surname of the person behind the hero
   */
  surName: string;

  /**
   * how old the person is
   */
  age: number;

  /**
   * net worth of the person.
   * a certain someone insists his net worth to be stored
   * as 'x Billion', so we have to support strings aswell...
   */
  netWorth: number | string;

  /**
   * the names of the friends the person has.
   * Because a certain person (PP) complained, the array may be empty...
   */
  friends: string[];

  /**
   * details about the hero's hero persona
   */
  hero: HeroDetails;
}

/**
 * contains some details about a hero's hero persona
 */
interface HeroDetails {
  /**
   * the choosen name of the hero.
   * ya known, what you would call them after they saved you...
   * because some people just can't decide, this is optional
   */
  heroName?: string;

  /**
   * the hero group this hero is associated with.
   * because some people prefer to work alone, is is optional
   */
  associatedGroup?: 'Avengers' | 'Guardians of the Galaxy' | 'Deadpool Corps' | 'League of Losers';

  /**
   * is this hero actually evil?
   * because for some it's hard to tell, the option 'maybe' is also valid
   */
  isEvil: boolean | 'maybe';

  /**
   * a list of all fights the hero was involved in.
   * every hero must have had at least one fight to appear
   * in our records, so this array may not be empty
   */
  fights: string[];
}

/**
 * type guard for {@link SuperHero} interface
 */
const isSuperHero = matchObject<SuperHero>({
  givenName: 'string',
  surName: 'string',
  age: 'number',
  netWorth: matchUnion('number', 'string'),
  friends: matchArray('string', 'accept-empty'),
  hero: matchObject<HeroDetails>({
    heroName: 'string',
    associatedGroup: matchNullable(
      matchEnumeration('Avengers', 'Guardians of the Galaxy', 'Deadpool Corps', 'League of Losers'),
    ),
    isEvil: matchUnion('boolean', matchEnumeration('maybe')),
    fights: matchArray('string', 'reject-empty'),
  }),
});

describe('complex object guard', () => {
  const peter = {
    givenName: 'Peter',
    surName: 'Parker',
    age: 23,
    netWorth: 50.25,
    friends: [],
    hero: {
      heroName: 'Spider-Man',
      associatedGroup: 'Avengers',
      isEvil: false,
      fights: ['Civil War', 'Thanos'],
    },
  };
  const bruce = {
    givenName: 'Bruce',
    surName: 'Wayne',
    age: 33,
    netWorth: '69 Billion',
    friends: ['Alfred Pennyworth'],
    hero: {
      heroName: 'Batman',
      isEvil: 'maybe',
      fights: ['Joker'],
    },
  };

  // test if the objects are valid as-is (they should be)
  test('Peter Parker is a hero', () => {
    expect(isSuperHero(peter)).toBeTruthy();
  });

  test('Bruce Wayne is a hero', () => {
    expect(isSuperHero(bruce)).toBeTruthy();
  });

  // remove a property
  test('reject object with missing property', () => {
    const cloneOfBruce = Object.assign({}, bruce);
    //@ts-expect-error remove a property, ts does not like it
    cloneOfBruce.age = undefined;
    expect(isSuperHero(cloneOfBruce)).toBeFalsy();
  });

  // change one of the enumeration types to something invalid
  test('reject object with invalid enum value', () => {
    const cloneOfPeter = Object.assign({}, peter);
    cloneOfPeter.hero.associatedGroup = 'Peters Friends';
    expect(isSuperHero(cloneOfPeter)).toBeFalsy();
  });
});
