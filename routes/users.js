var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Register
router.get('/register', function(req, res){
	res.render('register');
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});

// Register user
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	
	
	// Validation
	req.checkBody('name', 'Emri eshte i nevojshem').notEmpty();
	req.checkBody('email', 'Email eshte i nevojshem').notEmpty();
	req.checkBody('email', 'Emri nuk eshte i vlefshem').isEmail();
	req.checkBody('username', 'Emri i përdoruesit eshte i nevojshem').notEmpty();
	req.checkBody('password', 'Fjalëkalim eshte i nevojshem').notEmpty();
	req.checkBody('password2', 'Fjalëkalim eshte i nevojshem').equals(req.body.password);
	
	
	
	var errors = req.validationErrors();
	
	if(errors)
	{
		res.render('register',
		{
			errors:errors
		});
	} else
	{
		var newUser = new User
		({
			name: name,
			email: email,
			username: username,
			password: password
		});
		
		User.createUser(newUser, function (err, user) 
		{
			if(err) throw err;
			console.log(user);		
		});
		
		req.flash('success_msg', 'Tani jeni regjistruar dhe mund te hyni');
		
		res.redirect('/users/login');
	}
});



passport.use(new LocalStrategy(
  function(username, password, done) 
		{
   	User.getUserByUsername(username, function (err, user) {
			if(err) throw err;
			if(!user)
		{
			return done(null, false, {message: 'Perdorues i pavlefshem'});
		}
		
		User.comparePassword(password, user.password, function (err, isMatch) {
			if(err) throw err;
			if(isMatch)
			{
				return done(null, user);
			} else
			{
				return done(null, false, {message: 'Fjalkalimi i pavlefshem'});
			}
			
		});
	});
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
  	res.redirect('/');
  });

router.get('/logout', function (req, res) {
	req.logout();
	
	req.flash('success_msg', 'Jeni Shkyç');
	
	res.redirect('/users/login');
});

module.exports = router;