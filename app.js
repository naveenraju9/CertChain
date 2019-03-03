const express = require('express');
const bodyParser = require('body-parser');
const CertNode = require('./src/CertNode'); 
//const path = require('path');
//const mongoose = require('mongoose');
const port = 18070+Math.floor(Math.random()*30);
console.log('starting node on ', port)
let node1 = new CertNode(port);
node1.init();


const http_port = 3000+Math.floor(Math.random()*10);

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
		console.log('add host: '+nodePort)
		node1.addPeer('localhost', nodePort);
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

