var express = require('express');
var router = express.Router();
var mySqlDriver = require('../../server/js/mySqlDriver.js');
var path = require('path');

router.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '../../index.html'));	
});

router.get('/getData', function(req, res){
	mySqlDriver.getSql("testcase", function(rows){
		res.send(rows);
	});
});

router.get('/getUsers', function(req, res){
	mySqlDriver.getSql("users", function(rows){
		res.send(rows);
	})
});

router.get('/getRelease', function(req, res){
	mySqlDriver.getSql("release", function(rows){
		res.send(rows);
	})
});

router.get('/getRequirement', function(req, res){
	mySqlDriver.getSql("requirement", function(rows){
		res.send(rows);
	})
});

router.get('/signin', function(req, res){
	res.send('Hello world !');
});

router.get('/signup', function(req, res){
	res.send('Hello world !');
});

router.get('/changepassword', function(req, res){
	res.send('Hello world !');
});



module.exports = router;