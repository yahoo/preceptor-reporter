// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var AbstractLoader = require('../abstractLoader');
var fs = require('fs');
var Promise = require('promise');
var _ = require('underscore');

/**
 * @class IstanbulLoader
 * @extends AbstractLoader
 * @constructor
 */
var IstanbulLoader = AbstractLoader.extend(

	{
		/**
		 * Processes a single file
		 *
		 * @method _processFile
		 * @param {string} parentId
		 * @param {string} file
		 * @return {Promise}
		 * @private
		 */
		_processFile: function (parentId, file) {

			return new Promise(function (resolve, reject) {

				fs.readFile(file, function (err, data) {

					var cov;

					if (err) {
						reject(err);

					} else {
						cov = data.toString('utf8');
						this.coverage(cov);
						resolve(cov);
					}

				}.bind(this));
			}.bind(this));
		}
	});

module.exports = IstanbulLoader;
