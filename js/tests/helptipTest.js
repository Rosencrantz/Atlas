require(['settings', 'helptip'], function (settings, helptip) {
	module("Helptip tests", {
		setup : function () {
			$('body').append('<a href="#" id="trigger" data-trigger="helptip" aria-owns="container">Trigger</a><div class="atlas-hide" id="container">Hello world</div>');
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

	test("Can create helptip", function () {
		var helptip = $('#trigger').helptip();
		ok(helptip);
	});

	test("Can toggle a helptip making it visible", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'block');
			start();
		}, 0);

		$('#trigger').helptip('toggle');
	});

	test("Can toggle an open helptip making it hidden", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'none');
			start();
		}, 0);

		$('#container').removeClass(settings.hiddenClass);
		$('#trigger').helptip('toggle');
	});

	test("Can open a helptip specifically", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'block');
			start();
		}, 0);

		$('#trigger').helptip('open');
	});

	test("Can close a helptip specifically", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'none');
			start();
		}, 0)

		$('#container').removeClass(settings.hiddenClass);
		$('#trigger').helptip('close');
	});

	test("Clicking on a helptip trigger will open it", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'block');
			start();
		}, 0);
		$('#trigger').helptip().click();
	});

	test("Clicking the body will cause any open helptip to be closed", 2, function () {
		stop();
		setTimeout(function () {
			setTimeout(function () {
				equal($('#container').css('display'), 'none');
				start();
			}, 0);

			equal($('#container').css('display'), 'block');
			$('body').click();
		}, 0);

		$('#trigger').helptip().click();
	});

	test("Calling open on a helptip causes it to open/stay open", 2, function () {
		stop();
		setTimeout(function () {
			setTimeout(function () {
				equal($('#container').css('display'), 'block');
				start();
			}, 0);

			equal($('#container').css('display'), 'block');			
			$('#trigger').helptip('open')
		}, 0);

		$('#trigger').helptip('open')
	});

	test("Calling close on a helptip causes it to open/stay closed", 2, function () {
		stop();
		setTimeout(function () {
			setTimeout(function () {
				equal($('#container').css('display'), 'none');
				start();
			}, 0);
			equal($('#container').css('display'), 'none');			
			$('#trigger').helptip('close')
		}, 0);

		$('#container').removeClass('.aui-hide');
		$('#trigger').helptip('close');
	});	
});