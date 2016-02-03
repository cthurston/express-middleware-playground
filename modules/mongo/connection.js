var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/testing';
var connection = {};
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected to the mongo database.");

	connection.db = db;
});

module.exports = {
	db: function(){
		assert.notEqual(undefined, connection.db);
		return connection.db;
	},
	collection: function(c){
		assert.notEqual(undefined, connection.db);
		return connection.db.collection(c);
	}
};