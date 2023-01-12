/**
 * Adds an ordered pair of values to the map.
 *
 * @param map The map representing the pairs.
 * @param v1
 * @param v2
 * @param v3
 */
declare function pairMap_set<T extends object, U extends object, V>(map: WeakMap<T, WeakMap<U, V>>, v1: T, v2: U, v3: V): void;
/**
 * Returns true if the unordered pair is in the set of pairs (represented by a
 * map).
 *
 * @param map The map representing the pairs.
 * @param v1
 * @param v2
 */
declare function pairMap_get<T extends object, U extends object, V>(map: WeakMap<T, WeakMap<U, V>>, v1: T, v2: U): V | undefined;
export { pairMap_set, pairMap_get };
