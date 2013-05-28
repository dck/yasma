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

exports.getGames = function(cb) {
	connection.query('SELECT name FROM apps', function(err, apps, fields) {
		if (err) throw err;
		cb(apps);
	});
}

exports.getPlayersStat = function(cb) {
//	connection.query('SELECT name FROM apps', function(err, apps, fields) {
//		if (err) throw err;/
		cb("fdfdfapps");
//	});
}



