/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./src/cache.ts":
/*!**********************!*\
  !*** ./src/cache.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cache\": () => (/* binding */ cache)\n/* harmony export */ });\n/**\r\n * Returns the same result for the same paramters (where the parameters are\r\n * considered the same if they have the same length and contain the same\r\n * ordered elements when elements are compared with `===` (e.g. objects are\r\n * compared *by reference*).\r\n *\r\n * @param f\r\n */\r\nfunction cache(f) {\r\n    let prevParams = undefined;\r\n    let prevResult = undefined;\r\n    return function (...params) {\r\n        if (prevParams === undefined) {\r\n            prevParams = params;\r\n            prevResult = f(...params);\r\n            return prevResult;\r\n        }\r\n        for (let i = 0; i < params.length; i++) {\r\n            const param = params[i];\r\n            if (param !== prevParams[i]) {\r\n                prevParams = params;\r\n                prevResult = f(...params);\r\n                return prevResult;\r\n            }\r\n        }\r\n        return prevResult;\r\n    };\r\n}\r\n\r\n\n\n//# sourceURL=webpack://flo-memoize/./src/cache.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cache\": () => (/* reexport safe */ _cache_js__WEBPACK_IMPORTED_MODULE_1__.cache),\n/* harmony export */   \"memoize\": () => (/* binding */ memoize),\n/* harmony export */   \"memoize2\": () => (/* binding */ memoize2)\n/* harmony export */ });\n/* harmony import */ var _pair_map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pair-map.js */ \"./src/pair-map.ts\");\n/* harmony import */ var _cache_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cache.js */ \"./src/cache.ts\");\n\r\n\r\nconst SUPPORTED = typeof WeakMap === 'function';\r\n/**\r\n * Memoize (by reference on the input parameter) the given arity 1 function.\r\n */\r\nfunction memoize(f) {\r\n    if (!SUPPORTED) {\r\n        return f;\r\n    }\r\n    let results = new WeakMap();\r\n    return function (a) {\r\n        let result = results.get(a);\r\n        if (result !== undefined) {\r\n            //console.log('cache hit');\r\n            return result;\r\n        }\r\n        //console.log('cache miss');\r\n        result = f(a);\r\n        results.set(a, result);\r\n        return result;\r\n    };\r\n}\r\n/**\r\n * Memoize (by reference on the ordered input parameters) the given arity 2 function.\r\n */\r\nfunction memoize2(f) {\r\n    if (!SUPPORTED) {\r\n        return f;\r\n    }\r\n    let results = new WeakMap();\r\n    return function (a, b) {\r\n        let result = (0,_pair_map_js__WEBPACK_IMPORTED_MODULE_0__.pairMap_get)(results, a, b);\r\n        if (result !== undefined) {\r\n            //console.log('cache hit');\r\n            return result;\r\n        }\r\n        //console.log('cache miss');\r\n        result = f(a, b);\r\n        (0,_pair_map_js__WEBPACK_IMPORTED_MODULE_0__.pairMap_set)(results, a, b, result);\r\n        return result;\r\n    };\r\n}\r\n\r\n\n\n//# sourceURL=webpack://flo-memoize/./src/index.ts?");

/***/ }),

/***/ "./src/pair-map.ts":
/*!*************************!*\
  !*** ./src/pair-map.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"pairMap_get\": () => (/* binding */ pairMap_get),\n/* harmony export */   \"pairMap_set\": () => (/* binding */ pairMap_set)\n/* harmony export */ });\n/**\r\n * Adds an ordered pair of values to the map.\r\n *\r\n * @param map The map representing the pairs.\r\n * @param v1\r\n * @param v2\r\n * @param v3\r\n */\r\nfunction pairMap_set(map, v1, v2, v3) {\r\n    let v1Map = map.get(v1);\r\n    if (!v1Map) {\r\n        v1Map = new Map();\r\n        map.set(v1, v1Map);\r\n    }\r\n    v1Map.set(v2, v3);\r\n}\r\n/**\r\n * Returns true if the unordered pair is in the set of pairs (represented by a\r\n * map).\r\n *\r\n * @param map The map representing the pairs.\r\n * @param v1\r\n * @param v2\r\n */\r\nfunction pairMap_get(map, v1, v2) {\r\n    let v1Map = map.get(v1);\r\n    if (!v1Map) {\r\n        return undefined;\r\n    }\r\n    return v1Map.get(v2);\r\n}\r\n\r\n\n\n//# sourceURL=webpack://flo-memoize/./src/pair-map.ts?");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
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
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval devtool is used.
/******/ var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ var __webpack_exports__cache = __webpack_exports__.cache;
/******/ var __webpack_exports__memoize = __webpack_exports__.memoize;
/******/ var __webpack_exports__memoize2 = __webpack_exports__.memoize2;
/******/ export { __webpack_exports__cache as cache, __webpack_exports__memoize as memoize, __webpack_exports__memoize2 as memoize2 };
/******/ 
