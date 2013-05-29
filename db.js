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
	var sql_req1 = 'SELECT app, platform, date, count(*) AS count from installations_stat';
	var sql_req2 = 'SELECT app, platform, date, count(*) AS count from launches_stat';

	if (platform == -1 && app == -1)
	{
	}
	else if (app == -1)
	{
		sql_req1 += ' WHERE platform =' + connection.escape(platform);
		sql_req2 += ' WHERE platform =' + connection.escape(platform);
	}
	else if (platform == -1)
	{
		sql_req1 += ' WHERE app =' + connection.escape(app);
		sql_req2 += ' WHERE app =' + connection.escape(app);
	}
	else
	{
		sql_req1 += ' WHERE app =' + connection.escape(app) + ' and platform=' + connection.escape(platform);
		sql_req2 += ' WHERE app =' + connection.escape(app) + ' and platform=' + connection.escape(platform);
	}
	sql_req1 += ' GROUP BY date';
	sql_req2 += ' GROUP BY date';
	connection.query(sql_req1, function(err, installs, fields) {
		if (err) throw err;
		connection.query(sql_req1, function(err, launches, fields) {
			if (err) throw err;
			cb(JSON.stringify(installs),JSON.stringify(launches));
		});
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






