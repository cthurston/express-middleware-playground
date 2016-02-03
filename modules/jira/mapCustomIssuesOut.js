var _ = require('lodash');
var customFields = require('../../config/jira/customFields');

module.exports = {
	mapIssues: mapIssuesOutbound
};

function mapIssuesOutbound(obj) {
	//Mutates original object!!
	if (_.isArray(obj.issues)) {
		_.each(obj.issues, function(issue) {
			issue.fields = mapCustomFieldsOutbound(issue.fields);
		});
	} else {
		obj.fields = mapCustomFieldsOutbound(obj.fields);
	}

	return obj;
}

function mapCustomFieldsOutbound(fields) {
	var mappedFields = {};
	_.each(fields, function(value, name) {
		if (customFields[name]) {
			var obj = _.clone(customFields[name]);
			obj.value = value;
			mappedFields[obj.key] = obj;
		} else {
			mappedFields[name] = value;
		}
	});
	return mappedFields;
}

