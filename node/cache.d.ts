/**
 * Returns the same result for the same paramters (where the parameters are
 * considered the same if they have the same length and contain the same
 * ordered elements when elements are compared with `===` (e.g. objects are
 * compared *by reference*).
 *
 * @param f
 */
declare function cache<V, F extends (...params: any[]) => V>(f: F): typeof f;
export { cache };
