require.config({
	paths : {
			"eventHandlers" : "./eventHandlers",
			"mixins" : "./mixins",
			"vendor" : "./vendor"
	}
});

define(['vendor/jquery/jquery', 'dropdown', 'dialog', 'popover', 'menu'], function ($, placement) {
	$(document).ready(function () {
		console.log('aui loaded');
	});
});
