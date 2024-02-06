const express = require("express");
const router = express.Router();
const data = require("./api/index");
const root = require("./index/index");

router.use("/api", data);
router.use("/", root);

module.exports = router;
