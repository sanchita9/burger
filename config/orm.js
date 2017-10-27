// Import MySQL connection.
var connection = require("./connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

function objToSql(ob) {
	// column1=value, column2=value,...
	var arr = [];

	for (var key in ob) {
		arr.push(key + '=' +ob[key]);
	}

	return arr.toString();
}

var orm = {
	selectAll: function(tableInput, cb) {
		var queryString = 'SELECT * FROM ' + tableInput + ';';
		connection.query(queryString, function(err, result) {
			if (err) throw err;
			cb(result);
		});
	},
	// val in an array of values that we want to save to cols
	// cols are the colums we want to insert the values
	insertOne: function(table, cols, vals, cb) {
		var queryString = 'INSERT INTO ' + table;

		queryString = queryString + '(';
		queryString = queryString + cols.toString();
		queryString = queryString + ') ';
		queryString = queryString + 'VALUES (';
		queryString = queryString + printQuestionMarks(vals.length)
		queryString = queryString + ') ';

		connection.query(queryString, vals, function(err, result) {
			if (err) throw err;
			cb(result);
		});
	},
	// objColVals would be the columns and values that you want to update
	// an example of objColvals would be {burger name: devour: true}
	updateOne: function(table, objColVals, condition, cb) {
		var queryString = 'UPDATE ' + table;

		queryString = queryString + ' SET ';
		queryString = queryString + objToSql(objColVals);
		queryString = queryString + ' WHERE ';
		queryString = queryString + condition;

		console.log(queryString);
		connection.query(queryString, function(err, result) {
			if (err) throw err;
			cb(result);
		});
	},

	deleteOne: function(table, condition, cb) {
		var queryString = 'DELETE FROM ' + table;

		queryString = queryString + ' WHERE ';
		queryString = queryString + condition;
		console.log("orm is running");
		console.log(queryString);
		connection.query(queryString, function(err, result) {
			if (err) throw err;
			cb(result);
		});
	}
};

module.exports = orm;