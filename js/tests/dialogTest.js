require(['../dialog'], function (dialogPlugin) {
	module("Dropdown tests", {
		setup : function () {
			$('body').append('<a href="#" id="trigger" data-trigger="dialog" aria-owns="container">Trigger</a><div class="aui-dropdown aui-hide" id="container"><a id="trigger-close" data-trigger="dialog" aria-owns="container">Close</a></div>');
		},
		teardown : function () {
			$('#trigger').remove();
			$('#container').remove();
		}
	});

	test("Can create dialog", function () {
		var dialog = $('#trigger').dialog();
		ok(dialog);
	});
});
