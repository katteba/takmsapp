
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public'), compress: true }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(function(req) {
  app.locals.url = 'http://' + req.headers.host + req.url;
});

app.get('/', function(req, res) {
  res.render('index', { word: 'タケウチアキマサ' });
});

app.get('/:word', function(req, res) {
  var word = req.params.word;

  if (!word.length || word.length > 20) {
    return res.location('/');
  }

  res.render('index', { word: req.params.word });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
