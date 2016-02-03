var db = require('../../modules/mongo/connection');
var pipeData = require('../../services/pipeData');

module.exports = find;

function find(req, res, next) {
	var users = db.collection('testing');
	users.find({}).toArray(pipeData(req, next));
}