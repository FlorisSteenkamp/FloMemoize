"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=index.js.map