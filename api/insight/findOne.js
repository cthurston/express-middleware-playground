var pipeData = require('../../services/pipeData');
var insight = require('../../modules/insight').call;

module.exports = findOne;

function findOne(req, res, next) {
	var options = {
		path: 'object/' + req.params.objectKey,
		method: 'GET'
	};

	insight(options, pipeData(req, next));
}