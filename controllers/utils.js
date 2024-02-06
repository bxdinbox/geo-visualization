const pug = require("pug");
const mustache = require("mustache");

exports.content = (component, template, bag, res) => {
	const html = T(component, template, bag);

	res.writeHead(200, {
		"Content-Type": "text/html",
		"Content-Length": html.length,
		Expires: new Date().toUTCString(),
	});

	res.end(html);
};

exports.html = (component, template, bag) => {
	return T(component, template, bag);
};

function T(component, template, bag) {
	return mustache.render(pug.renderFile(`${__dirname}/${component}/templates/${template}.pug`, { pretty: process.NODE_ENV != "production" }), bag);
}

exports.mustacheFromPug = (component, template) => {
	const sz = pug.renderFile(`${__dirname}/${component}/templates/${template}.pug`, { pretty: process.NODE_ENV != "production" });

	return sz.replace(/LLL/g, "{{").replace(/RRR/g, "}}");
};

exports.mustachejs = mustache; // share globally
