(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.FloMemoize = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Memoization functions
 */

var Memoize = { m1: m1 };

var SUPPORTED = typeof WeakMap === 'function';

/**
 * Memoize the given function. The function must have an arity of 1.
 */
function m1(f) {
	if (!SUPPORTED) {
		return f;
	}

	var results = new WeakMap();

	return function (param1) {
		var result = results.get(param1);
		if (result !== undefined) {
			//console.log('cache hit');
			return result;
		}
		//console.log('cache miss');

		result = f(param1);
		results.set(param1, result);

		return result;
	};
}

module.exports = Memoize;

},{}]},{},[1])(1)
});