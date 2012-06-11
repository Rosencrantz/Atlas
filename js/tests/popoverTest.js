require(['settings', 'popover'], function (settings, popover) {
	module("Popover tests", {
		setup : function () {
			$('body').append('<a href="#" id="trigger" data-trigger="popover" aria-owns="container">Trigger</a><div class="atlas-hide" id="container">Hello world</div>');
		},
		teardown : function () {
			while($('#trigger').length) {
				$('#trigger').remove();
			}

			while($('#container').length) {
				$('#container').remove();
			}
		}
	});

	test("Can create popover", function () {
		var popover = $('#trigger').popover();
		ok(popover);
	});

	test("Can toggle a popover making it visible", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'block');
			start();
		}, 0);

		$('#trigger').popover('toggle');
	});

	test("Can toggle an open popover making it hidden", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'none');
			start();
		}, 0);

		$('#container').removeClass(settings.hiddenClass);
		$('#trigger').popover('toggle');
	});

	test("Can open a popover specifically", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'block');
			start();
		}, 0);

		$('#trigger').popover('open');
	});

	test("Can close a popover specifically", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'none');
			start();
		}, 0)

		$('#container').removeClass(settings.hiddenClass);
		$('#trigger').popover('close');
	});

	test("Mousing over a popover will open it", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'block');
			start();
		}, 0);
		$('#trigger').popover().mouseenter();
	});

	test("Mousing out of a popover will close it", 2, function () {
		stop();
		setTimeout(function () {
			setTimeout(function () {
				equal($('#container').css('display'), 'none');
				start();
			}, 0);

			equal($('#container').css('display'), 'block');
			$('#trigger').popover().mouseleave();
		}, 0);

		$('#trigger').popover().mouseenter();
	});

	test("Calling open on a popover causes it to open/stay open", 2, function () {
		stop();
		setTimeout(function () {
			setTimeout(function () {
				equal($('#container').css('display'), 'block');
				start();
			}, 0);

			equal($('#container').css('display'), 'block');			
			$('#trigger').popover('open')
		}, 0);

		$('#trigger').popover('open')
	});

	test("Calling close on a popover causes it to open/stay closed", 2, function () {
		stop();
		setTimeout(function () {
			setTimeout(function () {
				equal($('#container').css('display'), 'none');
				start();
			}, 0);
			equal($('#container').css('display'), 'none');			
			$('#trigger').popover('close')
		}, 0);

		$('#container').removeClass('.aui-hide');
		$('#trigger').popover('close');
	});	
});