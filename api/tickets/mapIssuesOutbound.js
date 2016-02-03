var mapIssuesOutbound = require('../../modules/jira/mapCustomIssuesOut').mapIssues;

module.exports = findOne;

function findOne(req, res, next) {
	if(!req.data || !req.data.issues){
		return next();
	}

	req.data = mapIssuesOutbound(req.data);
	next();
}