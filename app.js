const express = require('express');
const bodyParser = require('body-parser');
const CertNode = require('./src/CertNode'); 
const path = require('path');
const mongoose = require('mongoose');

//const port = 18070+Math.floor(Math.random()*30);
const port = 18070;
console.log('starting node on ', port)
let node1 = new CertNode(port);
node1.init();
//connecting to mongodb database
/*mongoose.connect('mongodb://localhost/certchain', {useNewUrlParser: true})
				.then(()=> console.log("MongoDB connected"))
				.catch(err => console.log(err));
*/
//const http_port = 3000+Math.floor(Math.random()*10);
const http_port = 300;
let BrewHTTP = function (){
	const app = new express();
	app.use(express.static( './public'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({  
		extended: true
	  })); 
	app.set('view engine', 'ejs');
	app.get('/', function(req, res) {
		res.render('index');
	});
	app.get('/addNode', function(req, res) {
		res.render('addNode');
	});
	app.post('/addNode', (req, res)=>{
		var nodePort = req.body.port;
		var nodeHost = req.body.host;
		console.log('added host '+nodeHost+":"+nodePort);
		node1.addPeer(nodeHost, nodePort);
		res.render('successNode');
	});
	app.get('/addData', function(req, res) {
		res.render('addData');
	});
	app.post('/addData', function(req, res) {
		let newBlock = node1.createBlock(req.body);
		console.log('block created');
		res.render('successData');
	});

	app.get('/explore', function (req, res) {
		res.render('explore');
	});
	app.post('/explore', function (req, res) {
		//Implementing search functionality
	});
	
	app.listen(http_port, () => {

		console.log(`http server up.. ${http_port}`);

	})
}

let httpserver = new BrewHTTP();

