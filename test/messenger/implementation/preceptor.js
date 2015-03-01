// Copyright 2014-2015, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var expect = require('chai').expect;
var sinon = require('sinon');

describe('Preceptor', function () {

	beforeEach(function () {
		var Class = this.messengers.preceptor;

		this.instance = new Class({output: true});
		this.instance.on('message', function (msg) {
			this.eventList.push(msg);
		}.bind(this));
	});

	it('should', function () {
		this.instance.version();

		this.instance.itemData('123', ["listItem"]);
		this.instance.itemData('123', 23);
		this.instance.itemData('123', "only-string");
		this.instance.itemData('123', {obj: 23});

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
	it('implement tests');
});
