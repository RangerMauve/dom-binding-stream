dom-binding-stream
==================

Binds to a DOM node, and emits changes of any inputs/textareas/selects inside it.

This module expects a DOM node with either `<textarea>`, `<input>`, or `<select>` tags as children somewhere inside it (can be as deep in the tree as you want). Those elements should then have the attribute `data-binding` which contains a keypath to emit updates under.

Example
-------

Live [demo](http://rangermauve.github.io/dom-binding-stream/example/).

Given some HTML that looks like this:

```html
<main>
	<div>
		<label>Select box</label>
		<select data-binding="select" value="foo">
		<option>Foo</option>
		<option>Bar</option>
		<option>Baz</option>
		</select>
	</div>
	<div>
		<label>Text Input</label>
		<input data-binding="text">
	</div>
	<div>
		<label>Radio Button Input</label>
		<input type="radio" name="radio" value="foo" data-binding="radio">
		<input type="radio" name="radio" value="bar" data-binding="radio">
		<input type="radio" name="radio" value="baz" data-binding="radio">
	</div>
</main>
```

We can set up the binding and listen for changes like so:

```javascript
var domBinding = require("../");
var map = require("through2-map").obj;
var merge = require("object-merge-stream");

var output = document.getElementById("output");

domBinding("main") // Listen for changed inputs
	.pipe(merge()) // Merge all the changes together
	.pipe(map(log)); // Log merged changes to console

function log(data) {
	// Log the changed data to the console
	console.log(data);
}

```
