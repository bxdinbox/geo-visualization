const fs = require("fs");

const a = { datasets: [], pinsets: [], rgb:[], segmented:[] };

const b = [
	{ category:"datasets", filter:"Adult (18+)", legend:"Adults (18+), 2024 (Estimated)" },
	{ category:"datasets", filter:"Teenagers (13-17)", legend:"Teenagers (13-17), 2022" },
	{ category:"datasets", filter:"Children (1-12)", legend:"Children (1-12), 1999" },

	{ category:"pinsets", filter:"National parks" },
	{ category:"pinsets", filter:"National monuments" },
	{ category:"pinsets", filter:"Historical battlefields" },

	{ category:"rgb", rgb:"#00876c,#4c9973,#76aa7d,#9bbb8c,#bdcc9e,#dddeb5,#fbf1ce,#f2d8ab,#edbd8b,#e8a172,#e3835f,#dd6354,#d43d51" },
	{ category:"rgb", rgb:"#1d458f,#565ba0,#7e73b2,#a28dc3,#c3aad6,#e2c7ea,#ffe7ff,#f9ccec,#f4b0d5,#f094b9,#ea779a,#e15b76,#d43d51" },
	{ category:"rgb", rgb:"#668f50,#849d60,#a0ac72,#babb87,#d3cb9e,#eadcb6,#ffedcf,#f7d4ad,#f1ba8f,#eb9e76,#e58164,#dd6257,#d43d51" },

	{ category:"segmented", segments:"0-1|2-3|4-5|6-7|8-9|10-11|12-13|14-15|16-17|18+" },
	{ category:"segmented", segments:"0-8|9-17|18-26|27-35|36-44|45-53|54-62|63-71|72-80|81+" },
	{ category:"segmented", segments:"0-210|211-421|422-632|633-843|844-1054|1055-1265|1266-1476|1477-1687|1688-1898|1899+" },

	{ category:"parks", id:"e2b3b037-b63c-4671-b587-049412bf98e7", a:"25.469444", o:"-80.186111", named:"Biscayne National Park", wiki:"https://en.wikipedia.org/wiki/Biscayne_National_Park", uri:"https://www.nps.gov/" },
	{ category:"parks", id:"7e4d235d-4d98-462b-abcb-e28319015237", a:"46.85", o:"-121.75", named:"Mount Rainier National Park", wiki:"https://en.wikipedia.org/wiki/Mount_Rainier_National_Park", uri:"https://www.nps.gov/" },
	{ category:"parks", id:"43b19f77-2540-4894-ae29-6d554d290578", a:"44.35", o:"-68.216667", named:"Acadia National Park", wiki:"https://en.wikipedia.org/wiki/Acadia_National_Park", uri:"https://www.nps.gov/" },
	{ category:"parks", id:"24df6053-2ced-4446-963e-94c50dce2488", a:"38.68", o:"-109.57", named:"Arches National Park", wiki:"https://en.wikipedia.org/wiki/Arches_National_Park", uri:"https://www.nps.gov/" },
	{ category:"monuments", id:"a898c411-8aed-4105-a8ad-3d7a2f5f2eaf", a:"27.505251", o:"-81.545953", named:"Biscayne National Park", wiki:"https://wikipeda.org/", uri:"https://www.nps.gov/" },
	{ category:"monuments", id:"0ddbdc37-4a22-42cd-bfe6-92da34679cb1", a:"28.914143", o:"-81.285169", named:"M2Bryce National Park", wiki:"https://wikipeda.org/", uri:"https://www.nps.gov/" },
	{ category:"monuments", id:"84a5bd5b-62a3-4c8d-b6bf-ea5aab62d639", a:"29.479386", o:"-81.189263", named:"M3Bryce National Park", wiki:"https://wikipeda.org/", uri:"https://www.nps.gov/" },
	{ category:"monuments", id:"2f875b58-bb48-4249-b84f-627f173bb7ea", a:"28.261337", o:"-82.185302", named:"M4Bryce National Park", wiki:"https://wikipeda.org/", uri:"https://www.nps.gov/" },
	{ category:"monuments", id:"da982456-1a44-44bb-bf6f-e1c9b4b007f6", a:"28.347992", o:"-82.199746", named:"M5Bryce National Park", wiki:"https://wikipeda.org/", uri:"https://www.nps.gov/" },
	{ category:"historics", id:"4e04a240-4a45-401d-b238-906ed00118be", a:"29.043396", o:"-81.317311", named:"H1Bryce National Park", wiki:"https://wikipeda.org/", uri:"https://www.nps.gov/" },
	{ category:"historics", id:"f513abc1-3154-4d2c-8848-945026cec412", a:"28.82354", o:"-81.710784", named:"H2Bryce National Park", wiki:"https://wikipeda.org/", uri:"https://www.nps.gov/" },
	{ category:"historics", id:"fc30b5c7-cd73-4d6d-8916-de3619748a8a", a:"28.181227", o:"-81.642122", named:"H3Bryce National Park", wiki:"https://wikipeda.org/", uri:"https://www.nps.gov/" },
	{ category:"historics", id:"3e54890c-fd3f-49d2-8641-a0f95be83442", a:"28.295291", o:"-82.48999", named:"H4Bryce National Park", wiki:"https://wikipeda.org/", uri:"https://www.nps.gov/" },
];

b.filter(x => x.category == "datasets").forEach(c => a[c.category].push({ filter:c.filter, legend:c.legend }));
b.filter(x => x.category == "pinsets").forEach(c => a[c.category].push({ filter:c.filter }));
b.filter(x => x.category == "rgb").forEach(c => a[c.category].push(c.rgb.split(",")));
b.filter(x => x.category == "segmented").forEach(c => a[c.category].push(c.segments.split("|")));

fs.writeFileSync("../controllers/api/data/gui.json", JSON.stringify(a));

fs.writeFileSync("../controllers/api/data/pins_parks.json", JSON.stringify(b.filter(c => c.category == "parks")));
fs.writeFileSync("../controllers/api/data/pins_monuments.json", JSON.stringify(b.filter(c => c.category == "monuments")));
fs.writeFileSync("../controllers/api/data/pins_historics.json", JSON.stringify(b.filter(c => c.category == "historics")));
