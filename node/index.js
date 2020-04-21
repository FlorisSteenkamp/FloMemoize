"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pair_map_1 = require("./pair-map");
const SUPPORTED = typeof WeakMap === 'function';
/**
 * Memoize (by reference on the input parameter) the given arity 1 function.
 */
function memoize(f) {
    if (!SUPPORTED) {
        return f;
    }
    let results = new WeakMap();
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
exports.memoize = memoize;
/**
 * Memoize (by reference on the ordered input parameters) the given arity 2 function.
 */
function memoize2(f) {
    if (!SUPPORTED) {
        return f;
    }
    let results = new WeakMap();
    return function (a, b) {
        let result = pair_map_1.pairMap_get(results, a, b);
        if (result !== undefined) {
            //console.log('cache hit');
            return result;
        }
        //console.log('cache miss');
        result = f(a, b);
        pair_map_1.pairMap_set(results, a, b, result);
        return result;
    };
}
exports.memoize2 = memoize2;
//# sourceMappingURL=index.js.map