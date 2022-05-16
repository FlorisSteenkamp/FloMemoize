
/**
 * Returns the same result for the same paramters (where the parameters are 
 * considered the same if they have the same length and contain the same 
 * ordered elements when elements are compared with `===` (e.g. objects are 
 * compared *by reference*).
 * 
 * @param f 
 */
 function cache<V,F extends (...params: any[]) => V>(
        f: F): typeof f {

    let prevParams: Parameters<typeof f> | undefined = undefined;
    let prevResult: V | undefined = undefined;

    return function(...params: Parameters<typeof f>): V | undefined {
        if (prevParams === undefined) {
            prevParams = params;
            prevResult = f(...params);
            return prevResult;
        }
        for (let i=0; i<params.length; i++) {
            const param = params[i];
            if (param !== prevParams[i]) {
                prevParams = params;
                prevResult = f(...params);
                return prevResult;
            }
        }

        return prevResult;
    } as F;
}


export { cache }
