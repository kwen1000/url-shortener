var mongodb = require('mongodb');
var router = require("express").Router();
var service = "mongodb://localhost:27017/url-shortener";

function validURL(url) {
    var reg = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return reg.test(url);
}

function onGet(req, res, next) {
    mongodb.MongoClient.connect(service, (error, database) => {
        if (error) {
	    console.log(error);
	    try {
		database.close();
	    }
	    catch {}
	    return;
        }
	if (!validURL(req.params.url)) {
	    console.log("Invalid URL.");
	    database.close();
	    return;
	}
        database.collection("stuff").insert(
	    [{URL: req.params.url, blah: "abc"}]
        );
	res.send(req.params.url);
	database.close();
    });
}

router.get('/', function(req, res, next) {
    res.render('index', { title: "Express" });
});

router.get("/new/:url(*)", onGet);

module.exports = router;