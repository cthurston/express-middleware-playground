var jira = require('../../modules/jira').call;

module.exports = find;

function find(req, res, next) {
	var optional = optional || {};

	var maxResults = 25;
	var page = req.param('page') || 1;
	var startAt = (page - 1) * maxResults;


	var organizations = OrgJira.organizations(req.session.jiraUserInformation);
	var productFields = _.filter(DataService.JiraMap.customFields, function(f) {
		return f.isProduct;
	});
	var userJiraId = req.user.jira_id;

	var jql = TicketJira.jqlFromParams(req.allParams());

	function buildAdminProductJql(next) {
		//If admin:
		//Go get all the FA, JBAIDS, etc products associated with my organizations
		async.map(productFields, function(product, next) {
			ProductJira.getProductsOfOrganizations(organizations, product.id, next);
		}, function(error, results) {
			if (error) {
				return next(error);
			}

			var productJql = buildProductJqlFromProductResults(results);

			next(null, productJql);
		});
	}

	function buildSingleProductJql(next) {
		async.map(productFields, function(product, next) {
			ProductJira.getProductsOfUser(userJiraId, product.id, next);
		}, function(error, results) {
			if (error) {
				return next(error);
			}

			var productJql = buildProductJqlFromProductResults(results);

			next(null, productJql);
		});

	}

	function buildProductJqlFromProductResults(results) {
		//Array of array or products.
		//Build query statements
		var productQuery = {};
		_.each(results, function(products, index) {
			//Get the name for the JQL
			var fieldName = productFields[index].name;
			var productKeys = _.pluck(products, 'objectKey');
			productQuery[fieldName] = '(' + productKeys.join(',') + ')';
		});

		var productJql = TicketJira.jqlForMultipleProducts(productQuery);
		return productJql;
	}

	//Need to get all product associated with user
	async.waterfall([
		function(next) {
			if (organizations.length === 0) { //Just get my tickets (not admin)
				buildSingleProductJql(next);
			} else {
				buildAdminProductJql(next);
			}
		},
		function(productQry, next) {
			//Need to add this user to the product OR statement such that  condition AND ( customerCondition OR (product1Conditions OR product2Conditions))
			var customerJql = TicketJira.jqlForCustomerFromUser(req.session.jiraUserInformation.objectKey);

			if (productQry && productQry.length) {
				customerJql += ' OR ' + productQry;
			}

			jql += ' AND ' + '(' + customerJql + ')';

			setImmediate(next);
		},
		function(next) {

			console.log('Ticket find jql:', jql);

			var body = {
				jql: jql,
				startAt: startAt,
				maxResults: maxResults,
				fields: optional.fields || defaultFields(),
				expand: optional.expand || ['schema', 'names']
			};

			var options = {
				uri: DataService.JiraMap.jiraUri + 'search',
				method: 'POST',
				body: body
			};

			JiraService.request(options, next);
		}
	], pipeJson(res));

	function defaultFields() {
		return _.union(['summary', 'status', 'description'], _.keys(DataService.JiraMap.customFields));
	}
}