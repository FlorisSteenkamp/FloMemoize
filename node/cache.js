/**
 * Returns the same result for the same paramters (where the parameters are
 * considered the same if they have the same length and contain the same
 * ordered elements when elements are compared with `===` (e.g. objects are
 * compared *by reference*).
 *
 * @param f the function to cache
 * @param size the size (length) of the cache before older values will be
 * `shift`ed out into the nether
 */
function cache(f, size = 1) {
    const prevParamss = [];
    const prevResults = [];
    return function (...params) {
        for (let i = 0; i < prevParamss.length; i++) {
            let allSame = true;
            for (let j = 0; j < params.length; j++) {
                const param = params[j];
                if (param !== prevParamss[i][j]) {
                    allSame = false;
                    break;
                }
            }
            if (allSame) {
                //console.log('cache hit');
                return prevResults[i];
            }
        }
        prevParamss.push(params);
        const result = f(...params);
        prevResults.push(result);
        if (prevParamss.length > size) {
            prevParamss.shift();
            prevResults.shift();
        }
        //console.log('cache miss');
        return result;
    };
}
export { cache };
//# sourceMappingURL=cache.js.map