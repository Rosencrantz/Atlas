require(['../menubar'], function (dropdownPlugin) {
	module("Menubar tests", {

	});

	test("Can create menubar", function () {
		var menu = $('body').menubar();
		ok(menu);
	});
});