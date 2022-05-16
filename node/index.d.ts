import { cache } from './cache.js';
/**
 * Memoize (by reference on the input parameter) the given arity 1 function.
 */
declare function memoize<T extends Object, U>(f: (a: T) => U): (a: T) => U;
/**
 * Memoize (by reference on the ordered input parameters) the given arity 2 function.
 */
declare function memoize2<T extends Object, U extends Object, V>(f: (a: T, b: U) => V): (a: T, b: U) => V;
export { memoize, memoize2, cache };
