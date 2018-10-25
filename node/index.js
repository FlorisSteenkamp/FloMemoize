"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SUPPORTED = typeof WeakMap === 'function';
/**
 * Memoize the given arity 1 function.
 */
function m1(f) {
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
let Memoize = { m1, };
exports.default = Memoize;
//# sourceMappingURL=index.js.map