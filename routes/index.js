var mongodb = require('mongodb');
var router = require("express").Router();
var service = "mongodb://localhost:27017/url-shortener";

function validURL(url) {
    var reg = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    var result = reg.test(url);
    return result;
}

function generateURL(url) {
    // This method currently only returns the milliseconds from Unix time
    return new Date().getTime();
}

function onGet(req, res, next) {
    mongodb.MongoClient.connect(service, (error, database) => {
        if (error) {
	    res.json({ "error": "Database error." });
	    console.log(error);
	    try {
		database.close();
	    }
	    catch {}
	    return;
        }
	if (!validURL(req.params.url)) {
	    res.json({ "error": "Invalid URL." });
	    console.log("Invalid URL.");
	    database.close();
	    return;
	}
	var generated = generateURL(req.params.url);
        database.collection("links").insert(
	    [{ "URL": req.params.url, "shorten": generated }]
        );
	res.json(
	    { "URL": req.params.url, "shorten": "localhost:3000/" + generated }
	);
	database.close();
    });
}

router.get('/', function(req, res, next) {
    res.render('index', { title: "Express" });
});

router.get("/new/:url(*)", onGet);

module.exports = router;