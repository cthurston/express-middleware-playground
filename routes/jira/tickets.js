var express = require('express');
var router = express.Router();

var mapIssuesOutbound = require('../../api/tickets/mapIssuesOutbound');
var find = require('../../api/tickets/find');
var findOne = require('../../api/tickets/findOne');
var update = require('../../api/tickets/update');

//These are name-spaced routes.  Order matters.
router.route('/').get(find, mapIssuesOutbound);
router.route('/:issueNumber').put(update);
router.route('/update/:issueNumber').get(update);  //Debug
router.route('/:issueNumber').get(findOne, mapIssuesOutbound);


module.exports = router;