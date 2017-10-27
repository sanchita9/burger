// Here is where to set up the model for how to interface with the database

var orm = require('../config/orm.js');

var burger = {
	selectAll: function(cb) {
		orm.selectAll('burgers', function(res) {
			cb(res);
		});
	},
	// cols and vals are arrays
	insertOne: function(name, cb) {
		orm.insertOne('burgers', ["burger_name", "devoured"], [name, false], cb);
	},

	updateOne: function(id, cb) {
		var condition = "id=" + id;
		orm.updateOne('burgers', {devoured: true}, condition, cb);
	},
	deleteOne: function(id, cb) {
		var condition = "id=" + id;
		orm.deleteOne('burgers', condition, cb);
		console.log("burgerjs is running");
	}
};

module.exports = burger;