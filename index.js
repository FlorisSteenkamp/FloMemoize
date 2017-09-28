'use strict'

/**
 * Memoization functions
 */
let Memoize = {	m1, };

const SUPPORTED = typeof WeakMap === 'function';


/**
 * Memoize the given function. The function must have an arity of 1.
 */
function m1(f) {
	if (!SUPPORTED) { return f; }
	
	let results = new WeakMap();
	
	return function(param1) {
		let result = results.get(param1);
		if (result !== undefined) {
			//console.log('cache hit');
			return result; 
		}
		//console.log('cache miss');
		
		result = f(param1);
		results.set(param1, result);
		
		return result;
	}
} 


module.exports = Memoize;
