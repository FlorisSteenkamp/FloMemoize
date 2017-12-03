
const SUPPORTED = typeof WeakMap === 'function';


/**
 * Memoize the given arity 1 function.
 */
function m1<T extends Object, U>(f: (a: T) => U): (a: T) => U {
	if (!SUPPORTED) { return f; }
	
	let results = new WeakMap<T,U>();
	
	return function(a: T): U {
		let result = results.get(a);
		if (result !== undefined) {
			//console.log('cache hit');
			return result; 
		}
		//console.log('cache miss');
		
		result = f(a);
		results.set(a, result);
		
		return result;
	}
} 


let Memoize = {	m1, };


export default Memoize;
