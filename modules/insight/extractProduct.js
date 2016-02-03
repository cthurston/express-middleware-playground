var _ = require('lodash');
var customFields = require('../../config/jira/customFields');

module.exports = function extractProduct(params) {
	var product = {};

	if (params.product && params.product.objectType) {
		//Get the field to which it will be added
		var fieldKey;

		_.find(customFields, function(val, key) {
			var found = val.id === parseInt(params.product.objectType.id, 10);
			if (found) {
				fieldKey = key;
				return true;
			}
		});

		if (fieldKey) {
			product[fieldKey] = [{key: params.product.objectKey}];
		}

	}

	return product;
};