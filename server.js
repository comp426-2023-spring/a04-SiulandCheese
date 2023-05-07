#!/usr/bin/env node
import express from 'express';
import minimist from 'minimist';
import {rps, rpsls} from "lib/rpsls.js"

var args = minimist(process.argv.slice(2)); // Get arguments 

const app = express(); // Our website app !  

let port; // Find the port, or default to 5000 
if (args.port == null) port = 5000; 
else {port = args.port}

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/app', (res) => {
	res.status(200).send("200 OK");
})

app.get('/app/rps', (res) => {
	res.status(200).send(rps());
})

app.get('/app/rpsls', (res) => {
	res.status(200).send(rpsls());
})

app.get('/app/rps/play', (req, res) => {
	res.status(200).send(rps(req.query.shot));
})

app.get('/app/rpsls/play', (req, res) => {
	res.status(200).send(rpsls(req.query.shot));
})

app.post('/app/rps/play', (req, res) => {
	res.status(200).send(rps(req.body.shot));
})

app.post('/app/rpsls/play', (req, res) => {
	res.status(200).send(rpsls(req.body.shot));
})

app.get('/app/rps/play/:arg', (req, res) => {
	res.status(200).send(rps(req.params.arg));
})

app.get('/app/rpsls/play/:arg', (req, res) => {
	res.status(200).send(rpsls(req.params.arg));
})

app.get('*', (res) => {
	res.status(404).send('404 NOT FOUND');
})

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
})