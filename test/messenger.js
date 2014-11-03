// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var ReportManager = require('../');
var expect = require('chai').expect;

describe('Messenger', function () {

	beforeEach(function () {
		this.messengers = ReportManager.getMessengers();
		this.eventList = [];
	});

	describe('Jenkins Sauce-Labs', function () {

		beforeEach(function () {
			var Class = this.messengers.JenkinsSauceLabs;

			this.instance = new Class({ output: true });
			this.instance.on('message', function (msg) {
				this.eventList.push(msg);
			}.bind(this));
		});

		it('should trigger a build', function () {
			this.instance.sendBuildInfo('session-1234', 'job-5678');

			expect(this.eventList).to.have.length(1);
			expect(this.eventList[0]).to.be.equal("SauceOnDemandSessionID=session-1234 job-name=job-5678\n")
		});

		it('should output')
	});

	describe('Preceptor', function () {

		beforeEach(function () {
			var Class = this.messengers.Preceptor;

			this.instance = new Class({ output: true });
			this.instance.on('message', function (msg) {
				this.eventList.push(msg);
			}.bind(this));
		});

		it('should', function () {
			this.instance.version();

			this.instance.itemData('123', ["listItem"]);
			this.instance.itemData('123', 23);
			this.instance.itemData('123', "only-string");
			this.instance.itemData('123', { obj: 23 });

			this.instance.itemMessage('123', "This is a test-message.");

			this.instance.suiteStart('123', '0', "Suite-Name");
			this.instance.suiteEnd('123');

			this.instance.testStart('123', '0', "Test-Name");
			this.instance.testFailed('123', "Division by zero", "You should not do that");
			this.instance.testError('123', "Item does not exist", "Check for being null");
			this.instance.testPassed('123');
			this.instance.testUndefined('123');
			this.instance.testSkipped('123', "DB wasn't there");
			this.instance.testIncomplete('123');
		});

		it('implement tests');
	});

	describe('TeamCity', function () {

		beforeEach(function () {
			var Class = this.messengers.TeamCity;

			this.instance = new Class({ output: true });
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

		it('implement tests');
	});
});

//SauceOnDemandSessionID=session-1234 job-name=job-5678
//
//#|# version 1 #|#
//#|# version 1 #|#
//#|# itemData ["123","[\"listItem\"]"] #|#
//#|# itemData ["123","23"] #|#
//#|# itemData ["123","\"only-string\""] #|#
//#|# itemData ["123","{\"obj\":23}"] #|#
//#|# itemMessage ["123","This is a test-message."] #|#
//#|# suiteStart ["123","0","Suite-Name"] #|#
//#|# suiteEnd ["123"] #|#
//#|# testStart ["123","0","Test-Name"] #|#
//#|# testFailed ["123","Division by zero","You should not do that"] #|#
//#|# testError ["123","Item does not exist","Check for being null"] #|#
//#|# testPassed ["123"] #|#
//#|# testUndefined ["123"] #|#
//#|# testSkipped ["123","DB wasn't there"] #|#
//#|# testIncomplete ["123"] #|#
//
//##teamcity[testSuiteStarted name='test-suite']
//##teamcity[testStarted name='test-case']
//##teamcity[testFinished name='test-case' duration='23']
//##teamcity[testFailed name='test-case' message='Division by zero' details='You should not do that']
//##teamcity[testFailed name='test-case' message='Item does not exist' details='Check for being null' error='true']
//##teamcity[testIgnored name='test-case' message='DB wasn|'t there']
//##teamcity[testSuiteFinished name='test-suite']
