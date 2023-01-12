var FloMemoize;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "cache": () => (/* reexport */ cache),
  "memoize": () => (/* binding */ memoize),
  "memoize2": () => (/* binding */ memoize2)
});

;// CONCATENATED MODULE: ./src/pair-map.ts
/**
 * Adds an ordered pair of values to the map.
 *
 * @param map The map representing the pairs.
 * @param v1
 * @param v2
 * @param v3
 */
function pairMap_set(map, v1, v2, v3) {
    let v1Map = map.get(v1);
    if (!v1Map) {
        v1Map = new Map();
        map.set(v1, v1Map);
    }
    v1Map.set(v2, v3);
}
/**
 * Returns true if the unordered pair is in the set of pairs (represented by a
 * map).
 *
 * @param map The map representing the pairs.
 * @param v1
 * @param v2
 */
function pairMap_get(map, v1, v2) {
    const v1Map = map.get(v1);
    if (!v1Map) {
        return undefined;
    }
    return v1Map.get(v2);
}


;// CONCATENATED MODULE: ./src/cache.ts
/**
 * Returns the same result for the same paramters (where the parameters are
 * considered the same if they have the same length and contain the same
 * ordered elements when elements are compared with `===` (e.g. objects are
 * compared *by reference*).
 *
 * @param f
 */
function cache(f) {
    let prevParams = undefined;
    let prevResult = undefined;
    return function (...params) {
        if (prevParams === undefined) {
            prevParams = params;
            prevResult = f(...params);
            return prevResult;
        }
        for (let i = 0; i < params.length; i++) {
            const param = params[i];
            if (param !== prevParams[i]) {
                prevParams = params;
                prevResult = f(...params);
                return prevResult;
            }
        }
        return prevResult;
    };
}


;// CONCATENATED MODULE: ./src/index.ts


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


FloMemoize = __webpack_exports__;
/******/ })()
;