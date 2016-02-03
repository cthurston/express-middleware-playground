var express = require('express');
var router = express.Router();

var find = require('../api/users/find');
var findOne = require('../api/users/findOne');
var create = require('../api/users/create');

//These are name-spaced routes under user:
//Order matters.
router.route('/').get(find);
router.route('/makesome').get(create);
router.route('/:userId').get(findOne);

module.exports = router;