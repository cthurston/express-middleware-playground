var pipeData = require('../../services/pipeData');
var jira = require('../../modules/jira').call;

module.exports = findOne;

function findOne(req, res, next) {
	var options = {
		path: 'issue/' + req.params.issueNumber,
		method: 'GET'
	};

	jira(options, pipeData(req, next));
}