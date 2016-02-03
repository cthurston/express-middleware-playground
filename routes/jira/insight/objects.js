var express = require('express');
var router = express.Router();

var unwrap = require('../../../api/insight/unwrap');
var findOne = require('../../../api/insight/findOne');
var update = require('../../../api/insight/update');

//These are name-spaced routes.  Order matters.
router.route('/:objectKey').get(findOne, unwrap);

router.route('/:objectKey').put(findOne, update);
router.route('/update/:objectKey').get(findOne, update);  //Debug


module.exports = router;