var express = require('express');
var router = express.Router();

// Import the model(burger.js) to use its database functions.
var burger = require('../models/burger.js')

// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {
	res.redirect('/burger');
});

router.get('/burger', function(req, res) {
	burger.selectAll(function(data) {
		
		res.render('index', {burgers: data});
		console.log("Request submitted!");
	});
});

// Create a new burger
router.post('/burger/create', function (req, res) {
	if (!req.body.burger_name) {
		return false;
	}
	burger.insertOne(req.body.burger_name, function(data) {
		res.redirect('/')
	});
});

router.put('/burger/update', function(req, res) {
	// var condition = 'id = ' + req.params.id;
	console.log("I am running");
	// console.log('condition', condition);
	console.log("req.body", req.body.id);
	burger.updateOne(req.body.id, function(data) {
		res.redirect('/');
	});
});

router.delete('/burger/delete', function(req, res) {
	console.log("req.body", req.body.id);
	console.log("controller running")
	burger.deleteOne(req.body.id, function(data) {
		res.redirect('/');
	});
});
module.exports = router;