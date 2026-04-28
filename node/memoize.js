function checkMapLength(map, idx, maxPrimitiveCacheLengths) {
    if (map.size === undefined || maxPrimitiveCacheLengths === undefined) {
        return;
    }
    const maxLen = maxPrimitiveCacheLengths[idx];
    if (map.size > maxLen && maxLen !== undefined) {
        // the below is to make sure we use the iterator protocol on the map
        // so we ensure O(1)
        for (const [k] of map) {
            map.delete(k);
            break;
        }
    }
}
/**
 * Memoize the given arity 0 function.
 */
function memoize0(f, maxPrimitiveCacheLengths) {
    let r;
    let executed = false;
    const f_ = function () {
        if (!executed) {
            r = f();
            executed = true;
        }
        return r;
    };
    return f_;
}
/**
  * Memoize (by reference on the input parameter) the given arity 1 function.
 *
 * * prefer most numerous parameters last in formal parameter list
 *
 * @param f the function to memoize
 * @param maxPrimitiveCacheLengths optional array of maximum cache lengths for
 * primitive parameters in the order of the parameters of the functio; use zero
 * (or anything else really) for non-primitive values as they won't be used
 */
function memoize1(f, maxPrimitiveCacheLengths, logCacheMissHit = false) {
    const weakMapS = new WeakMap();
    const mapS = new Map();
    function getRMap(s) {
        const isObjS = (typeof s === "object" || typeof s === 'function') && s !== null;
        return isObjS ? weakMapS : mapS;
    }
    const f_ = function (s) {
        let r;
        const mS = getRMap(s);
        if (!mS.has(s)) {
            if (logCacheMissHit) {
                console.log('cache miss');
            }
            r = f(s);
            mS.set(s, r);
            checkMapLength(mapS, 0, maxPrimitiveCacheLengths);
        }
        else {
            if (logCacheMissHit) {
                console.log('cache hit');
            }
            r = mS.get(s);
        }
        return r;
    };
    f_.mapS = mapS;
    f_.weakMapS = weakMapS;
    f_.clearCache = function () { mapS.clear(); };
    f_.addToCache = function (r, s) {
        const mS = getRMap(s);
        mS.set(s, r);
        checkMapLength(mS, 1, maxPrimitiveCacheLengths);
    };
    return f_;
}
/**
 * Memoize (by reference on the ordered input parameters) the given arity 2
 * function.
 *
 * * prefer most numerous parameters last in formal parameter list
 *
 * * @param cacheLengthForParam1 currently ignored but can easily be
 * implemented if needed
 */
function memoize2(f, maxPrimitiveCacheLengths) {
    const weakMapS = new WeakMap();
    const mapS = new Map();
    function getRMap(s, t) {
        const isObjS = (typeof s === "object" || typeof s === 'function') && s !== null;
        const isObjT = (typeof t === "object" || typeof t === 'function') && t !== null;
        let mS = isObjS ? weakMapS : mapS;
        let mmT = mS.get(s);
        if (mmT === undefined) {
            mmT = { weakMap: new WeakMap(), map: new Map() };
            mS.set(s, mmT);
            checkMapLength(mS, 0, maxPrimitiveCacheLengths);
        }
        return isObjT ? mmT.weakMap : mmT.map;
    }
    function f_(s, t) {
        const mT = getRMap(s, t);
        let r;
        if (!mT.has(t)) {
            r = f(s, t);
            mT.set(t, r);
            checkMapLength(mT, 1, maxPrimitiveCacheLengths);
        }
        else {
            r = mT.get(t);
        }
        return r;
    }
    f_.mapS = mapS;
    f_.weakMapS = weakMapS;
    f_.clearCache = function () { mapS.clear(); };
    f_.addToCache = function (r, s, t) {
        const mT = getRMap(s, t);
        mT.set(t, r);
        checkMapLength(mT, 1, maxPrimitiveCacheLengths);
    };
    return f_;
}
/**
 * Memoize (by reference on the ordered input parameters) the given arity 3
 * function.
 *
 * * prefer most numerous parameters last in formal parameter list
 */
function memoize3(f, maxPrimitiveCacheLengths) {
    const weakMapS = new WeakMap();
    const mapS = new Map();
    function getRMap(s, t, u) {
        const isObjS = (typeof s === "object" || typeof s === 'function') && s !== null;
        const isObjT = (typeof t === "object" || typeof t === 'function') && t !== null;
        const isObjU = (typeof u === "object" || typeof u === 'function') && u !== null;
        let mS = isObjS ? weakMapS : mapS;
        let mmT = mS.get(s);
        if (mmT === undefined) {
            mmT = { weakMap: new WeakMap(), map: new Map() };
            mS.set(s, mmT);
            checkMapLength(mS, 0, maxPrimitiveCacheLengths);
        }
        const mT = isObjT ? mmT.weakMap : mmT.map;
        let mmU = mT.get(t);
        if (mmU === undefined) {
            mmU = { weakMap: new WeakMap(), map: new Map() };
            mT.set(t, mmU);
            checkMapLength(mT, 1, maxPrimitiveCacheLengths);
        }
        return isObjU ? mmU.weakMap : mmU.map;
    }
    const f_ = function (s, t, u) {
        const mU = getRMap(s, t, u);
        let r;
        if (!mU.has(u)) {
            r = f(s, t, u);
            mU.set(u, r);
            checkMapLength(mU, 2, maxPrimitiveCacheLengths);
        }
        else {
            r = mU.get(u);
        }
        return r;
    };
    f_.mapS = mapS;
    f_.weakMapS = weakMapS;
    f_.clearCache = function () { mapS.clear(); };
    f_.addToCache = function (r, s, t, u) {
        const mU = getRMap(s, t, u);
        mU.set(u, r);
        checkMapLength(mU, 2, maxPrimitiveCacheLengths);
    };
    return f_;
}
/**
 * Memoize (by reference on the ordered input parameters) the given arity 4
 * function.
 *
 * * prefer most numerous parameters last in formal parameter list
 */
function memoize4(f, maxPrimitiveCacheLengths, logCacheMissHit = false) {
    const weakMapS = new WeakMap();
    const mapS = new Map();
    function getRMap(s, t, u, v) {
        const isObjS = (typeof s === "object" || typeof s === 'function') && s !== null;
        const isObjT = (typeof t === "object" || typeof t === 'function') && t !== null;
        const isObjU = (typeof u === "object" || typeof u === 'function') && u !== null;
        const isObjV = (typeof v === "object" || typeof v === 'function') && v !== null;
        let mS = isObjS
            ? weakMapS
            : mapS;
        let mmT = mS.get(s);
        if (mmT === undefined) {
            mmT = { weakMap: new WeakMap(), map: new Map() };
            mS.set(s, mmT);
            checkMapLength(mS, 0, maxPrimitiveCacheLengths);
        }
        const mT = isObjT ? mmT.weakMap : mmT.map;
        let mmU = mT.get(t);
        if (mmU === undefined) {
            mmU = { weakMap: new WeakMap(), map: new Map() };
            mT.set(t, mmU);
            checkMapLength(mT, 1, maxPrimitiveCacheLengths);
        }
        const mU = isObjU ? mmU.weakMap : mmU.map;
        let mmV = mU.get(u);
        if (mmV === undefined) {
            mmV = { weakMap: new WeakMap(), map: new Map() };
            mU.set(u, mmV);
            checkMapLength(mU, 2, maxPrimitiveCacheLengths);
        }
        return isObjV ? mmV.weakMap : mmV.map;
    }
    const f_ = function (s, t, u, v) {
        const mV = getRMap(s, t, u, v);
        let r;
        if (!mV.has(v)) {
            if (logCacheMissHit) {
                console.log('cache miss');
            }
            r = f(s, t, u, v);
            mV.set(v, r);
            checkMapLength(mV, 3, maxPrimitiveCacheLengths);
        }
        else {
            if (logCacheMissHit) {
                console.log('cache hit');
            }
            r = mV.get(v);
        }
        return r;
    };
    f_.mapS = mapS;
    f_.weakMapS = weakMapS;
    f_.clearCache = function () { mapS.clear(); };
    f_.addToCache = function (r, s, t, u, v) {
        const mV = getRMap(s, t, u, v);
        mV.set(v, r);
        checkMapLength(mV, 3, maxPrimitiveCacheLengths);
    };
    return f_;
}
/**
 * Memoize (by reference on the ordered input parameters) the given arity 5
 * function.
 *
 * * prefer most numerous parameters last in formal parameter list
 */
function memoize5(f, maxPrimitiveCacheLengths) {
    const weakMapS = new WeakMap();
    const mapS = new Map();
    function getRMap(s, t, u, v, w) {
        const isObjS = (typeof s === "object" || typeof s === 'function') && s !== null;
        const isObjT = (typeof t === "object" || typeof t === 'function') && t !== null;
        const isObjU = (typeof u === "object" || typeof u === 'function') && u !== null;
        const isObjV = (typeof v === "object" || typeof v === 'function') && v !== null;
        const isObjW = (typeof w === "object" || typeof w === 'function') && w !== null;
        let mS = isObjS ? weakMapS : mapS;
        let mmT = mS.get(s);
        if (mmT === undefined) {
            mmT = { weakMap: new WeakMap(), map: new Map() };
            mS.set(s, mmT);
            checkMapLength(mS, 0, maxPrimitiveCacheLengths);
        }
        const mT = isObjT ? mmT.weakMap : mmT.map;
        let mmU = mT.get(t);
        if (mmU === undefined) {
            mmU = { weakMap: new WeakMap(), map: new Map() };
            mT.set(t, mmU);
            checkMapLength(mT, 1, maxPrimitiveCacheLengths);
        }
        const mU = isObjU ? mmU.weakMap : mmU.map;
        let mmV = mU.get(u);
        if (mmV === undefined) {
            mmV = { weakMap: new WeakMap(), map: new Map() };
            mU.set(u, mmV);
            checkMapLength(mU, 2, maxPrimitiveCacheLengths);
        }
        const mV = isObjV ? mmV.weakMap : mmV.map;
        let mmW = mV.get(v);
        if (mmW === undefined) {
            mmW = { weakMap: new WeakMap(), map: new Map() };
            mV.set(v, mmW);
            checkMapLength(mV, 3, maxPrimitiveCacheLengths);
        }
        return isObjW ? mmW.weakMap : mmW.map;
    }
    const f_ = function (s, t, u, v, w) {
        const mW = getRMap(s, t, u, v, w);
        let r;
        if (!mW.has(w)) {
            r = f(s, t, u, v, w);
            mW.set(w, r);
            checkMapLength(mW, 4, maxPrimitiveCacheLengths);
        }
        else {
            r = mW.get(w);
        }
        return r;
    };
    f_.mapS = mapS;
    f_.weakMapS = weakMapS;
    f_.clearCache = function () { mapS.clear(); };
    f_.addToCache = function (r, s, t, u, v, w) {
        const mW = getRMap(s, t, u, v, w);
        mW.set(w, r);
        checkMapLength(mW, 4, maxPrimitiveCacheLengths);
    };
    return f_;
}
/**
 * Memoize (by reference on the ordered input parameters) the given arity 6
 * function.
 *
 * * prefer most numerous parameters last in formal parameter list
 */
function memoize6(f, maxPrimitiveCacheLengths) {
    const weakMapS = new WeakMap();
    const mapS = new Map();
    function getRMap(s, t, u, v, w, x) {
        const isObjS = (typeof s === "object" || typeof s === 'function') && s !== null;
        const isObjT = (typeof t === "object" || typeof t === 'function') && t !== null;
        const isObjU = (typeof u === "object" || typeof u === 'function') && u !== null;
        const isObjV = (typeof v === "object" || typeof v === 'function') && v !== null;
        const isObjW = (typeof w === "object" || typeof w === 'function') && w !== null;
        const isObjX = (typeof x === "object" || typeof x === 'function') && x !== null;
        let mS = isObjS ? weakMapS : mapS;
        let mmT = mS.get(s);
        if (mmT === undefined) {
            mmT = { weakMap: new WeakMap(), map: new Map() };
            mS.set(s, mmT);
            checkMapLength(mS, 0, maxPrimitiveCacheLengths);
        }
        const mT = isObjT ? mmT.weakMap : mmT.map;
        let mmU = mT.get(t);
        if (mmU === undefined) {
            mmU = { weakMap: new WeakMap(), map: new Map() };
            mT.set(t, mmU);
            checkMapLength(mT, 1, maxPrimitiveCacheLengths);
        }
        const mU = isObjU ? mmU.weakMap : mmU.map;
        let mmV = mU.get(u);
        if (mmV === undefined) {
            mmV = { weakMap: new WeakMap(), map: new Map() };
            mU.set(u, mmV);
            checkMapLength(mU, 2, maxPrimitiveCacheLengths);
        }
        const mV = isObjV ? mmV.weakMap : mmV.map;
        let mmW = mV.get(v);
        if (mmW === undefined) {
            mmW = { weakMap: new WeakMap(), map: new Map() };
            mV.set(v, mmW);
            checkMapLength(mV, 3, maxPrimitiveCacheLengths);
        }
        const mW = isObjW ? mmW.weakMap : mmW.map;
        let mmX = mW.get(w);
        if (mmX === undefined) {
            mmX = { weakMap: new WeakMap(), map: new Map() };
            mW.set(w, mmX);
            checkMapLength(mW, 4, maxPrimitiveCacheLengths);
        }
        return isObjX ? mmX.weakMap : mmX.map;
    }
    const f_ = function (s, t, u, v, w, x) {
        const mX = getRMap(s, t, u, v, w, x);
        let r;
        if (!mX.has(x)) {
            r = f(s, t, u, v, w, x);
            mX.set(x, r);
            checkMapLength(mX, 5, maxPrimitiveCacheLengths);
        }
        else {
            r = mX.get(x);
        }
        return r;
    };
    f_.mapS = mapS;
    f_.weakMapS = weakMapS;
    f_.clearCache = function () { mapS.clear(); };
    f_.addToCache = function (r, s, t, u, v, w, x) {
        const mX = getRMap(s, t, u, v, w, x);
        mX.set(x, r);
        checkMapLength(mX, 5, maxPrimitiveCacheLengths);
    };
    return f_;
}
/**
 * Memoize (by reference on the ordered input parameters) the given arity 7
 * function.
 *
 * * prefer most numerous parameters last in formal parameter list
 */
function memoize7(f, maxPrimitiveCacheLengths) {
    const weakMapS = new WeakMap();
    const mapS = new Map();
    function getRMap(s, t, u, v, w, x, y) {
        const isObjS = (typeof s === "object" || typeof s === 'function') && s !== null;
        const isObjT = (typeof t === "object" || typeof t === 'function') && t !== null;
        const isObjU = (typeof u === "object" || typeof u === 'function') && u !== null;
        const isObjV = (typeof v === "object" || typeof v === 'function') && v !== null;
        const isObjW = (typeof w === "object" || typeof w === 'function') && w !== null;
        const isObjX = (typeof x === "object" || typeof x === 'function') && x !== null;
        const isObjY = (typeof y === "object" || typeof y === 'function') && y !== null;
        let mS = isObjS ? weakMapS : mapS;
        let mmT = mS.get(s);
        if (mmT === undefined) {
            mmT = { weakMap: new WeakMap(), map: new Map() };
            mS.set(s, mmT);
            checkMapLength(mS, 0, maxPrimitiveCacheLengths);
        }
        const mT = isObjT ? mmT.weakMap : mmT.map;
        let mmU = mT.get(t);
        if (mmU === undefined) {
            mmU = { weakMap: new WeakMap(), map: new Map() };
            mT.set(t, mmU);
            checkMapLength(mT, 1, maxPrimitiveCacheLengths);
        }
        const mU = isObjU ? mmU.weakMap : mmU.map;
        let mmV = mU.get(u);
        if (mmV === undefined) {
            mmV = { weakMap: new WeakMap(), map: new Map() };
            mU.set(u, mmV);
            checkMapLength(mU, 2, maxPrimitiveCacheLengths);
        }
        const mV = isObjV ? mmV.weakMap : mmV.map;
        let mmW = mV.get(v);
        if (mmW === undefined) {
            mmW = { weakMap: new WeakMap(), map: new Map() };
            mV.set(v, mmW);
            checkMapLength(mV, 3, maxPrimitiveCacheLengths);
        }
        const mW = isObjW ? mmW.weakMap : mmW.map;
        let mmX = mW.get(w);
        if (mmX === undefined) {
            mmX = { weakMap: new WeakMap(), map: new Map() };
            mW.set(w, mmX);
            checkMapLength(mW, 4, maxPrimitiveCacheLengths);
        }
        const mX = isObjX ? mmX.weakMap : mmX.map;
        let mmY = mX.get(x);
        if (mmY === undefined) {
            mmY = { weakMap: new WeakMap(), map: new Map() };
            mX.set(x, mmY);
            checkMapLength(mX, 5, maxPrimitiveCacheLengths);
        }
        return isObjY ? mmY.weakMap : mmY.map;
    }
    const f_ = function (s, t, u, v, w, x, y) {
        const mY = getRMap(s, t, u, v, w, x, y);
        let r;
        if (!mY.has(y)) {
            r = f(s, t, u, v, w, x, y);
            mY.set(y, r);
            checkMapLength(mY, 6, maxPrimitiveCacheLengths);
        }
        else {
            r = mY.get(y);
        }
        return r;
    };
    f_.mapS = mapS;
    f_.weakMapS = weakMapS;
    f_.clearCache = function () { mapS.clear(); };
    f_.addToCache = function (r, s, t, u, v, w, x, y) {
        const mY = getRMap(s, t, u, v, w, x, y);
        mY.set(y, r);
        checkMapLength(mY, 6, maxPrimitiveCacheLengths);
    };
    return f_;
}
/**
 * Memoize (by reference on the ordered input parameters) the given arity 8
 * function.
 *
 * * prefer most numerous parameters last in formal parameter list
 */
function memoize8(f, maxPrimitiveCacheLengths) {
    const weakMapS = new WeakMap();
    const mapS = new Map();
    function getRMap(s, t, u, v, w, x, y, z) {
        const isObjS = (typeof s === "object" || typeof s === 'function') && s !== null;
        const isObjT = (typeof t === "object" || typeof t === 'function') && t !== null;
        const isObjU = (typeof u === "object" || typeof u === 'function') && u !== null;
        const isObjV = (typeof v === "object" || typeof v === 'function') && v !== null;
        const isObjW = (typeof w === "object" || typeof w === 'function') && w !== null;
        const isObjX = (typeof x === "object" || typeof x === 'function') && x !== null;
        const isObjY = (typeof y === "object" || typeof y === 'function') && y !== null;
        const isObjZ = (typeof z === "object" || typeof z === 'function') && z !== null;
        let mS = isObjS ? weakMapS : mapS;
        let mmT = mS.get(s);
        if (mmT === undefined) {
            mmT = { weakMap: new WeakMap(), map: new Map() };
            mS.set(s, mmT);
            checkMapLength(mS, 0, maxPrimitiveCacheLengths);
        }
        const mT = isObjT ? mmT.weakMap : mmT.map;
        let mmU = mT.get(t);
        if (mmU === undefined) {
            mmU = { weakMap: new WeakMap(), map: new Map() };
            mT.set(t, mmU);
            checkMapLength(mT, 1, maxPrimitiveCacheLengths);
        }
        const mU = isObjU ? mmU.weakMap : mmU.map;
        let mmV = mU.get(u);
        if (mmV === undefined) {
            mmV = { weakMap: new WeakMap(), map: new Map() };
            mU.set(u, mmV);
            checkMapLength(mU, 2, maxPrimitiveCacheLengths);
        }
        const mV = isObjV ? mmV.weakMap : mmV.map;
        let mmW = mV.get(v);
        if (mmW === undefined) {
            mmW = { weakMap: new WeakMap(), map: new Map() };
            mV.set(v, mmW);
            checkMapLength(mV, 3, maxPrimitiveCacheLengths);
        }
        const mW = isObjW ? mmW.weakMap : mmW.map;
        let mmX = mW.get(w);
        if (mmX === undefined) {
            mmX = { weakMap: new WeakMap(), map: new Map() };
            mW.set(w, mmX);
            checkMapLength(mW, 4, maxPrimitiveCacheLengths);
        }
        const mX = isObjX ? mmX.weakMap : mmX.map;
        let mmY = mX.get(x);
        if (mmY === undefined) {
            mmY = { weakMap: new WeakMap(), map: new Map() };
            mX.set(x, mmY);
            checkMapLength(mX, 5, maxPrimitiveCacheLengths);
        }
        const mY = isObjY ? mmY.weakMap : mmY.map;
        let mmZ = mY.get(y);
        if (mmZ === undefined) {
            mmZ = { weakMap: new WeakMap(), map: new Map() };
            mY.set(y, mmZ);
            checkMapLength(mY, 6, maxPrimitiveCacheLengths);
        }
        return isObjZ ? mmZ.weakMap : mmZ.map;
    }
    const f_ = function (s, t, u, v, w, x, y, z) {
        const mZ = getRMap(s, t, u, v, w, x, y, z);
        let r;
        if (!mZ.has(z)) {
            r = f(s, t, u, v, w, x, y, z);
            mZ.set(z, r);
            checkMapLength(mZ, 7, maxPrimitiveCacheLengths);
        }
        else {
            r = mZ.get(z);
        }
        return r;
    };
    f_.mapS = mapS;
    f_.weakMapS = weakMapS;
    f_.clearCache = function () { mapS.clear(); };
    f_.addToCache = function (r, s, t, u, v, w, x, y, z) {
        const mZ = getRMap(s, t, u, v, w, x, y, z);
        mZ.set(z, r);
        checkMapLength(mZ, 7, maxPrimitiveCacheLengths);
    };
    return f_;
}
const memoizeN = [
    memoize0,
    memoize1, memoize2, memoize3, memoize4,
    memoize5, memoize6, memoize7, memoize8
];
/**
 * Memoize (by reference on the ordered input parameters) the given function
 * up to arity 8.
 *
 * * prefer most numerous parameters last in formal parameter list
 *
 * @param f the function to memoize
 * @param maxPrimitiveCacheLengths if not `undefined` then the size of caching
 * maps having primitive values is limited to this value (in which case it is
 * a Map (not a WeakMap)). The value corresponds to the index of the function
 * parameter, starting from 0.
 */
function memoize(f, maxPrimitiveCacheLengths, logCacheMissHit = false) {
    const len = f.length;
    if (len > 8) {
        throw new Error('A maximum of 8 formal parameters are supported');
    }
    const memoize_ = memoizeN[len];
    //@ts-ignore
    return memoize_(f, maxPrimitiveCacheLengths, logCacheMissHit);
}
export { memoize };
//# sourceMappingURL=memoize.js.map