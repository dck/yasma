db = require('../db')
/*
 * GET home page.
 */

exports.index = function(req, res){
    var cb = function(apps) {
        res.render('index', {
            title: req.app.settings.config.title,
            logo: req.app.settings.config.logo,
            description: req.app.settings.config.description,
            apps: apps
        });
    }
    db.getGames(cb);

};

exports.graphs = function(req, res){
    var cb = function(apps, platforms) {
        res.render('graphs', {
            title: req.app.settings.config.title,
            logo: req.app.settings.config.logo,
            description: req.app.settings.config.description,
            apps: apps,
            platforms: platforms
        });
    }
    db.getGraphs(cb);
};

exports.stats = function(req, res){
    var cb = function(players, apps, installs, plays) {
        res.render('stats', {
            title: req.app.settings.config.title,
            logo: req.app.settings.config.logo,
            description: req.app.settings.config.description,
            players_c: players,
            apps_c: apps,
            install_c: installs,
            plays_c: plays,

        });
    }
    db.getStats(cb);
};

exports.getPlayerStats = function(req, res){
    var cb = function(data) {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        });
        res.end(data);
    }
    db.getPlayersStat(cb, req.params.game);
};

exports.getAppStats = function(req, res){
    var cb = function(data) {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        });
        res.end(data);
    }
    db.getAppStat(cb, req.params.platform, req.params.app);
};

exports.getAppPieStats = function(req, res){
    var cb = function(data) {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        });
        res.end(data);
    }
    console.log("sd");
    db.getAppPieStat(cb);
};
