/**
 * Memoize the given arity 1 function.
 */
declare function m1<T extends Object, U>(f: (a: T) => U): (a: T) => U;
declare let Memoize: {
    m1: typeof m1;
};
export default Memoize;
