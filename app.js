var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var sendData = require('./services/sendData');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var bypassAuth = 1;
if (bypassAuth) {
	var mockAuth = require('./mock/authentication');
	app.use(mockAuth);
}


var routes = require('./routes/index');
var users = require('./routes/users');
var jiraTicket = require('./routes/jira/tickets');
var insightObject = require('./routes/jira/insight/objects');

app.use('/', routes);

app.use('/users', users);
app.use('/users', sendData);

app.use('/ticket', jiraTicket);
app.use('/ticket', sendData);

app.use('/insight', insightObject);
app.use('/insight', sendData);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.send({
			message: err.message,
			status: err.status,
			data: err.data,
			stack: err.stack.split('\n')
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send({
		message: err.message,
		status: err.status,
		data: err.data,
		stack: 'Opps! Our fault.'
	});
});


module.exports = app;
