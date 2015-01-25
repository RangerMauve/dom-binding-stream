var domDelegate = require("dom-delegate-stream");
var map = require("through2-map").obj;
var makeProp = require("make-prop");

module.exports = function (selector) {
	var main = document.querySelector(selector);
	var delegate = domDelegate(main);

	var parser = map(generate_state_update);

	delegate.on("change", "input, textarea, select").pipe(parser);
	delegate.on("keyup", "input, textarea, select").pipe(parser);
	delegate.on("paste", "input, textarea, select").pipe(parser);

	return parser;
}

function generate_state_update(event) {
	var element = event.target;
	var binding = element.dataset.binding;
	var value;

	if (element.type !== "radio")
		value = element.value;
	else if (element.checked)
		value = element.value;

	if (element.type === "checkbox")
		value = element.checked;

	return makeProp(binding)(value);
}
