import { pairMap_get, pairMap_set } from "./pair-map.js";
import { cache } from './cache.js';
const SUPPORTED = typeof WeakMap === 'function';
/**
 * Memoize (by reference on the input parameter) the given arity 1 function.
 */
function memoize(f) {
    if (!SUPPORTED) {
        return f;
    }
    const results = new WeakMap();
    return function (a) {
        let result = results.get(a);
        if (result !== undefined) {
            //console.log('cache hit');
            return result;
        }
        //console.log('cache miss');
        result = f(a);
        results.set(a, result);
        return result;
    };
}
/**
 * Memoize (by reference on the ordered input parameters) the given arity 2 function.
 */
function memoize2(f) {
    if (!SUPPORTED) {
        return f;
    }
    const results = new WeakMap();
    return function (a, b) {
        let result = pairMap_get(results, a, b);
        if (result !== undefined) {
            //console.log('cache hit');
            return result;
        }
        //console.log('cache miss');
        result = f(a, b);
        pairMap_set(results, a, b, result);
        return result;
    };
}
export { memoize, memoize2, cache };
//# sourceMappingURL=index.js.map