/*global document */

function e(id) {
	return document.querySelector(`${id}`);
}

// eslint-disable-next-line no-unused-vars
function expando(src) {
	try {
		const context = src.getAttribute("ref");
		const content = document.querySelector(`#${context}`);

		if (content.classList.contains("hidden")) {
			content.classList.remove("hidden");
			src.classList.remove("fa-chevron-down");
			src.classList.add("fa-chevron-up");
		} else {
			content.classList.add("hidden");
			src.classList.remove("fa-chevron-up");
			src.classList.add("fa-chevron-down");
		}
	} catch (err) {
		/* empty */
	}
}

// eslint-disable-next-line no-unused-vars
function showSidebar() {
	_("#widget-sidebar", true);
}

// eslint-disable-next-line no-unused-vars
function hideSidebar() {
	_("#widget-sidebar", false);
}

// eslint-disable-next-line no-unused-vars
function toggleFilters() {
	document.querySelector("#vkcA").click();
}

// eslint-disable-next-line no-unused-vars
function toggleLegend() {
	toggleWidget("#widget-legend");
}

// eslint-disable-next-line no-unused-vars
function _(id, visible) {
	const target = e(id) || null;

	if (!target) {
		return;
	}

	visible ? target.classList.remove("hidden") : target.classList.add("hidden");
}

// eslint-disable-next-line no-unused-vars
function showWidget(id) {
	_(id, true);
}

// eslint-disable-next-line no-unused-vars
function hideWidget(id) {
	_(id, false);
}

// eslint-disable-next-line no-unused-vars
function toggleWidget(id) {
	const target = e(id) || null;

	if (!target) {
		return;
	}

	if (!target.classList.contains("hidden")) {
		target.classList.add("hidden");
	} else {
		target.classList.remove("hidden");
	}
}

// eslint-disable-next-line no-unused-vars
function setLegend(titled, segments, rgb) {
	try {
		document.querySelector("#widget-legend h3").innerText = titled;
		document.querySelectorAll("#widget-legend .segment").forEach((obj, n) => {
			obj.innerText = segments[n];
			obj.style.backgroundColor = rgb[n];
		});
	} catch {
		/* */
	}
}

// eslint-disable-next-line no-unused-vars
function onClearAll() {
	document.querySelectorAll("#filters-box input").forEach(ctrl => ctrl.checked = false);
	hideWidget("#widget-legend");
}
