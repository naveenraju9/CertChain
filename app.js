const express = require('express');
const bodyParser = require('body-parser');
const CertNode = require('./src/CertNode'); 
const path = require('path');
const port = 18070+Math.floor(Math.random()*30);
console.log('starting node on ', port)
let node1 = new CertNode(port);

node1.init();

const http_port = 3000+Math.floor(Math.random()*10);

let BrewHTTP = function (){
	const app = new express();
	app.use(express.static( './public'));
	app.use(bodyParser.json());
	app.set('view engine', 'ejs');
	app.get('/', function(req, res) {
		res.render('index');
	});
	app.get('/addNode', function(req, res) {
		res.render('addNode');
	});
	app.get('/addData', function(req, res) {
		res.render('addData');
	});
	app.get('/getChain', function (req, res) {
		
	})
	app.get('/addNode/:port', (req, res)=>{
		console.log('add host: '+req.params.port)
		node1.addPeer('localhost', req.params.port)

		res.send();
	})

	app.get('/addData/:teammember', (req, res)=>{
		let newBlock = node1.createBlock(req.params.teammember);
		console.log('block created');
		res.send();
	})

	
	app.listen(http_port, () => {
		console.log(`http server up.. ${http_port}`);
	})
}

let httpserver = new BrewHTTP();

