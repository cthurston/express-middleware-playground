/**
 * Middleware to unwrap objects.
 */
var _ = require('lodash');
var unwrapObject = require('../../modules/insight/unwrapObject');

module.exports = unwrap;

function unwrap(req, res, next) {
	if (!req.data) {
		return next();
	}

	if (_.isArray(req.data)){
		req.data = _.map(req.data, unwrapObject);
		return next();
	}

	req.data = unwrapObject(req.data);
	next();
}