/*global document, window, */
/*global L, ko, axios, */
/*global hideWidget, showWidget, setLegend, showSidebar, hideSidebar, toggleFilters, toggleLegend, onClearAll */

function App() {
	var self = this;

	self.onLoaded = function () {
		const usa = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution: "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
		});

		self.geo.dataset = L.layerGroup();
		self.geo.pins = L.layerGroup();

		self.geo.base = L.map("map", {
			center: [39.8282, -98.5795], // center of US-ish
			zoom: 4,
			layers: [usa, self.geo.dataset, self.geo.pins], // establish our stacked map layers
		});

		const baseLayers = { OpenStreetMap: usa };

		const layerControl = L.control.layers(baseLayers).addTo(self.geo.base);

		layerControl.addBaseLayer(baseLayers["OpenStreetMap"], "OpenTopoMap");

		self.getAppConfig();

		self.setHotKeys();
	};

	self.getColor = function (pi) {
		return self.config().rgb[self.appState.dataset][pi];
	};

	self.style = function (feature) {
		const bandID = Math.ceil(Math.random() * 9) % 9;

		return {
			fillColor: self.getColor(bandID),
			weight: 2,
			opacity: 1,
			color: "white",
			dashArray: "3",
			fillOpacity: 0.7,
		};
	};

	self.getAppData = async function (endpoint) {
		const uri = `/api${endpoint}`;
		// eslint-disable-next-line no-undef
		return new Promise((resolve) => {
			axios.get(uri).then((response) => {
				resolve(response.data);
			});
		});
	};

	self.getAppConfig = function () {
		self.getAppData("/appconfig").then((config) => {
			self.config(config);
		});
	};

	self.addPinsToMap = function (pins) {
		const tempLayer = L.layerGroup();

		pins.forEach((pin) => {
			const mk = L.marker([pin.a, pin.o], { customData: { id:pin.id } }).addTo(tempLayer);
			mk.on("click", (e) => self.onPin(e)); // for sidebar triggering
		});

		tempLayer.addTo(self.geo.pins);
	};

	self.onDatasetSelected = function (koObj) {
		const dsNum = self.config().datasets.indexOf(koObj);

		if (dsNum > -1 && dsNum != app.appState.dataset) { // Render only if new dataset
			self.appState.legend.title(koObj.legend);
			self.getDataset(dsNum);
			app.appState.dataset = dsNum;
		}

		return true;
	};

	self.onPinsEvent = function (koObj) {
		const psNum = self.config().pinsets.map(c => c.filter).indexOf(koObj.filter);

		self.geo.pins.clearLayers();

		self.getAppData(`/pinsets/${psNum}`).then((pins) => {
			if (pins) {
				self.addPinsToMap(pins);
			}
		})

		return true;
	};

	self.getDataset = function (datasetId) {

		self.geo.dataset.clearLayers();

		self.getAppData(`/datasets/${datasetId}`).then((dataset) => {

			if (dataset) {

				hideWidget("#widget-legend");
				L.geoJson(dataset, { style: self.style }).addTo(self.geo.dataset);
				setLegend(self.appState.legend.title(), self.config().segmented[datasetId], self.config().rgb[datasetId]);
				showWidget("#widget-legend");

			}

		})

	};

	self.onPin = function (e) {

		try {
			const id = e.target.options.customData.id;

			self.appState.pinned = id;

			self.getAppData(`/pins/${id}`).then((details) => {

				if (details) {
					self.appState.details(details);
					showSidebar();
				}
			});
		} catch (err) {
			/* */
		}
	};

	self.onClearAll = function() {

		self.geo.dataset.clearLayers();
		self.geo.pins.clearLayers();

		onClearAll();

		self.appState.dataset = -1;

	};

	self.setHotKeys = function () {
		document.addEventListener("keydown", function (event) {
			switch (event.key.toLowerCase()) {
				case "escape":
					hideSidebar();
					break;
				case "f":
					toggleFilters();
					break;
				case "l":
					self.appState.dataset > -1 ? toggleLegend() : null;
					break;
			}
		});
	};

	self.appState = {
		pinned: null,
		legend: {
			title: ko.observable(),
		},
		dataset: -1,
		details: ko.observable(),
	};

  self.geo = {
    base: null,
  };

	self.config = ko.observable();
}

const app = new App();

window.onload = function () {
	ko.applyBindings(app);

	app.onLoaded();
};
