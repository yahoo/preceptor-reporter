// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var expect = require('chai').expect;
var sinon = require('sinon');

describe('TeamCity', function () {

	beforeEach(function () {
		var Class = this.messengers.teamcity;

		this.instance = new Class({output: true});
		this.instance.on('message', function (msg) {
			this.eventList.push(msg);
		}.bind(this));
	});

	it('should', function () {
		process.stdout.write("\n");
		this.instance.testSuiteStarted("test-suite");
		this.instance.testStarted("test-case");
		this.instance.testFinished("test-case", 23);
		this.instance.testFailed("test-case", false, "Division by zero", "You should not do that");
		this.instance.testFailed("test-case", true, "Item does not exist", "Check for being null");
		this.instance.testIgnored("test-case", "DB wasn't there");
		this.instance.testSuiteFinished("test-suite");
	});

	//##teamcity[testSuiteStarted name='test-suite']
	//##teamcity[testStarted name='test-case']
	//##teamcity[testFinished name='test-case' duration='23']
	//##teamcity[testFailed name='test-case' message='Division by zero' details='You should not do that']
	//##teamcity[testFailed name='test-case' message='Item does not exist' details='Check for being null' error='true']
	//##teamcity[testIgnored name='test-case' message='DB wasn|'t there']
	//##teamcity[testSuiteFinished name='test-suite']
	it('implement tests');
});
