var user = require('./user');
var session = require('./session');

module.exports = function(req, res, next){
	req.user = user;
	req.session = session;
	next();
};