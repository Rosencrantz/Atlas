require(['../menu'], function (dropdownPlugin) {
	module("Menu tests", {

	});

	test("Can create menu", function () {
		var menu = $('body').menu();
		ok(menu);
	});
});