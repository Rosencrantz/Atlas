require(['settings', 'tab'], function (settings, tab) {
	module("Tab tests", {
		setup : function () {
			$('body').append('<div id="tab" data-trigger="tab"></div>');
		}
	});

	test("Can create tab", function () {
		var tab = $('#tab').tab();
		ok(tab);
	});
});