var db = require('../../modules/mongo/connection');
var pipeData = require('../../services/pipeData');


module.exports = findOne;


function findOne(req, res, next) {

	req.data = {
		body: req.body,
		params: req.params,
		query: req.query,
		user: req.user
	};

	next();
}