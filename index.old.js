var mongodb = require("mongodb");
var express = require("express");                                               
var router = express.Router();

router.get("/", function(req, res, next) {
    res.render("index", {title: "Express"});
});

router.get("/new/:url(*)", function(req, res, next) {
    res.send(req.params.url);
});

const app = require('./src/app').app;

var service = "mongodb://localhost:27017/shortener-service";
mongodb.MongoClient.connect(service, function(error, database) {
	if (err)
	    console.log("Server connection error.");
	else {
	    database.collection("links").insert([
]);
	}
});