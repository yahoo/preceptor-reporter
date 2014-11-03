// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

// Runs with

var ReportManager = require('../../');

var manager = new ReportManager();

manager.addReporter('Spec');
manager.addReporter('Json', { output: true });

manager.message().start();

var hook = manager.loadHook('cucumber', undefined, function () {
	manager.message().stop();
	manager.message().complete();
});

module.exports = hook;
