
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', req.app.settings.config)
};