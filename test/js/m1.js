'use strict'

var mocha;
var chai;
var helper;
var Memoize;

if (typeof require === 'undefined') {
	// Browser
} else {
	// Node
	mocha   = require('mocha');
	chai    = require('chai');
	helper  = require('./helpers/helper.js');
	Memoize = require('../../index.js');
}

var { assert, expect } = chai;
var { } = Memoize;

describe('', function() {
	it('should ', 
	function() {

	});
});