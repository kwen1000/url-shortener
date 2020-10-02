const router = require("express").Router();
const shortenController = require("../controllers/shortenController");

router.get("/:id", shortenController.redirectLink);

module.exports = router;
