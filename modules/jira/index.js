var assert = require('assert');
var request = require('request');
var anError = require('../../services/anError');
var credentials = require('../../config/jira/credentials');
var uri = require('../../config/jira/server').uri;

module.exports = {
	call: call
};

function call(options, callback) {
	assert.notEqual(undefined, options.path);

	options.auth = credentials;
	options.json = true;
	options.uri = options.uri || uri + options.path;

	request(options, function(error, response, body) {
		if (error) {
			callback(error, null);
			return;
		}

		if (response.statusCode === 404) {
			callback(anError('Invalid issue/object number.', 'JIRA_ISSUE_NOT_FOUND', 404, body));
			return;
		}

		if (response.statusCode >= 300) {
			callback(anError('Invalid issue/object number.', 'JIRA_REQUEST_ERROR', response.statusCode, body));
			return;
		}

		if (!body) {
			callback();
			return;
		}

		return callback(null, body);
	});
}