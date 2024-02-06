const express = require("express");
const router = express.Router();
const fs = require("fs");

const dataSets = [], pinSets = [], pinTable = [];

dataSets.push(JSON.parse(fs.readFileSync(`${__dirname}/data/data_adults.json`)));
dataSets.push(JSON.parse(fs.readFileSync(`${__dirname}/data/data_teens.json`)));
dataSets.push(JSON.parse(fs.readFileSync(`${__dirname}/data/data_kids.json`)));

pinSets.push(JSON.parse(fs.readFileSync(`${__dirname}/data/pins_parks.json`)));
pinSets.push(JSON.parse(fs.readFileSync(`${__dirname}/data/pins_monuments.json`)));
pinSets.push(JSON.parse(fs.readFileSync(`${__dirname}/data/pins_historics.json`)));

pinSets.forEach(pins => {
	pinTable.push(pins);
})

const allPins = pinTable.flat();

router.get("/appconfig", (req, res) => {
	const response = JSON.parse(fs.readFileSync(`${__dirname}/data/gui.json`).toString());
	res.json(response).end();
});

router.get("/datasets/:id", (req, res) => {
	const id = parseInt(req.params.id);
	res.json(id >=0 && id < dataSets.length ? dataSets[id] : null);
});

router.get("/pinsets/:id", (req, res) => {
	const id = parseInt(req.params.id);
	res.json(id >=0 && id < pinSets.length ? pinSets[id] : null);
});

router.get("/pins/:id", (req, res) => {
	const selected = allPins.filter(pin => pin.id === req.params.id);
	res.json(selected.length ? selected[0] : null).end();
});

module.exports = router;
