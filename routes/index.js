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
    return "" + new Date().getTime();
}

function onGet(req, res, next) {
    mongodb.MongoClient.connect(service, (error, database) => {
	// Error handling
        if (error) {
	    res.json({ "error": "Database error." });
	    console.log(error);
	    try {
		database.close();
	    }
	    catch {}
	    return;
        }
	// Invalid URL entered
	if (!validURL(req.params.link)) {
	    res.json({ "error": "Invalid URL." });
	    console.log("Invalid URL.");
	    database.close();
	    return;
	}
	// Generate shortened URL
	var generated = generateURL(req.params.link);
	// Add to database:
        database.collection("links").insert(
	    [{ "link": req.params.link, "shorten": generated }]
        );
	// Output JSON
	res.json(
            { "link": req.params.link, "shorten": generated }
	);
	database.close();
    });
}

function onRedirect(req, res, next) {
    mongodb.MongoClient.connect(service, (error, database) => {
	// Error handling
        if (error) {
	    res.json({ "error": "Database error." });
	    console.log(error);
	    try {
		database.close();
	    }
	    catch {}
	    return;
        }
	database.collection("links").findOne(
	    { "shorten": req.params.shorten }, { "_id": 0, "link": 1 }
	).then(result => {
	    console.log(result);
	    if (result == null) {
	        res.json({ "error": "Link not found." });
      	        console.error("Can't find link.");
	        return;
	    }
	    res.redirect(result.link);
	}).catch(error => {
            res.json({ "error": "Search error." });
            console.error("Search error.");
	});
	database.close();
    });
}

function expressGet(req, res, next) {
    res.render('index', { title: "Express" });    
}

// Homepage
router.get('/', expressGet);
// Link generator endpoint
router.get("/shrink/:link(*)", onGet);
// Go to link
router.get("/:shorten", onRedirect);

module.exports = router;