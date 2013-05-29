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

exports.getGraphs = function(cb) {
	connection.query('SELECT name FROM apps', function(err, apps, fields) {
		if (err) throw err;
		connection.query('SELECT name FROM platforms', function(err, platforms, fields) {
			if (err) throw err;
			cb(apps, platforms);
		});
	});
}

exports.getGames = function(cb) {
	connection.query('SELECT name FROM apps', function(err, apps, fields) {
		if (err) throw err;
		cb(apps);
	});
}

exports.getPlayersStat = function(cb, game) {
	connection.query('SELECT user, score from users_stat WHERE app = ' + connection.escape(game), function(err, users, fields) {
		if (err) throw err;
		cb(JSON.stringify(users));
	});
}

exports.getAppStat = function(cb, platform, app) {
	var empty = 'Choose';
	var sql_req = 'SELECT * from installations_stat';

	if (platform === -1 && app === -1)
	{
	}
	else if (app === -1)
	{
		sql_req += ' WHERE platform =' + connection.escape(platform);
	}
	else if (platform === -1)
	{
		sql_req += ' WHERE app =' + connection.escape(app);
	}
	connection.query(sql_req, function(err, data, fields) {
		if (err) throw err;
		cb(JSON.stringify(data));
	});
}

//players, apps, installs, plays
exports.getStats = function(cb) {
	connection.query('SELECT count(*) as value from users union all\
		SELECT count(*) from apps union all\
		SELECT count(*) from installations union all\
		SELECT count(*) from log', function(err, r, fields) {
		if (err) throw err;
		cb(	r[0].value,
		   	r[1].value,
			r[2].value,
			r[3].value);
	});
}






