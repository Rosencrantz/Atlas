require(['settings', 'dropdown'], function (settings, dropdownPlugin) {
	module("Dropdown tests", {
		setup : function () {
			$('body').append('<a href="#" id="trigger" data-trigger="dropdown" aria-owns="container">Trigger</a><div class="atlas-hide" id="container">Hello world</div>');
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

	test("Can create dropdown", function () {
		var dropdown = $('#trigger').dropdown();
		ok(dropdown);
	});

	test("Can toggle a dropdown making it visible", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'block');
			start();
		}, 0);

		$('#trigger').dropdown('toggle');
	});

	test("Can toggle an open dropdown making it hidden", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'none');
			start();
		}, 0);

		$('#container').removeClass(settings.hiddenClass);
		$('#trigger').dropdown('toggle');
	});

	test("Can open a dropdown specifically", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'block');
			start();
		}, 0);

		$('#trigger').dropdown('open');
	});

	test("Can close a dropdown specifically", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'none');
			start();
		}, 0)

		$('#container').removeClass(settings.hiddenClass);
		$('#trigger').dropdown('close');
	});

	test("Clicking on a dropdown trigger will open it", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'block');
			start();
		}, 0);
		$('#trigger').dropdown().click();
	});

	test("Clicking the body will cause any open dropdown to be closed", 2, function () {
		stop();
		setTimeout(function () {
			setTimeout(function () {
				equal($('#container').css('display'), 'none');
				start();
			}, 0);

			equal($('#container').css('display'), 'block');
			$('body').click();
		}, 0);

		$('#trigger').dropdown().click();
	});

	test("Calling open on a dropdown causes it to open/stay open", 2, function () {
		stop();
		setTimeout(function () {
			setTimeout(function () {
				equal($('#container').css('display'), 'block');
				start();
			}, 0);

			equal($('#container').css('display'), 'block');			
			$('#trigger').dropdown('open')
		}, 0);

		$('#trigger').dropdown('open')
	});

	test("Calling close on a dropdown causes it to open/stay closed", 2, function () {
		stop();
		setTimeout(function () {
			setTimeout(function () {
				equal($('#container').css('display'), 'none');
				start();
			}, 0);
			equal($('#container').css('display'), 'none');			
			$('#trigger').dropdown('close')
		}, 0);

		$('#container').removeClass('.aui-hide');
		$('#trigger').dropdown('close');
	});	

	test("When opened a container appears aligned to the bottom left of the trigger", 3, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'block');
			equal($('#trigger').offset().left, $('#container').offset().left);		
			equal($('#trigger').offset().top + $('#trigger').outerHeight(), $('#container').offset().top);
			start();
		}, 0);

		$('#trigger').dropdown('toggle');
	});
});