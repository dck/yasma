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
  res.render('graphs', req.app.settings.config);
};

exports.stats = function(req, res){
  res.render('stats', req.app.settings.config);
};

exports.getstats = function(req, res){
    var cb = function(data) {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        });
        res.end(data);
    }
    db.getPlayersStat(cb, req.params.game);
};