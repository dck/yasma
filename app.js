
/**
 * Module dependencies.
 */

var express = require('express')
  , db = require('./db')
  , routes = require('./routes')
  , config = require('./config');


var app = module.exports = express.createServer();

db.connect(config.db);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.set('config', config);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/graphs', routes.graphs);
app.get('/stats', routes.stats);
app.get('/playerstats/:game', routes.getstats);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

//db.end();
