declare let Memoize: {
    m1: <T extends Object, U>(f: (a: T) => U) => (a: T) => U;
};
export default Memoize;
