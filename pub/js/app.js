function App(){var e=this;e.onLoaded=function(){const t=L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'});e.geo.dataset=L.layerGroup(),e.geo.pins=L.layerGroup(),e.geo.base=L.map("map",{center:[39.8282,-98.5795],zoom:4,layers:[t,e.geo.dataset,e.geo.pins]});const a={OpenStreetMap:t};L.control.layers(a).addTo(e.geo.base).addBaseLayer(a.OpenStreetMap,"OpenTopoMap"),e.getAppConfig(),e.setHotKeys()},e.getColor=function(t){return e.config().rgb[e.appState.dataset][t]},e.style=function(t){const a=Math.ceil(9*Math.random())%9;return{fillColor:e.getColor(a),weight:2,opacity:1,color:"white",dashArray:"3",fillOpacity:.7}},e.getAppData=async function(e){const t=`/api${e}`;return new Promise((e=>{axios.get(t).then((t=>{e(t.data)}))}))},e.getAppConfig=function(){e.getAppData("/appconfig").then((t=>{e.config(t)}))},e.addPinsToMap=function(t){const a=L.layerGroup();t.forEach((t=>{L.marker([t.a,t.o],{customData:{id:t.id}}).addTo(a).on("click",(t=>e.onPin(t)))})),a.addTo(e.geo.pins)},e.onDatasetSelected=function(t){const a=e.config().datasets.indexOf(t);return a>-1&&a!=app.appState.dataset&&(e.appState.legend.title(t.legend),e.getDataset(a),app.appState.dataset=a),!0},e.onPinsEvent=function(t){const a=e.config().pinsets.map((e=>e.filter)).indexOf(t.filter);return e.geo.pins.clearLayers(),e.getAppData(`/pinsets/${a}`).then((t=>{t&&e.addPinsToMap(t)})),!0},e.getDataset=function(t){e.geo.dataset.clearLayers(),e.getAppData(`/datasets/${t}`).then((a=>{a&&(hideWidget("#widget-legend"),L.geoJson(a,{style:e.style}).addTo(e.geo.dataset),setLegend(e.appState.legend.title(),e.config().segmented[t],e.config().rgb[t]),showWidget("#widget-legend"))}))},e.onPin=function(t){try{const a=t.target.options.customData.id;e.appState.pinned=a,e.getAppData(`/pins/${a}`).then((t=>{t&&(e.appState.details(t),showSidebar())}))}catch(e){}},e.onClearAll=function(){e.geo.dataset.clearLayers(),e.geo.pins.clearLayers(),onClearAll(),e.appState.dataset=-1},e.setHotKeys=function(){document.addEventListener("keydown",(function(t){switch(t.key.toLowerCase()){case"escape":hideSidebar();break;case"f":toggleFilters();break;case"l":e.appState.dataset>-1&&toggleLegend()}}))},e.appState={pinned:null,legend:{title:ko.observable()},dataset:-1,details:ko.observable()},e.geo={base:null},e.config=ko.observable()}const app=new App;window.onload=function(){ko.applyBindings(app),app.onLoaded()};
