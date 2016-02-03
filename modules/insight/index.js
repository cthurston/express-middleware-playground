var jiraCall = require('../jira').call;
var uri = require('../../config/jira/server').insightUri;

module.exports = {
	call: callInsight
};

function callInsight(options, callback) {
	options.uri = options.uri || (uri + options.path);
	jiraCall(options, callback);
}
