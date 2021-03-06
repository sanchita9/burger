var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
// var models = require("../models")

var app = express();

// MySQL connection initialization
var connection = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "",
	database : "burgers_db"
});

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

var port = 3000;
app.listen(process.env.port || port, () => {
    console.log(`*** Listening on port ${port} ***`)
})