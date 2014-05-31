// Some basic boilerplate stuff 
var express = require("express");
var http = require('http');
var path = require('path');
var app = express();
var fs = require('fs');
var maleBodySchema = require("./Models/maleBody");
var testSchema = require("./Models/test"); 
var mongoose = require("mongoose");
//var fs = require("fs");


// Change the database name latter    
mongoose.connect("mongodb://summerBodyUser:summerBodyPassword@oceanic.mongohq.com:10000/SummerBody");
var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
	  console.log("Connected!");
	});


app.configure("development", function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure("production", function () {
    app.use(express.errorHandler());
});

app.use(express.static(path.join(__dirname, '/views')));
app.use(express.bodyParser());
app.use(express.json({limit: '100mb'}));

app.get("/", function(req,res){
	res.render('index');
});


// The res.send() will give us plain JSON data. WHich we will use as the call back function now
app.post("/uploadPicture", function(req, res){
	// We need to endcode the picture to base 64
	var maleBodySchemaUpload = new maleBodySchema;
	
	var bitmap = fs.readFileSync(req.files.image.path);
	var base64Image = new Buffer(bitmap).toString('base64');
	
	//console.log(base64Image);

	maleBodySchemaUpload.img = base64Image;
	maleBodySchemaUpload.name = req.files.image.name;
	maleBodySchemaUpload.save(function(err,a){
		if (err) throw err;
		console.error('saved image into mongo');
	});
});

app.get("/getImage", function(req,res){
	maleBodySchema.find({},function(err, result){
		if (!err){
			console.log(result);
			res.send(result);

		}else{
			console.log('error in getting the result');
		}
	});
});



app.listen(3000);
console.log("Express server listening on port %d", app.get('port'));