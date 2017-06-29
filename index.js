var express = require('express');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var User = require(__dirname + '/public/js/user.js');


// var router = express.Router();
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

port = 8080;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use(function(req, res, next){
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

var sessionChecker = function(req, res, next){
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/home');
    } else {
        next();
    }
};

app.get('/', sessionChecker, function(req, res){
    res.redirect('/login');
});

app.get('/signup', sessionChecker, function(req, res){
    res.render('pages/signup');
});

app.post('/signup', function(req, res){
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then( function(user){
        req.session.user = user.dataValues;
        res.redirect('/home');
    })
    .catch( function(error){
        res.redirect('/signup');
    });
});

app.get('/login', sessionChecker, function(req, res){
    res.render('pages/login');
});

app.post('/login', function(req, res){
    var username = req.body.username,
        password = req.body.password;

    User.findOne({ where: { username: username } }).then(function (user) {
        if (!user) {
            res.redirect('/login');
        } else if (!user.validPassword(password)) {
            res.redirect('/login');
        } else {
            req.session.user = user.dataValues;
            res.redirect('/home');
        }
    });
});

app.get('/home', function(req, res){
    if (req.session.user && req.cookies.user_sid) {
		res.render('pages/home')
    } else {
        res.redirect('/login');
    }
});

app.get('/about', function(req, res){
    if (req.session.user && req.cookies.user_sid) {
		res.render('pages/about')
    } else {
        res.redirect('/login');
    }
});

app.get('/contact', function(req, res){
    if (req.session.user && req.cookies.user_sid) {
        res.render('pages/contact')
    } else {
        res.redirect('/login');
    }
});

app.get('/services', function(req, res){
    if (req.session.user && req.cookies.user_sid) {
        res.render('pages/services')
    } else {
        res.redirect('/login');
    }
});

app.get('/cultural', function(req, res){
    if (req.session.user && req.cookies.user_sid) {
        res.render('pages/cultural')
    } else {
        res.redirect('/login');
    }
});

app.get('/technical', function(req, res){
    if (req.session.user && req.cookies.user_sid) {
        res.render('pages/technical')
    } else {
        res.redirect('/login');
    }
});

app.get('/sports', function(req, res){
    if (req.session.user && req.cookies.user_sid) {
        res.render('pages/sports')
    } else {
        res.redirect('/login');
    }
});

app.get('/all_events', function(req, res){
    if (req.session.user && req.cookies.user_sid) {
        res.render('pages/all_events')
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', function(req, res){
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

app.get('*', function(req, res){
  	res.render('pages/404');
});


app.listen(port, function(){
	console.log('Listening to port ' + port + ' ...');
});
