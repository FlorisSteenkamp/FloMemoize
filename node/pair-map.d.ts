/**
 * Adds an ordered pair of values to the map
 * @param map The map representing the pairs.
 * @param vs The pair to add.
 */
declare function pairMap_set<T extends Object, U extends Object, V>(map: WeakMap<T, WeakMap<U, V>>, v1: T, v2: U, v3: V): void;
/**
 * Returns true if the unordered pair is in the set of pairs (represented by a
 * map).
 * @param map The map representing the pairs.
 * @param vs The pair to check.
 */
declare function pairMap_get<T extends Object, U extends Object, V>(map: WeakMap<T, WeakMap<U, V>>, v1: T, v2: U): V;
export { pairMap_set, pairMap_get };
