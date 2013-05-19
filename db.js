var mysql = require('mysql');


var connection;

exports.connect = function(conf) {
	connection = mysql.createConnection(conf);
	connection.connect(function(err){
	  if(!err) {
        console.log("Connected to the database.");
	  }
	  else {
	        throw err;
	  }
	})
}


exports.end = function() {
	connection.end(function(err) {
		if(!err) {
			console.log("Mysql connection is terminated.")
		}
		else {
			throw err;
		}
	})
}

exports.getUsers = function(cb) {
	connection.query('SELECT user_id as id, name FROM users', function(err, rows, fields) {
		if (err) throw err;
		cb(rows);
	});
}

