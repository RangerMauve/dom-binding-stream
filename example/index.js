var domBinding = require("../");
var map = require("through2-map").obj;
var merge = require("object-merge-stream");

var output = document.getElementById("output");

domBinding("main").pipe(merge()).pipe(map(update_display));

function update_display(data) {
	output.innerHTML = JSON.stringify(data, null, "\t");
}
