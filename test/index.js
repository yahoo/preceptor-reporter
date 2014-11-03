// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var ReportManager = require('../');
var fs = require('fs');

describe('Manager', function () {

	beforeEach(function () {
		this.manager = new ReportManager();
	});

	describe('Reporter', function () {

		describe('Dot', function () {

			beforeEach(function () {
				this.manager.addReporter('Dot');
			});

			it('should output', function () {
				process.stdout.write("Dot:\n");
				runSequence(this.manager);
			});
		});

		describe('Duration', function () {

			beforeEach(function () {
				this.manager.addReporter('Duration');
			});

			it('should output', function () {
				process.stdout.write("Duration:\n");
				runSequence(this.manager);
			});
		});

		describe('Event', function () {

			beforeEach(function () {
				this.manager.addReporter('Event');
			});

			it('should output', function () {
				process.stdout.write("Event:\n");
				runSequence(this.manager);
			});
		});

		describe('Jenkins Sauce-Labs', function () {

			beforeEach(function () {
				this.manager.addReporter('JenkinsSauceLabs', { configuration: { sessionId:"23", jobName:"24" }});
			});

			it('should output', function () {
				process.stdout.write("Jenkins Sauce-Labs:\n");
				runSequence(this.manager);
			});
		});

		describe('JSON', function () {

			beforeEach(function () {
				this.manager.addReporter('Json', { output: true, path: __dirname + '/data.json' });
			});

			it('should output', function () {
				process.stdout.write("JSON:\n");
				runSequence(this.manager);
			});
		});

		describe('JUnit', function () {

			beforeEach(function () {
				this.manager.addReporter('Junit', { output: true, path: __dirname + '/junit.xml' });
			});

			it('should output', function () {
				process.stdout.write("JUnit:\n");
				runSequence(this.manager);
			});
		});

		describe('Line Summary', function () {

			beforeEach(function () {
				this.manager.addReporter('LineSummary');
			});

			it('should output', function () {
				process.stdout.write("Line Summary:\n");
				runSequence(this.manager);
			});
		});

		describe('List', function () {

			beforeEach(function () {
				this.manager.addReporter('List');
			});

			it('should output', function () {
				process.stdout.write("List:\n");
				runSequence(this.manager);
			});
		});

		describe('Plain', function () {

			beforeEach(function () {
				this.manager.addReporter('Plain', { path: __dirname + '/plain.txt' });
			});

			it('should output', function () {
				process.stdout.write("Plain:\n");
				runSequence(this.manager);
			});
		});

		describe('Preceptor', function () {

			beforeEach(function () {
				this.manager.addReporter('Preceptor');
			});

			it('should output', function () {
				process.stdout.write("Preceptor:\n");
				runSequence(this.manager);
			});
		});

		describe('Spec', function () {

			beforeEach(function () {
				this.manager.addReporter('Spec');
			});

			it('should output', function () {
				process.stdout.write("Spec:\n");
				runSequence(this.manager);
			});
		});

		describe('Summary', function () {

			beforeEach(function () {
				this.manager.addReporter('Summary');
			});

			it('should output', function () {
				process.stdout.write("Summary:\n");
				runSequence(this.manager);
			});
		});

		describe('TAP', function () {

			beforeEach(function () {
				this.manager.addReporter('Tap', { output: true, path: __dirname + '/tap.txt' });
			});

			it('should output', function () {
				process.stdout.write("TAP:\n");
				runSequence(this.manager);
			});
		});

		describe('TeamCity', function () {

			beforeEach(function () {
				this.manager.addReporter('TeamCity');
			});

			it('should output', function () {
				process.stdout.write("TeamCity:\n");
				runSequence(this.manager);
			});
		});

		describe('Mix of multiple Reporter', function () {

			beforeEach(function () {
				this.manager.addReporter('Dot');
				this.manager.addReporter('Spec', { progress: false });
				this.manager.addReporter('List');
				this.manager.addReporter('Summary', { color:false });
				this.manager.addReporter('Duration');
				this.manager.addReporter('LineSummary');
			});

			it('should output', function () {
				process.stdout.write("Mix of multiple Reporter:\n");
				runSequence(this.manager);
			});
		});
	});

	describe('Listener', function () {

		describe('Preceptor', function () {

			beforeEach(function () {
				this.manager.addListener('Preceptor');

				this.manager.addReporter('Spec');
				this.manager.addReporter('Json', { output: true });

				this.manager.message().start();
			});

			it('should output', function () {
				process.stdout.write("Preceptor Listener with JSON output:\n");

				var data = fs.readFileSync(__dirname + '/preceptor-listener.txt'),
					resultOutput = this.manager.parse(data.toString());

				this.manager.message().stop();
				this.manager.message().complete();

				process.stdout.write("Result: " + resultOutput + "\n");
			});
		});

		describe('TeamCity', function () {

			beforeEach(function () {
				this.manager.addListener('TeamCity');

				this.manager.addReporter('Spec');
				this.manager.addReporter('Json', { output: true });

				this.manager.message().start();
			});

			it('should output', function () {
				process.stdout.write("TeamCity Listener with JSON output:\n");

				var data = fs.readFileSync(__dirname + '/teamCity-listener.txt'),
					resultOutput = this.manager.parse(data.toString());

				this.manager.message().stop();
				this.manager.message().complete();

				process.stdout.write("Result: " + resultOutput + "\n");
			});
		});
	});
});

function runSequence (manager) {
	manager.message().start();

	manager.message().suiteStart('1', undefined, "All Tests");

	// Add data to the root
	manager.message().itemData(undefined, '{"test":234, "test2":{"hello":"there"}}');
	manager.message().itemData(undefined, '{"test2":{"what":"is this?"}}');

	manager.message().itemMessage(undefined, "This is a test message for the root");

	(function () {

		manager.message().testStart('5', '1', '1. Test - success');
		manager.message().testPassed('5');

		// Add int to current item
		manager.message().itemData('5', '{"item":23}');
		manager.message().itemMessage('5', "This is a test message for item 5");

		(function () {
			manager.message().testStart('6', '1', '2. Test - skipped');
			manager.message().testSkipped('6', "I guess DB wasn't there");

			manager.message().suiteStart('2', '1', "Sub-Group 1");

			(function () {
				manager.message().testStart('7', '2', '3. Test - success');
				manager.message().testPassed('7');

				manager.message().suiteStart('4', '2', "Sub-Group 1.1");

				(function () {
					manager.message().testStart('8', '4', '4. Test - success');
					manager.message().testPassed('8');

					manager.message().testStart('10', '4', '5. Test - failed');
					manager.message().testFailed('10', "Is not equal to something", "Because it is not equal");

					manager.message().testStart('11', '4', '6. Test - error');
					manager.message().testError('11', "Some kind of exception", "For whatever reason");

					manager.message().testStart('12', '4', '7. Test - undefined');
					manager.message().testUndefined('12');

					manager.message().testStart('13', '4', '8. Test - skipped');
					manager.message().testSkipped('13', "I guess DB wasn't there");

					manager.message().testStart('14', '4', '9. Test - incomplete');
					manager.message().testIncomplete('14');
				}());

				manager.message().suiteEnd('4');
			}());

			manager.message().suiteEnd('2');
		}());

		(function () {
			manager.message().suiteStart('3', '1', "Sub-Group 2");

			(function () {
				manager.message().testStart('9', '3', '10. Test - success');
				manager.message().testPassed('9');

			}());

			manager.message().suiteEnd('3');
		}());

		// Testing if tests after a test-suite work
		manager.message().testStart('15', '1', '11. Test - failed');
		manager.message().testFailed('15', "Is not equal to something", "Because it is not equal");

		manager.message().testStart('16', '1', '12. Test - error');
		manager.message().testError('16', "Some kind of exception", "For whatever reason");

		manager.message().testStart('17', '1', '13. Test - undefined');
		manager.message().testUndefined('17');

		manager.message().testStart('18', '1', '14. Test - skipped');
		manager.message().testSkipped('18', "I guess DB wasn't there");

		manager.message().testStart('19', '1', '15. Test - incomplete');
		manager.message().testIncomplete('19');
	}());

	manager.message().suiteEnd('1');

	manager.message().stop();
	manager.message().complete();
}
