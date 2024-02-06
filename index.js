// Copyright © 2024 Brian Dennis

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const controllers = require("./controllers/index");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("pub"));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.disable("x-powered-by");

app.get("/favicon.ico", (req, res) => {
	res.end();
});

app.use("/", controllers);

app.all("*", (req, res) => {
	res.status(500).end();
});

app.listen(process.env.PORT || 3000, "0.0.0.0");
