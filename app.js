var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var supermarketRouter = require('./routes/supermarket');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//登录拦截器
app.all('/*', function (req, res, next) {
    var nodeUser =req.cookies.nodeUser;
    var url = req.url.split('?')[0];
    if(nodeUser&&nodeUser.name&&nodeUser.password){
        if(url == '/'|| url == '/users/Login'){
            res.render('index');
        }else {
            next();
        }
    }else{
        if(url == '/' ){
            res.render('login');
        }else if(url == '/users/Login'){
            next();
        }
    }



});


app.use('/users', usersRouter);
app.use('/', supermarketRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.render('404');
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.locals.status =err.status || 500;
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
