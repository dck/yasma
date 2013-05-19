db = require('../db')
/*
 * GET home page.
 */

exports.index = function(req, res){
    var cb = function(apps, users) {
        res.render('index', {
            title: req.app.settings.config.title,
            logo: req.app.settings.config.logo,
            description: req.app.settings.config.description,
            users: users,
            apps: apps
        });
    }
    db.getUsers(cb);

};

exports.graphs = function(req, res){
  res.render('graphs', req.app.settings.config);
};

exports.stats = function(req, res){
  res.render('stats', req.app.settings.config);
};