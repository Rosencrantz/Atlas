require(['settings', 'eventHandlers/controlLifecycle'], function (settings, controlLifecycle) {
	var container;

	module("controlLifecycle tests", {
		setup : function () {
			$('body').append('<div id="container">Hello world</div>');
			container = $('#container');
		},
		teardown : function () {
			while($('#container').length) {
				$('#container').remove();
			}
		}
	});

	test("The controlLifecycle object is created", function () {
		equal(typeof controlLifecycle, "object");
	});

	test("Executing show on a container will remove the hidden class cause it to be displayed", function () {
		controlLifecycle.hide(container);
		ok(container.is('.' + settings.hiddenClass));
		ok(!container.is(settings.invisibleClass));
		equal(container.css('display'), 'none');
		
		controlLifecycle.show(container);
		equal(container.css('display'), 'block'); 
		ok(!container.is('.' + settings.hiddenClass));
		ok(!container.is(settings.invisibleClass));
	});

	test("Executing hide on a container will cause the " + settings.hiddenClass + " to be added to it", function () {
		controlLifecycle.show(container);
		ok(!container.is('.' + settings.hiddenClass));
		ok(!container.is(settings.invisibleClass));
		equal(container.css('display'), 'block');

		controlLifecycle.hide(container);

		equal(container.css('display'), 'none'); 
		ok(container.is('.' + settings.hiddenClass));
		ok(!container.is(settings.invisibleClass));
	});

	test("Executing invisible on a container will cause " + settings.invisibleClass + " class to be added to it", function () {
		container.removeClass('aui-hide');
		ok(!container.is('.' + settings.hiddenClass));
		equal(container.css('display'), 'block');

		controlLifecycle.invisible(container);

		equal(container.css('visibility'), 'hidden'); 
		ok(!container.is('.' + settings.hiddenClass));
		ok(container.is('.' + settings.invisibleClass));
	});

	test("Executing activate on a container will cause " + settings.activeClass + " class to be added to it", function () {
		controlLifecycle.activate(container);
		ok(container.is('.' + settings.activeClass));
	});

	test("Executing deactivate on an active container will cause " + settings.activeClass + " class to be removed from it", function () {
		container.addClass(settings.activeClass);
		controlLifecycle.deactivate(container);
		ok(!container.is('.' + settings.activeClass));
	});

	test("Executing disable on a container will cause " + settings.disabledClass + " class to be added to it", function () {
		controlLifecycle.disable(container);
		ok(container.is('.' + settings.disabledClass));
		equal(container.attr('disabled'), 'disabled');
	});

	test("Executing enable on a disabled container will cause " + settings.disabledClass + " class to be removed from it", function () {
		container.addClass(settings.disabledClass);
		container.attr('disabled', 'disabled');

		controlLifecycle.enable(container);
		ok(!container.is('.' + settings.disabledClass));
		ok(!container.attr('disabled'));
	});

	test("IsHidden returns true on a container with a class of " + settings.hiddenClass, function () {
		controlLifecycle.hide(container);
		ok(controlLifecycle.isHidden(container));
		controlLifecycle.show(container);
		ok(!controlLifecycle.isHidden(container));
	});

	test("IsVisible returns false on a container with a class of " + settings.invisibleClass, function () {
		controlLifecycle.invisible(container);
		ok(!controlLifecycle.isVisible(container));
		controlLifecycle.show(container);
		ok(controlLifecycle.isVisible(container));
	});

	test("IsActive returns true on a container with a class of " + settings.activeClass, function () {
		container.addClass(settings.activeClass);
		ok(controlLifecycle.isActive(container));
		ok(container.is('.' + settings.activeClass));
	});

	test("IsDisabled returns true on a container with a class of " + settings.disabledClass, function () {
		container.addClass(settings.disabledClass);
		container.attr('disabled', 'disabled');
		ok(controlLifecycle.isDisabled(container));
	});
});
