// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var AbstractReporter = require('../abstractReporter');

/**
 * @class DurationReporter
 * @extends AbstractReporter
 * @constructor
 */
var DurationReporter = AbstractReporter.extend(

	{
		/**
		 * Initializes the instance
		 *
		 * @method initialize
		 */
		initialize: function () {
			this.__super();

			if (this.getOptions().progress === undefined) {
				this.getOptions().progress = false;
			}
			if (this.getOptions().output === undefined) {
				this.getOptions().output = true;
			}
		},


		/**
		 * Called when reporting stops
		 *
		 * @method stop
		 */
		stop: function () {

			var time,
				tree;

			this.__super();

			tree = this.getContainer().getTree();

			time = tree.duration;
			if (time < 1000) {
				time += " milliseconds";
			} else if (time < 120000) {
				time = (time / 1000) + " seconds";
			} else {
				time = (Math.floor(time / 1000) / 60) + " minutes";
			}

			this.console(undefined, "stop", "Time: " + time + "\n\n");
		}
	});

module.exports = DurationReporter;
