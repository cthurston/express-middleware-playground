var db = require('../../modules/mongo/connection');

module.exports = create;

function create(req, res, next) {
	var users = db.collection('testing');
	users.insertMany([
		{a: 1}, {a: 2}, {a: 3}
	], function(err, results) {

		req.data = results;
		next(anError('I suck at creating users', 'BIG_TIME_ERROR', 501, results));

	});
}