const express = require("express");
const utils = require("../utils");
const router = express.Router();

router.get("/", (req, res) => {
	utils.content("index", "index", {}, res);
});

module.exports = router;
