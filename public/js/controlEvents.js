var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended : false});

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://test:test@ds032340.mlab.com:32340/event_manager_app_data');

// var eventSchema = new mongoose.Schema(
// {
// 	name: String
// 	description: String
// 	price: int
// 	location: String
// 	time: Date

// }  );

// var eventData = mongoose.model('eventData', eventSchema);

module.exports = function(app){
	app.get('/', function(req, res){
		res.render('pages/index')
	});

	// app.get('/contact_result', function(req, res){
	// 	res.render('contact_result');
	// });	
	
	// app.get('events/:name', function(req, res){
	// 	res.render('selected_item', name);
	// });

	app.get('*', function(req, res){
	  	res.render('pages/404');
	});

};