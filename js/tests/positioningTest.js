require(['mixins/relativePosition'], function (placement) {
	module("relative position tests", {
		setup : function () {
			$('body').append('<div id="container">Hello world</div>');
		},
		teardown : function () {
			$('#container').remove();
		}
	});

	test("Placement is created", function () {
		ok(placement);
	});

	test("Placement is function", function () {
		ok(typeof placement == "function");
	});

	test("Placement returns object", function () {
		var myPlacement = placement($('#qunit-fixture'));
		ok(typeof myPlacement == "object");
	});

	test("Placement.left Aligns the left of the trigger with the left of the container", function () {
		var myPlacement = placement($('#qunit-fixture'));
		myPlacement.left($('#container'));
		equal($('#qunit-fixture').offset().left, $('#container').offset().left);
	});	

	test("Placement.farLeft Aligns the left of the trigger with the right of the container", function () {
		var myPlacement = placement($('#qunit-fixture'));
		myPlacement.farLeft($('#container'));
		equal($('#qunit-fixture').offset().left, $('#container').offset().left + $('#container').outerWidth());
	});	

	test("Placement.right Aligns the right of the trigger with the right of the container", function () {
		var myPlacement = placement($('#qunit-fixture'));
		myPlacement.right($('#container'));
		equal($('#qunit-fixture').offset().left + $('#qunit-fixture').outerWidth(), $('#container').offset().left + $('#container').outerWidth());
	});	

	test("Placement.farRight Aligns the right of the trigger with the left of the container", function () {
		var myPlacement = placement($('#qunit-fixture'));
		myPlacement.farRight($('#container'));
		equal($('#qunit-fixture').offset().left + $('#qunit-fixture').outerWidth(), $('#container').offset().left);
	});	

	test("Placement.top Aligns the top of the trigger with the top of the container", function () {
		var myPlacement = placement($('#qunit-fixture'));
		myPlacement.top($('#container'));
		equal($('#qunit-fixture').offset().top, $('#container').offset().top);
	});	

	test("Placement.above Aligns the top of the trigger with the bottom of the container", function () {
		var myPlacement = placement($('#qunit-fixture'));
		myPlacement.above($('#container'));
		equal($('#qunit-fixture').offset().top, $('#container').offset().top + $('#container').outerHeight());
	});	

	test("Placement.bottom Aligns the bottom of the trigger with the bottom of the container", function () {
		var myPlacement = placement($('#qunit-fixture'));
		myPlacement.bottom($('#container'));
		equal($('#qunit-fixture').offset().top + $('#qunit-fixture').outerHeight() - $('#container').outerHeight(), $('#container').offset().top);
	});	

	test("Placement.below Aligns the bottom of the trigger with the top of the container", function () {
		var myPlacement = placement($('#qunit-fixture'));
		myPlacement.below($('#container'));
		equal($('#qunit-fixture').offset().top + $('#qunit-fixture').outerHeight(), $('#container').offset().top);
	});	

	test("Placement.middle Aligns the middle (vertical center) of the trigger with the middle of the container", function () {
		var myPlacement = placement($('#qunit-fixture'));
		myPlacement.middle($('#container'));
		equal($('#qunit-fixture').offset().top + Math.floor(($('#qunit-fixture').outerHeight() - $('#container').outerHeight()) / 2), $('#container').offset().top);
	});	

	test("Placement.center Aligns the center (horizontal center) of the trigger with the center of the container", function () {
		var myPlacement = placement($('#qunit-fixture'));
		myPlacement.center($('#container'));
		equal($('#qunit-fixture').offset().left + Math.floor(($('#qunit-fixture').outerWidth() - $('#container').outerWidth()) / 2), $('#container').offset().left);
	});	

	test("Placement.nudge Shifts the position of the container by the specified number of pixels along the x axis", function () {
		var myPlacement = placement($('#qunit-fixture')),
			preNudgePos;

		myPlacement.left($('#container'));
		preNudgePos = $('#container').offset().left;
		equal(preNudgePos, $('#qunit-fixture').offset().left);

		myPlacement.nudge($('#container'), {'left' : 10});

		equal($('#container').offset().left, $('#qunit-fixture').offset().left + 10);
	});	

	test("Placement.nudge Shifts the position of the container by the specified number of pixels along the y axis", function () {
		var myPlacement = placement($('#qunit-fixture')),
			preNudgePos;

		myPlacement.top($('#container'));
		preNudgePos = $('#container').offset().top;
		equal(preNudgePos, $('#qunit-fixture').offset().top);

		myPlacement.nudge($('#container'), {'top' : 10});

		equal($('#container').offset().top, $('#qunit-fixture').offset().top + 10);
	});	
});
