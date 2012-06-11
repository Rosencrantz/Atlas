require(['settings', 'dialog'], function (settings, dialog) {
	module("Dialog tests", {
		setup : function () {
			$('body').append('<a href="#" id="trigger" data-trigger="dialog" aria-owns="container">Trigger</a><div class="atlas-hide" id="container">Hello world</div>');
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

	test("Can create dialog", function () {
		var dialog = $('#trigger').dialog();
		ok(dialog);
	});

	test("Can toggle a dialog making it visible", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'block');
			start();
		}, 0);

		$('#trigger').dialog('toggle');
	});

	test("Can toggle an open dialog making it hidden", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'none');
			start();
		}, 0);

		$('#container').removeClass(settings.hiddenClass);
		$('#trigger').dialog('toggle');
	});

	test("Can open a dialog specifically", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'block');
			start();
		}, 0);

		$('#trigger').dialog('open');
	});

	test("Can close a dialog specifically", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'none');
			start();
		}, 0)

		$('#container').removeClass(settings.hiddenClass);
		$('#trigger').dialog('close');
	});

	test("Clicking on a dialog trigger will open it", 1, function () {
		stop();
		setTimeout(function () {
			equal($('#container').css('display'), 'block');
			start();
		}, 0);
		$('#trigger').dialog().click();
	});

	test("Calling open on a dialog causes it to open/stay open", 2, function () {
		stop();
		setTimeout(function () {
			setTimeout(function () {
				equal($('#container').css('display'), 'block');
				start();
			}, 0);

			equal($('#container').css('display'), 'block');			
			$('#trigger').dialog('open')
		}, 0);

		$('#trigger').dialog('open')
	});

	test("Calling close on a closed dialog causes it to stay closed", 2, function () {
		stop();
		setTimeout(function () {
			setTimeout(function () {
				equal($('#container').css('display'), 'none');
				start();
			}, 0);
			equal($('#container').css('display'), 'none');			
			$('#trigger').dialog('close')
		}, 0);

		$('#container').removeClass(settings.hiddenClass);
		$('#trigger').dialog('close');
	});	
});
