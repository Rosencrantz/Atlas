require(['../eventHandlers/visibilityHandler'], function (visibilityHandler) {
	var container;

	module("visibility handler tests", {
		setup : function () {
			$('body').append('<div id="container">Hello world</div>');
			container = $('#container');
		},
		teardown : function () {
			$('#container').remove();
		}
	});

	test("The visibilityHandler object is created", function () {
		equal(typeof visibilityHandler, "object");
	});

	test("Executing show on a container will remove the hidden class cause it to be displayed", function () {
		visibilityHandler.hide(container);
		ok(container.is('.aui-hide'));
		ok(!container.is('.aui-invisible'));
		equal(container.css('display'), 'none');
		
		visibilityHandler.show(container);
		equal(container.css('display'), 'block'); 
		ok(!container.is('.aui-hide'));
		ok(!container.is('.aui-invisible'));
	});

	test("Executing hide on a container will cause an aui-hide class to be added to it", function () {
		visibilityHandler.show(container);
		ok(!container.is('.aui-hide'));
		ok(!container.is('.aui-invisible'));
		equal(container.css('display'), 'block');

		visibilityHandler.hide(container);

		equal(container.css('display'), 'none'); 
		ok(container.is('.aui-hide'));
		ok(!container.is('.aui-invisible'));
	});

	test("Executing invisible on a container will cause an aui-invisible class to be added to it", function () {
		container.removeClass('aui-hide');
		ok(!container.is('.aui-hide'));
		equal(container.css('display'), 'block');

		visibilityHandler.invisible(container);

		equal(container.css('visibility'), 'hidden'); 
		ok(!container.is('.aui-hide'));
		ok(container.is('.aui-invisible'));
	});

	test("IsHidden returns true on a container with a class of aui-hide", function () {
		visibilityHandler.hide(container);
		ok(visibilityHandler.isHidden(container));
		visibilityHandler.show(container);
		ok(!visibilityHandler.isHidden(container));
	});

	test("IsVisible returns false on a container with a class of aui-invisible", function () {
		visibilityHandler.invisible(container);
		ok(!visibilityHandler.isVisible(container));
		visibilityHandler.show(container);
		ok(visibilityHandler.isVisible(container));
	});
});
