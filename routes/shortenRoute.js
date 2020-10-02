const router = require("express").Router();
const shortenController = require("../controllers/shortenController");

router.route("/shorten").post(shortenController.generateLink);
router.route("/info/:id").get(shortenController.getLinkInfo);

module.exports = router;
