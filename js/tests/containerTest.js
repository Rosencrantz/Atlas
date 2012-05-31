require(['../container'], function (container) {
	module("container tests", {
		setup : function () {
			$('body').append('<a id="trigger" aria-owns="container">Trigger</a><div id="container">Hello world</div>');
		},
		teardown : function () {
			$('#container').remove();
			$('#trigger').remove();
		}
	});

	test("Container Exists", function () {
		ok(container);
	});

	test("Container is function", function () {
		ok(typeof container == "function");
	});

	test("Container returns object", function () {
		var myContainer = container($('#container'));
		ok(typeof myContainer== "object");
	});
});

