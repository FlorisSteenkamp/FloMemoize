type MapMap<T extends object, R> = {
    readonly weakMap: WeakMap<T, R>;
    readonly map: Map<T, R>;
};
type CachePart<R> = {
    readonly weakMapS: WeakMap<object, MapMap<object, any>>;
    readonly mapS: Map<object, MapMap<object, any>>;
    readonly clearCache: () => void;
    readonly addToCache: (r: R, ...args: any) => void;
};
/**
 * Memoize (by reference on the ordered input parameters) the given function
 * up to arity 8.
 *
 * * prefer most numerous parameters last in formal parameter list
 *
 * @param f the function to memoize
 * @param maxPrimitiveCacheLengths if not `undefined` then the size of caching
 * maps having primitive values is limited to this value (in which case it is
 * a Map (not a WeakMap)). The value corresponds to the index of the function
 * parameter, starting from 0.
 */
declare function memoize<F extends ((...args: any[]) => R), R>(f: F, maxPrimitiveCacheLengths?: number[] | undefined, logCacheMissHit?: boolean): F & CachePart<R>;
export { memoize };
