/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Fs": () => (/* reexport */ cache),
  "HP": () => (/* reexport */ memoize),
  "pw": () => (/* reexport */ memoize2),
  "O2": () => (/* reexport */ memoizeN)
});

;// CONCATENATED MODULE: ./src/memoize.ts
/**
 * Memoize (by reference on the input parameter) the given arity 1 function.
 *
 * * the input parameter must be an `object` (so it can be used as a key to
 * `WeakMap` and thus garbage collected later; this is especially important
 * in functional programming where a lot of garbage collection takes place;
 *
 * * use `memoizePrimitive` instead if it is not important that the keys
 * will *never* be garbage collected
 */
function memoize(f) {
    const results = new WeakMap();
    return function (t) {
        let r = results.get(t);
        if (r !== undefined) {
            //console.log('cache hit');
            return r;
        }
        //console.log('cache miss');
        r = f(t);
        results.set(t, r);
        return r;
    };
}


;// CONCATENATED MODULE: ./src/cache.ts
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


;// CONCATENATED MODULE: ./src/memoize-n.ts
/**
 * Memoize (by reference on the ordered input parameters) the given arity 0
 * function
 *
 * * primitive input parameters are not currently supported
 */
function memoize0(f) {
    let r;
    let executed = false;
    return function () {
        if (!executed) {
            r = f();
            executed = true;
        }
        return r;
    };
}
/**
  * Memoize (by reference on the input parameter) the given arity 1 function.
 *
 * * the input parameter must be an `object` (so it can be used as a key to
 * `WeakMap` and thus garbage collected later; this is especially important
 * in functional programming where a lot of garbage collection takes place;
 *
 * * use `memoizePrimitive` instead if primitive parameter values need to be
 * supported and it is not important that the keys will *never* be garbage
 * collected
 */
function memoize1(f) {
    const map = new WeakMap();
    return function (t) {
        let r;
        if (!map.has(t)) {
            //console.log('cache hit');
            r = f(t);
            map.set(t, r);
        }
        else {
            r = map.get(t);
        }
        //console.log('cache miss');
        return r;
    };
}
/**
 * Memoize (by reference on the ordered input parameters) the given arity 2
 * function
 *
 * * primitive input parameters are not currently supported
 */
function memoize2(f) {
    const mapA = new WeakMap();
    return function (a, b) {
        let mapB = mapA.get(a);
        if (mapB === undefined) {
            // console.log('cache miss A');
            mapB = new WeakMap();
            mapA.set(a, mapB);
        }
        // else { console.log('cache hit A'); }
        let r;
        if (!mapB.has(b)) {
            // console.log('cache miss B');
            r = f(a, b);
            mapB.set(b, r);
        }
        else {
            // console.log('cache hit B');
            r = mapB.get(b);
        }
        return r;
    };
}
/**
 * Memoize (by reference on the ordered input parameters) the given arity 3
 * function
 *
 * * primitive input parameters are not currently supported
 */
function memoize3(f) {
    const mapA = new WeakMap();
    return function (a, b, c) {
        let mapB = mapA.get(a);
        if (mapB === undefined) {
            mapB = new WeakMap();
            mapA.set(a, mapB);
        }
        let mapC = mapB.get(b);
        if (mapC === undefined) {
            mapC = new WeakMap();
            mapB.set(b, mapC);
        }
        let r;
        if (!mapC.has(c)) {
            // console.log('cache miss C');
            r = f(a, b, c);
            mapC.set(c, r);
        }
        else {
            // console.log('cache hit C');
            r = mapC.get(c);
        }
        return r;
    };
}
/**
 * Memoize (by reference on the ordered input parameters) the given arity 4
 * function
 *
 * * primitive input parameters are not currently supported
 */
function memoize4(f) {
    const mapA = new WeakMap();
    return function (a, b, c, d) {
        let mapB = mapA.get(a);
        if (mapB === undefined) {
            mapB = new WeakMap();
            mapA.set(a, mapB);
        }
        let mapC = mapB.get(b);
        if (mapC === undefined) {
            mapC = new WeakMap();
            mapB.set(b, mapC);
        }
        let mapD = mapC.get(c);
        if (mapD === undefined) {
            mapD = new WeakMap();
            mapC.set(c, mapD);
        }
        let r;
        if (!mapD.has(d)) {
            // console.log('cache miss D');
            r = f(a, b, c, d);
            mapD.set(d, r);
        }
        else {
            // console.log('cache hit D');
            r = mapD.get(d);
        }
        return r;
    };
}
/**
 * Memoize (by reference on the ordered input parameters) the given arity 5
 * function
 *
 * * primitive input parameters are not currently supported
 */
function memoize5(f) {
    const mapA = new WeakMap();
    return function (a, b, c, d, e) {
        let mapB = mapA.get(a);
        if (mapB === undefined) {
            mapB = new WeakMap();
            mapA.set(a, mapB);
        }
        let mapC = mapB.get(b);
        if (mapC === undefined) {
            mapC = new WeakMap();
            mapB.set(b, mapC);
        }
        let mapD = mapC.get(c);
        if (mapD === undefined) {
            mapD = new WeakMap();
            mapC.set(c, mapD);
        }
        let mapE = mapD.get(d);
        if (mapE === undefined) {
            mapE = new WeakMap();
            mapD.set(d, mapE);
        }
        let r;
        if (!mapE.has(e)) {
            // console.log('cache miss E');
            r = f(a, b, c, d, e);
            mapE.set(e, r);
        }
        else {
            // console.log('cache hit E');
            r = mapE.get(e);
        }
        return r;
    };
}
/**
 * Memoize (by reference on the ordered input parameters) the given arity 6
 * function
 *
 * * primitive input parameters are not currently supported
 */
function memoize6(f) {
    const mapA = new WeakMap();
    return function (a, b, c, d, e, g) {
        let mapB = mapA.get(a);
        if (mapB === undefined) {
            mapB = new WeakMap();
            mapA.set(a, mapB);
        }
        let mapC = mapB.get(b);
        if (mapC === undefined) {
            mapC = new WeakMap();
            mapB.set(b, mapC);
        }
        let mapD = mapC.get(c);
        if (mapD === undefined) {
            mapD = new WeakMap();
            mapC.set(c, mapD);
        }
        let mapE = mapD.get(d);
        if (mapE === undefined) {
            mapE = new WeakMap();
            mapD.set(d, mapE);
        }
        let mapG = mapE.get(e);
        if (mapG === undefined) {
            mapG = new WeakMap();
            mapE.set(e, mapG);
        }
        let r;
        if (!mapG.has(g)) {
            r = f(a, b, c, d, e, g);
            mapG.set(g, r);
        }
        else {
            r = mapG.get(g);
        }
        return r;
    };
}
/**
 * Memoize (by reference on the ordered input parameters) the given function
 * up to arity 6.
 *
 * * primitive input parameters are not currently supported
 */
function memoizeN(f) {
    const len = f.length;
    if (len > 6) {
        throw new Error('A maximum of 6 formal parameters are supported');
    }
    if (len === 0) {
        // @ts-ignore
        return memoize0(f);
    }
    if (len === 1) {
        // @ts-ignore
        return memoize1(f);
    }
    if (len === 2) {
        // @ts-ignore
        return memoize2(f);
    }
    if (len === 3) {
        // @ts-ignore
        return memoize3(f);
    }
    if (len === 4) {
        // @ts-ignore
        return memoize4(f);
    }
    if (len === 5) {
        // @ts-ignore
        return memoize5(f);
    }
    // if (len === 6) {
    // @ts-ignore
    return memoize6(f);
    // }
}

// TEST
/*
function Test() {
    function delay() {
        let t=0; for (let i=0; i<1_000_000; i++) { t+=1; }
    }

    interface NumA { v: number }
    interface NumB { v: number, u1: 0 }
    interface NumC { v: number, u2: 0 }
    interface NumD { v: number, u3: 0 }
    interface NumE { v: number, u4: 0 }
    interface NumF { v: number, u5: 0 }

    const A0: NumA = { v: 0 };
    const A1: NumA = { v: 1 };
    const A2: NumA = { v: 2 };
    const A4: NumA = { v: 4 };
    const A8: NumA = { v: 8 };

    const B0: NumB = { v: 0, u1: 0 };
    const B1: NumB = { v: 1, u1: 0 };
    const B2: NumB = { v: 2, u1: 0 };
    const B4: NumB = { v: 4, u1: 0 };
    const B8: NumB = { v: 8, u1: 0 };

    const C0: NumC = { v: 0, u2: 0 };
    const C1: NumC = { v: 1, u2: 0 };
    const C2: NumC = { v: 2, u2: 0 };
    const C4: NumC = { v: 4, u2: 0 };
    const C8: NumC = { v: 8, u2: 0 };

    const D0: NumD = { v: 0, u3: 0 };
    const D1: NumD = { v: 1, u3: 0 };
    const D2: NumD = { v: 2, u3: 0 };
    const D4: NumD = { v: 4, u3: 0 };
    const D8: NumD = { v: 8, u3: 0 };

    const E0: NumE = { v: 0, u4: 0 };
    const E1: NumE = { v: 1, u4: 0 };
    const E2: NumE = { v: 2, u4: 0 };
    const E4: NumE = { v: 4, u4: 0 };
    const E8: NumE = { v: 8, u4: 0 };


    function add0() {
        delay();
        return 4;
    }

    function add1(a: NumA) {
        delay();
        return a.v;
    }

    function add2(a: NumA, b: NumB) {
        delay();
        return a.v + b.v;
    }

    function add3(a: NumA, b: NumB, c: NumC) {
        delay();
        return a.v + b.v + c.v;
    }

    function add4(a: NumA, b: NumB, c: NumC, d: NumD) {
        delay();
        return a.v + b.v + c.v + d.v;
    }

    function add5(a: NumA, b: NumB, c: NumC, d: NumD, e: NumE) {
        delay();
        return a.v + b.v + c.v + d.v + e.v;
    }

    function add6(a: NumA, b: NumB, c: NumC, d: NumD, e: NumE, f: NumF) {
        delay();
        return a.v + b.v + c.v + d.v + e.v + f.v;
    }

    const add0$$ = memoizeN(add0);
    const add1$$ = memoizeN(add1);
    const add2$$ = memoizeN(add2);
    const add3$$ = memoizeN(add3);
    const add4$$ = memoizeN(add4);
    const add5$$ = memoizeN(add5);
    // const add6$$ = memoizeN(add6);

    // ------------------------------------------
    add0$$();  //?.$
    add0$$();  //?.$
    add0$$();  //?.$
    add0$$();  //?.$
    // ------------------------------------------
    add1$$(A0);  //?.$
    add1$$(A1);  //?.$
    add1$$(A1);  //?.$
    add1$$(A2);  //?.$
    // ------------------------------------------
    add2$$(A0,B1); //?.$
    add2$$(A0,B1); //?.$
    add2$$(A0,B2); //?.$
    add2$$(A0,B1); //?.$
    add2$$(A0,B2); //?.$
    add2$$(A1,B0); //?.$
    add2$$(A0,B4); //?.$
    add2$$(A2,B4); //?.$
    add2$$(A2,B8); //?.$

    add2$$(A8,B4); //?.$
    add2$$(A8,B4); //?.$
    add2$$(A8,B4); //?.$

    add2$$(A8,B0); //?.$
    add2$$(A8,B1); //?.$
    add2$$(A8,B2); //?.$
    add2$$(A8,B1); //?.$
    // ------------------------------------------
    add3$$(A0,B1,C1); //?.$
    add3$$(A0,B1,C1); //?.$
    add3$$(A0,B2,C1); //?.$
    add3$$(A0,B1,C1); //?.$
    add3$$(A0,B1,C1); //?.$
    add3$$(A0,B1,C1); //?.$
    add3$$(A0,B1,C1); //?.$
    add3$$(C1,B1,C1); //?.$
    add3$$(C1,B1,C1); //?.$
    // ------------------------------------------
    add4$$(A4,B1,C1,D4); //?.$
    add4$$(A8,B1,C1,D4); //?.$
    add4$$(A8,B2,C1,D4); //?.$
    add4$$(A8,B2,C1,D4); //?.$
    add4$$(A4,B1,C1,D4); //?.$
    // ------------------------------------------
    add5$$(A4,B1,C1,D4,E1); //?.$
    add5$$(A8,B1,C1,D4,E1); //?.$
    add5$$(A8,B2,C1,D4,E1); //?.$
    add5$$(A8,B2,C1,D4,E1); //?.$
    add5$$(A8,B2,C1,D4,E1); //?.$
    add5$$(A4,B1,C1,D4,E2); //?.$
    // ------------------------------------------

    add5$$(A8,B2,C1,D4,E8); //?.
    for (let i=0; i<1000; i++) {
        add5$$(A8,B2,C1,D4,E8); //?.
    }
}
Test();
*/

;// CONCATENATED MODULE: ./src/index.ts





var __webpack_exports__cache = __webpack_exports__.Fs;
var __webpack_exports__memoize = __webpack_exports__.HP;
var __webpack_exports__memoize2 = __webpack_exports__.pw;
var __webpack_exports__memoizeN = __webpack_exports__.O2;
export { __webpack_exports__cache as cache, __webpack_exports__memoize as memoize, __webpack_exports__memoize2 as memoize2, __webpack_exports__memoizeN as memoizeN };
