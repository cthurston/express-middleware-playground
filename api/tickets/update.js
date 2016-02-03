var _ = require('lodash');
var pipeData = require('../../services/pipeData');
var jira = require('../../modules/jira').call;

var extractProduct = require('../../modules/insight/extractProduct');

module.exports = update;

function update(req, res, next) {
	var model = {
		fields: req.body,
		update: {}
	};

	_.extend(model.fields, extractProduct(req.body));
	delete model.fields.product;

	_.each(model.fields, function(val, key) {
		if (_.isNull(val) || _.isUndefined(val)) return;  //Have to defend against null because jira will reject update to null.
		model.update[key] = [{
			'set': val
		}];
	});
	delete model.fields;

	var options = {
		path: 'issue/' + req.params.issueNumber,
		method: 'PUT',
		body: model
	};

	jira(options, pipeData(req, next));
}