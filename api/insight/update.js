var _ = require('lodash');
var anError = require('../../services/anError');
var pipeData = require('../../services/pipeData');
var insight = require('../../modules/insight').call;

var extractProduct = require('../../modules/insight/extractProduct');

module.exports = update;


function update(req, res, next) {
	if(!req.data || !req.data.objectType || !req.data.objectType.id){
		return next(anError('The object was not properly loaded.', 'NO_REQ_DATA_OBJECT', 500));
	}


	var attrLookup = DataService.JiraMap.Products[product.objectType.id];
	var attrs = DataService.attributesForUpdate(data, attrLookup);

	console.log('attrs ', attrs);

	JiraService.put(insight() + "object/" + product.id, attrs, next);

}