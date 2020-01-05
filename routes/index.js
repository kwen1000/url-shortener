var mongodb = require('mongodb');
var validurl = require('valid-url');
var shortid = require('shortid');
var express = require('express');
var router = express.Router();
var service = "mongodb://localhost:27017/shortener-service";

function onGet(req, res, next) {
    mongodb.MongoClient.connect(service, (error, database) => {
        if (error) {
	    console.log(error);
	    return;
        }
        var link = { url: req.params.url, short: "test" };
        database.collection("links").insert([link]);
	res.send(req.params.url);
    });
}

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get("/new/:url(*)", onGet);

module.exports = router;