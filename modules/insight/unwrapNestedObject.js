var _ = require('lodash');

var config = require('../../config/jira/unwrap');

module.exports = function(nestedInsightObject) {
	if (!isValidInsightObject(nestedInsightObject)) {
		return null;
	}

	var nestedObjects = _.map(nestedInsightObject.objectAttributeValues, extractObject, null);

	if (isArrayOfObjects(nestedInsightObject)) {
		return nestedObjects;
	} else {
		return nestedObjects[0];
	}

};

function extractObject(insightValue) {
	var ref = insightValue.referencedObject;
	var obj = {
		id: ref.id,
		name: ref.name,
		objectKey: ref.objectKey,
		avatar: {},
		objectType: {
			name: ref.objectType.name
		}
	};

	obj.avatar[config.imageSize] = ref.avatar[config.imageSize];
	return obj;
}

function isValidInsightObject(insightObject) {
	if (insightObject.objectTypeAttribute &&
			insightObject.objectTypeAttribute.referenceObjectType) {
		return true;
	}
}

function isArrayOfObjects(insightObject) {
	if (insightObject.objectTypeAttribute.maximumCardinality === 1) {
		return false;
	}
	return true;
}