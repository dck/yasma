
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', req.app.settings.config);
};

exports.graphs = function(req, res){
  res.render('graphs', req.app.settings.config);
};

exports.stats = function(req, res){
  res.render('stats', req.app.settings.config);
};