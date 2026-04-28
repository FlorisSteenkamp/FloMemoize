
type F0<R> = () => R;
type F1<R,S> = (s: S) => R;
type F2<R,S,T> = (s: S, t: T) => R;
type F3<R,S,T,U> = (s: S, t: T, u: U) => R;
type F4<R,S,T,U,V> = (s: S, t: T, u: U, v: V) => R;
type F5<R,S,T,U,V,W> = (s: S, t: T, u: U, v: V, w: W) => R;
type F6<R,S,T,U,V,W,X> = (s: S, t: T, u: U, v: V, w: W, x: X) => R;
type F7<R,S,T,U,V,W,X,Y> = (s: S, t: T, u: U, v: V, w: W, x: X, y: Y) => R;
type F8<R,S,T,U,V,W,X,Y,Z> = (s: S, t: T, u: U, v: V, w: W, x: X, y: Y, z: Z) => R;



type MapMap<T extends object,R> = {
    readonly weakMap: WeakMap<T,R>;
    readonly map: Map<T,R>;
}


type CachePart<R> = {
    readonly weakMapS: WeakMap<object,MapMap<object,any>>;
    readonly mapS: Map<object,MapMap<object,any>>;
    readonly clearCache: () => void;
    readonly addToCache: (r: R, ...args: any) => void
}


function checkMapLength(
        map: Map<any,any> | WeakMap<any,any>,
        idx: number,
        maxPrimitiveCacheLengths: number[] | undefined) {

    if ((map as Map<any,any>).size === undefined || maxPrimitiveCacheLengths === undefined) { return; }

    const maxLen = maxPrimitiveCacheLengths[idx];
    if ((map as Map<any,any>).size > maxLen && maxLen !== undefined) {
        // the below is to make sure we use the iterator protocol on the map
        // so we ensure O(1)
        for (const [k] of (map as Map<any,any>)) { map.delete(k); break; }
    }
}


/**
 * Memoize the given arity 0 function.
 */
function memoize0<R>(
        f: F0<R>,
        maxPrimitiveCacheLengths?: number[]): F0<R> {

	let r: R;
    let executed = false;
	
	const f_ = function(): R {
        if (!executed) {
            r = f();
            executed = true;
        }

        return r;
	}

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
function memoize1<R,S>(
        f: F1<R,S>,
        maxPrimitiveCacheLengths?: number[],
        logCacheMissHit = false): F1<R,S> {

	const weakMapS = new WeakMap<object,R>();
    const mapS = new Map<object,R>();

    function getRMap(s: S): WeakMap<object,R> {
        const isObjS = (typeof s === "object" || typeof s === 'function') && s !== null;
        return isObjS ? weakMapS : mapS as WeakMap<object,R>;
    }

	const f_ = function(s: S): R {
        let r: R;

        const mS = getRMap(s);

        if (!mS.has(s as object)) {
            if (logCacheMissHit) { console.log('cache miss'); }
            r = f(s);
            mS.set(s as object,r);
            checkMapLength(mapS, 0, maxPrimitiveCacheLengths);
        } else {
            if (logCacheMissHit) { console.log('cache hit'); }
            r = mS.get(s as object)!;
        }

        return r;
	}

    f_.mapS = mapS;
    f_.weakMapS = weakMapS;
    f_.clearCache = function() { mapS.clear(); }
    f_.addToCache = function(r: R, s: S) {
        const mS = getRMap(s);
        mS.set(s as object,r);
        checkMapLength(mS, 1, maxPrimitiveCacheLengths);
    }

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
function memoize2<R,S,T>(
        f: F2<R,S,T>,
        maxPrimitiveCacheLengths?: number[] | undefined): F2<R,S,T> {

	const weakMapS = new WeakMap<object,MapMap<object,R>>();
    const mapS = new Map<object,MapMap<object,R>>();

    function getRMap(s: S, t: T): WeakMap<object,R> {
        const isObjS = (typeof s === "object" || typeof s === 'function') && s !== null;
        const isObjT = (typeof t === "object" || typeof t === 'function') && t !== null;
    
        let mS = isObjS ? weakMapS : mapS;
    
        let mmT = mS.get(s as object);
        if (mmT === undefined) {
            mmT = { weakMap: new WeakMap(), map: new Map() };
            mS.set(s as object, mmT);
            checkMapLength(mS, 0, maxPrimitiveCacheLengths);
        }
    
        return isObjT ? mmT.weakMap : mmT.map;
    }

	function f_(s: S, t: T): R {
        const mT = getRMap(s, t);
        let r: R;
        if (!mT.has(t as object)) {
            r = f(s,t);
            mT.set(t as object,r);
            checkMapLength(mT, 1, maxPrimitiveCacheLengths);
        } else {
            r = mT.get(t as object)!;
        }

		return r;
	}

    f_.mapS = mapS;
    f_.weakMapS = weakMapS;
    f_.clearCache = function() { mapS.clear(); }
    f_.addToCache = function(r: R, s: S, t: T) {
        const mT = getRMap(s, t);
        mT.set(t as object,r);
        checkMapLength(mT, 1, maxPrimitiveCacheLengths);
    }

    return f_;
}


/**
 * Memoize (by reference on the ordered input parameters) the given arity 3
 * function.
 * 
 * * prefer most numerous parameters last in formal parameter list
 */
function memoize3<R,S,T,U>(
        f: F3<R,S,T,U>,
        maxPrimitiveCacheLengths?: number[] | undefined): F3<R,S,T,U> {

	const weakMapS = new WeakMap<object,MapMap<object,MapMap<object,R>>>();
    const mapS = new Map<object,MapMap<object,MapMap<object,R>>>();

    function getRMap(s: S, t: T, u: U): WeakMap<object,R> {
        const isObjS = (typeof s === "object" || typeof s === 'function') && s !== null;
        const isObjT = (typeof t === "object" || typeof t === 'function') && t !== null;
        const isObjU = (typeof u === "object" || typeof u === 'function') && u !== null;

        let mS = isObjS ? weakMapS : mapS;

		let mmT = mS.get(s as object);
        if (mmT === undefined) {
            mmT = { weakMap: new WeakMap(), map: new Map() };
            mS.set(s as object, mmT);
            checkMapLength(mS, 0, maxPrimitiveCacheLengths);
        }

        const mT = isObjT ? mmT.weakMap : mmT.map;

        let mmU = mT.get(t as object);
        if (mmU === undefined) {
            mmU = { weakMap: new WeakMap(), map: new Map() };
            mT.set(t as object, mmU);
            checkMapLength(mT, 1, maxPrimitiveCacheLengths);
        }

        return isObjU ? mmU.weakMap : mmU.map;
    }
	
	const f_ = function(s: S, t: T, u: U): R {
        const mU = getRMap(s, t, u);

        let r: R;
        if (!mU.has(u as object)) {
            r = f(s,t,u);
            mU.set(u as object,r);
            checkMapLength(mU, 2, maxPrimitiveCacheLengths);
        } else {
            r = mU.get(u as object)!;
        }

		return r;
	}

    f_.mapS = mapS;
    f_.weakMapS = weakMapS;
    f_.clearCache = function() { mapS.clear(); }
    f_.addToCache = function(r: R, s: S, t: T, u: U) {
        const mU = getRMap(s,t,u);
        mU.set(u as object,r);
        checkMapLength(mU, 2, maxPrimitiveCacheLengths);
    }

    return f_;
}


/**
 * Memoize (by reference on the ordered input parameters) the given arity 4
 * function.
 * 
 * * prefer most numerous parameters last in formal parameter list
 */
function memoize4<R,S,T,U,V>(
        f: F4<R,S,T,U,V>,
        maxPrimitiveCacheLengths?: number[] | undefined,
        logCacheMissHit = false): F4<R,S,T,U,V> {

    const weakMapS = new WeakMap<object, MapMap<object, MapMap<object, MapMap<object,R>>>>();
    const mapS = new Map<object, MapMap<object, MapMap<object, MapMap<object,R>>>>();

    function getRMap(s: S, t: T, u: U, v: V): WeakMap<object,R> {
        const isObjS = (typeof s === "object" || typeof s === 'function') && s !== null;
        const isObjT = (typeof t === "object" || typeof t === 'function') && t !== null;
        const isObjU = (typeof u === "object" || typeof u === 'function') && u !== null;
        const isObjV = (typeof v === "object" || typeof v === 'function') && v !== null;

        let mS = isObjS
            ? weakMapS
            : mapS;

        let mmT = mS.get(s as object);
        if (mmT === undefined) {
            mmT = { weakMap: new WeakMap(), map: new Map() };
            mS.set(s as object, mmT);
            checkMapLength(mS, 0, maxPrimitiveCacheLengths);
        }

        const mT = isObjT ? mmT.weakMap : mmT.map;

        let mmU = mT.get(t as object);
        if (mmU === undefined) {
            mmU = { weakMap: new WeakMap(), map: new Map() };
            mT.set(t as object, mmU);
            checkMapLength(mT, 1, maxPrimitiveCacheLengths);
        }

        const mU = isObjU ? mmU.weakMap : mmU.map;

        let mmV = mU.get(u as object);
        if (mmV === undefined) {
            mmV = { weakMap: new WeakMap(), map: new Map() };
            mU.set(u as object, mmV);
            checkMapLength(mU, 2, maxPrimitiveCacheLengths);
        }

        return isObjV ? mmV.weakMap : mmV.map;
    }
    
    const f_ = function(s: S, t: T, u: U, v: V): R {
        const mV = getRMap(s,t,u,v);

        let r: R;
        if (!mV.has(v as object)) {
            if (logCacheMissHit) { console.log('cache miss'); }
            r = f(s,t,u,v);
            mV.set(v as object, r);
            checkMapLength(mV, 3, maxPrimitiveCacheLengths);
        } else {
            if (logCacheMissHit) { console.log('cache hit'); }
            r = mV.get(v as object)!;
        }

        return r;
    }

    f_.mapS = mapS;
    f_.weakMapS = weakMapS;
    f_.clearCache = function() { mapS.clear(); }
    f_.addToCache = function(r: R, s: S, t: T, u: U, v: V) {
        const mV = getRMap(s,t,u,v);
        mV.set(v as object, r);
        checkMapLength(mV, 3, maxPrimitiveCacheLengths);
    }

    return f_;
}


/**
 * Memoize (by reference on the ordered input parameters) the given arity 5
 * function.
 * 
 * * prefer most numerous parameters last in formal parameter list
 */
function memoize5<R,S,T,U,V,W>(
        f: F5<R,S,T,U,V,W>,
        maxPrimitiveCacheLengths?: number[] | undefined): F5<R,S,T,U,V,W> {

	const weakMapS = new WeakMap<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,R>>>>>();
    const mapS = new Map<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,R>>>>>();
	
    function getRMap(s: S, t: T, u: U, v: V, w: W): WeakMap<object,R> {
        const isObjS = (typeof s === "object" || typeof s === 'function') && s !== null;
        const isObjT = (typeof t === "object" || typeof t === 'function') && t !== null;
        const isObjU = (typeof u === "object" || typeof u === 'function') && u !== null;
        const isObjV = (typeof v === "object" || typeof v === 'function') && v !== null;
        const isObjW = (typeof w === "object" || typeof w === 'function') && w !== null;

        let mS = isObjS ? weakMapS : mapS;

        let mmT = mS.get(s as object);
        if (mmT === undefined) {
            mmT = { weakMap: new WeakMap(), map: new Map() };
            mS.set(s as object, mmT);
            checkMapLength(mS, 0, maxPrimitiveCacheLengths);
        }

        const mT = isObjT ? mmT.weakMap : mmT.map;

        let mmU = mT.get(t as object);
        if (mmU === undefined) {
            mmU = { weakMap: new WeakMap(), map: new Map() };
            mT.set(t as object, mmU);
            checkMapLength(mT, 1, maxPrimitiveCacheLengths);
        }

        const mU = isObjU ? mmU.weakMap : mmU.map;

        let mmV = mU.get(u as object);
        if (mmV === undefined) {
            mmV = { weakMap: new WeakMap(), map: new Map() };
            mU.set(u as object, mmV);
            checkMapLength(mU, 2, maxPrimitiveCacheLengths);
        }

        const mV = isObjV ? mmV.weakMap : mmV.map;

        let mmW = mV.get(v as object);
        if (mmW === undefined) {
            mmW = { weakMap: new WeakMap(), map: new Map() };
            mV.set(v as object, mmW);
            checkMapLength(mV, 3, maxPrimitiveCacheLengths);
        }

        return isObjW ? mmW.weakMap : mmW.map;
    }

	const f_ = function(s: S, t: T, u: U, v: V, w: W): R {
        const mW = getRMap(s,t,u,v,w);

        let r: R;
        if (!mW.has(w as object)) {
            r = f(s,t,u,v,w);
            mW.set(w as object, r);
            checkMapLength(mW, 4, maxPrimitiveCacheLengths);
        } else {
            r = mW.get(w as object)!;
        }

        return r;
	}

    f_.mapS = mapS;
    f_.weakMapS = weakMapS;
    f_.clearCache = function() { mapS.clear(); }
    f_.addToCache = function(r: R, s: S, t: T, u: U, v: V, w: W) {
        const mW = getRMap(s,t,u,v,w);
        mW.set(w as object, r);
        checkMapLength(mW, 4, maxPrimitiveCacheLengths);
    }

    return f_;
}


/**
 * Memoize (by reference on the ordered input parameters) the given arity 6
 * function.
 * 
 * * prefer most numerous parameters last in formal parameter list
 */
function memoize6<R,S,T,U,V,W,X>(
        f: F6<R,S,T,U,V,W,X>,
        maxPrimitiveCacheLengths?: number[] | undefined): F6<R,S,T,U,V,W,X> {

	const weakMapS = new WeakMap<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,R>>>>>>();
    const mapS = new Map<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,R>>>>>>();
	
    function getRMap(s: S, t: T, u: U, v: V, w: W, x: X): WeakMap<object,R> {
        const isObjS = (typeof s === "object" || typeof s === 'function') && s !== null;
        const isObjT = (typeof t === "object" || typeof t === 'function') && t !== null;
        const isObjU = (typeof u === "object" || typeof u === 'function') && u !== null;
        const isObjV = (typeof v === "object" || typeof v === 'function') && v !== null;
        const isObjW = (typeof w === "object" || typeof w === 'function') && w !== null;
        const isObjX = (typeof x === "object" || typeof x === 'function') && x !== null;

        let mS = isObjS ? weakMapS : mapS;

        let mmT = mS.get(s as object);
        if (mmT === undefined) {
            mmT = { weakMap: new WeakMap(), map: new Map() };
            mS.set(s as object, mmT);
            checkMapLength(mS, 0, maxPrimitiveCacheLengths);
        }

        const mT = isObjT ? mmT.weakMap : mmT.map;

        let mmU = mT.get(t as object);
        if (mmU === undefined) {
            mmU = { weakMap: new WeakMap(), map: new Map() };
            mT.set(t as object, mmU);
            checkMapLength(mT, 1, maxPrimitiveCacheLengths);
        }

        const mU = isObjU ? mmU.weakMap : mmU.map;

        let mmV = mU.get(u as object);
        if (mmV === undefined) {
            mmV = { weakMap: new WeakMap(), map: new Map() };
            mU.set(u as object, mmV);
            checkMapLength(mU, 2, maxPrimitiveCacheLengths);
        }

        const mV = isObjV ? mmV.weakMap : mmV.map;

        let mmW = mV.get(v as object);
        if (mmW === undefined) {
            mmW = { weakMap: new WeakMap(), map: new Map() };
            mV.set(v as object, mmW);
            checkMapLength(mV, 3, maxPrimitiveCacheLengths);
        }

        const mW = isObjW ? mmW.weakMap : mmW.map;

        let mmX = mW.get(w as object);
        if (mmX === undefined) {
            mmX = { weakMap: new WeakMap(), map: new Map() };
            mW.set(w as object, mmX);
            checkMapLength(mW, 4, maxPrimitiveCacheLengths);
        }

        return isObjX ? mmX.weakMap : mmX.map;
    }

	const f_ = function(s: S, t: T, u: U, v: V, w: W, x: X): R {
        const mX = getRMap(s,t,u,v,w,x);

        let r: R;
        if (!mX.has(x as object)) {
            r = f(s,t,u,v,w,x);
            mX.set(x as object, r);
            checkMapLength(mX, 5, maxPrimitiveCacheLengths);
        } else {
            r = mX.get(x as object)!;
        }

        return r;
	}

    f_.mapS = mapS;
    f_.weakMapS = weakMapS;
    f_.clearCache = function() { mapS.clear(); }
    f_.addToCache = function(r: R, s: S, t: T, u: U, v: V, w: W, x: X) {
        const mX = getRMap(s,t,u,v,w,x);
        mX.set(x as object, r);
        checkMapLength(mX, 5, maxPrimitiveCacheLengths);
    }

    return f_;
}


/**
 * Memoize (by reference on the ordered input parameters) the given arity 7
 * function.
 * 
 * * prefer most numerous parameters last in formal parameter list
 */
function memoize7<R,S,T,U,V,W,X,Y>(
        f: F7<R,S,T,U,V,W,X,Y>,
        maxPrimitiveCacheLengths?: number[] | undefined): F7<R,S,T,U,V,W,X,Y> {

	const weakMapS = new WeakMap<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,R>>>>>>>();
    const mapS = new Map<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,R>>>>>>>();
	
    function getRMap(s: S, t: T, u: U, v: V, w: W, x: X, y: Y): WeakMap<object,R> {
        const isObjS = (typeof s === "object" || typeof s === 'function') && s !== null;
        const isObjT = (typeof t === "object" || typeof t === 'function') && t !== null;
        const isObjU = (typeof u === "object" || typeof u === 'function') && u !== null;
        const isObjV = (typeof v === "object" || typeof v === 'function') && v !== null;
        const isObjW = (typeof w === "object" || typeof w === 'function') && w !== null;
        const isObjX = (typeof x === "object" || typeof x === 'function') && x !== null;
        const isObjY = (typeof y === "object" || typeof y === 'function') && y !== null;

        let mS = isObjS ? weakMapS : mapS;

        let mmT = mS.get(s as object);
        if (mmT === undefined) {
            mmT = { weakMap: new WeakMap(), map: new Map() };
            mS.set(s as object, mmT);
            checkMapLength(mS, 0, maxPrimitiveCacheLengths);
        }

        const mT = isObjT ? mmT.weakMap : mmT.map;

        let mmU = mT.get(t as object);
        if (mmU === undefined) {
            mmU = { weakMap: new WeakMap(), map: new Map() };
            mT.set(t as object, mmU);
            checkMapLength(mT, 1, maxPrimitiveCacheLengths);
        }

        const mU = isObjU ? mmU.weakMap : mmU.map;

        let mmV = mU.get(u as object);
        if (mmV === undefined) {
            mmV = { weakMap: new WeakMap(), map: new Map() };
            mU.set(u as object, mmV);
            checkMapLength(mU, 2, maxPrimitiveCacheLengths);
        }

        const mV = isObjV ? mmV.weakMap : mmV.map;

        let mmW = mV.get(v as object);
        if (mmW === undefined) {
            mmW = { weakMap: new WeakMap(), map: new Map() };
            mV.set(v as object, mmW);
            checkMapLength(mV, 3, maxPrimitiveCacheLengths);
        }

        const mW = isObjW ? mmW.weakMap : mmW.map;

        let mmX = mW.get(w as object);
        if (mmX === undefined) {
            mmX = { weakMap: new WeakMap(), map: new Map() };
            mW.set(w as object, mmX);
            checkMapLength(mW, 4, maxPrimitiveCacheLengths);
        }

        const mX = isObjX ? mmX.weakMap : mmX.map;

        let mmY = mX.get(x as object);
        if (mmY === undefined) {
            mmY = { weakMap: new WeakMap(), map: new Map() };
            mX.set(x as object, mmY);
            checkMapLength(mX, 5, maxPrimitiveCacheLengths);
        }

        return isObjY ? mmY.weakMap : mmY.map;
    }

	const f_ = function(s: S, t: T, u: U, v: V, w: W, x: X, y: Y): R {
        const mY = getRMap(s,t,u,v,w,x,y);

        let r: R;
        if (!mY.has(y as object)) {
            r = f(s,t,u,v,w,x,y);
            mY.set(y as object, r);
            checkMapLength(mY, 6, maxPrimitiveCacheLengths);
        } else {
            r = mY.get(y as object)!;
        }

        return r;
	}

    f_.mapS = mapS;
    f_.weakMapS = weakMapS;
    f_.clearCache = function() { mapS.clear(); }
    f_.addToCache = function(r: R, s: S, t: T, u: U, v: V, w: W, x: X, y: Y) {
        const mY = getRMap(s,t,u,v,w,x,y);
        mY.set(y as object, r);
        checkMapLength(mY, 6, maxPrimitiveCacheLengths);
    }

    return f_;
}


/**
 * Memoize (by reference on the ordered input parameters) the given arity 8
 * function.
 * 
 * * prefer most numerous parameters last in formal parameter list
 */
function memoize8<R,S,T,U,V,W,X,Y,Z>(
        f: F8<R,S,T,U,V,W,X,Y,Z>,
        maxPrimitiveCacheLengths?: number[] | undefined): F8<R,S,T,U,V,W,X,Y,Z> {

	const weakMapS = new WeakMap<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,R>>>>>>>>();
    const mapS = new Map<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,MapMap<object,R>>>>>>>>();
	
    function getRMap(s: S, t: T, u: U, v: V, w: W, x: X, y: Y, z: Z): WeakMap<object,R> {
        const isObjS = (typeof s === "object" || typeof s === 'function') && s !== null;
        const isObjT = (typeof t === "object" || typeof t === 'function') && t !== null;
        const isObjU = (typeof u === "object" || typeof u === 'function') && u !== null;
        const isObjV = (typeof v === "object" || typeof v === 'function') && v !== null;
        const isObjW = (typeof w === "object" || typeof w === 'function') && w !== null;
        const isObjX = (typeof x === "object" || typeof x === 'function') && x !== null;
        const isObjY = (typeof y === "object" || typeof y === 'function') && y !== null;
        const isObjZ = (typeof z === "object" || typeof z === 'function') && z !== null;

        let mS = isObjS ? weakMapS : mapS;

        let mmT = mS.get(s as object);
        if (mmT === undefined) {
            mmT = { weakMap: new WeakMap(), map: new Map() };
            mS.set(s as object, mmT);
            checkMapLength(mS, 0, maxPrimitiveCacheLengths);
        }

        const mT = isObjT ? mmT.weakMap : mmT.map;

        let mmU = mT.get(t as object);
        if (mmU === undefined) {
            mmU = { weakMap: new WeakMap(), map: new Map() };
            mT.set(t as object, mmU);
            checkMapLength(mT, 1, maxPrimitiveCacheLengths);
        }

        const mU = isObjU ? mmU.weakMap : mmU.map;

        let mmV = mU.get(u as object);
        if (mmV === undefined) {
            mmV = { weakMap: new WeakMap(), map: new Map() };
            mU.set(u as object, mmV);
            checkMapLength(mU, 2, maxPrimitiveCacheLengths);
        }

        const mV = isObjV ? mmV.weakMap : mmV.map;

        let mmW = mV.get(v as object);
        if (mmW === undefined) {
            mmW = { weakMap: new WeakMap(), map: new Map() };
            mV.set(v as object, mmW);
            checkMapLength(mV, 3, maxPrimitiveCacheLengths);
        }

        const mW = isObjW ? mmW.weakMap : mmW.map;

        let mmX = mW.get(w as object);
        if (mmX === undefined) {
            mmX = { weakMap: new WeakMap(), map: new Map() };
            mW.set(w as object, mmX);
            checkMapLength(mW, 4, maxPrimitiveCacheLengths);
        }

        const mX = isObjX ? mmX.weakMap : mmX.map;

        let mmY = mX.get(x as object);
        if (mmY === undefined) {
            mmY = { weakMap: new WeakMap(), map: new Map() };
            mX.set(x as object, mmY);
            checkMapLength(mX, 5, maxPrimitiveCacheLengths);
        }

        const mY = isObjY ? mmY.weakMap : mmY.map;

        let mmZ = mY.get(y as object);
        if (mmZ === undefined) {
            mmZ = { weakMap: new WeakMap(), map: new Map() };
            mY.set(y as object, mmZ);
            checkMapLength(mY, 6, maxPrimitiveCacheLengths);
        }

        return isObjZ ? mmZ.weakMap : mmZ.map;
    }

	const f_ = function(s: S, t: T, u: U, v: V, w: W, x: X, y: Y, z: Z): R {
        const mZ = getRMap(s,t,u,v,w,x,y,z);

        let r: R;
        if (!mZ.has(z as object)) {
            r = f(s,t,u,v,w,x,y,z);
            mZ.set(z as object, r);
            checkMapLength(mZ, 7, maxPrimitiveCacheLengths);
        } else {
            r = mZ.get(z as object)!;
        }

        return r;
	}

    f_.mapS = mapS;
    f_.weakMapS = weakMapS;
    f_.clearCache = function() { mapS.clear(); }
    f_.addToCache = function(r: R, s: S, t: T, u: U, v: V, w: W, x: X, y: Y, z: Z) {
        const mZ = getRMap(s,t,u,v,w,x,y,z);
        mZ.set(z as object, r);
        checkMapLength(mZ, 7, maxPrimitiveCacheLengths);
    }

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
function memoize<F extends ((...args: any[]) => R), R>(
        f: F,
        maxPrimitiveCacheLengths?: number[] | undefined,
        logCacheMissHit = false): F & CachePart<R> {

    const len = f.length as 0|1|2|3|4|5|6|7|8;
    if (len > 8) {
        throw new Error('A maximum of 8 formal parameters are supported')
    }

    const memoize_ = memoizeN[len];

    //@ts-ignore
    return memoize_(f, maxPrimitiveCacheLengths, logCacheMissHit) as F & CachePart<R>;
}


export { memoize }
