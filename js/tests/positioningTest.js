require(['../mixins/relativePositionMixin'], function (placement) {
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

	test("Placement.left positions the container to the left of the fixedElement", function () {
		var myPlacement = placement($('#qunit-fixture'));
		myPlacement.left($('#container'));
		equal($('#qunit-fixture').offset().left, $('#container').offset().left + $('#container').outerWidth());
	});	

	test("Placement.right positions the container to the right of the fixedElement", function () {
		var myPlacement = placement($('#qunit-fixture'));
		myPlacement.right($('#container'));
		equal($('#qunit-fixture').offset().left + $('#qunit-fixture').outerWidth(), $('#container').offset().left + $('#container').outerWidth());
	});	

	test("Placement.top positions the container above the fixedElement", function () {
		var myPlacement = placement($('#qunit-fixture'));
		myPlacement.top($('#container'));
		equal($('#qunit-fixture').offset().top, $('#container').offset().top + $('#container').outerHeight());
	});	

	test("Placement.bottom positions the container below the fixedElement", function () {
		var myPlacement = placement($('#qunit-fixture'));
		myPlacement.bottom($('#container'));
		equal($('#qunit-fixture').offset().top + $('#qunit-fixture').outerHeight(), $('#container').offset().top);
	});	

	test("Placement.middle positions a div halfway down the fixedElement", function () {
		var myPlacement = placement($('#qunit-fixture'));
		myPlacement.middle($('#container'));
		equal($('#qunit-fixture').offset().top + Math.floor(($('#qunit-fixture').outerHeight() - $('#container').outerHeight()) / 2), $('#container').offset().top);
	});	

	test("Placement.center positions a div halfway along the width of the fixedElement", function () {
		var myPlacement = placement($('#qunit-fixture'));
		myPlacement.center($('#container'));
		equal($('#qunit-fixture').offset().left + Math.floor(($('#qunit-fixture').outerWidth() - $('#container').outerWidth()) / 2), $('#container').offset().left);
	});	

	test("Placement.nudge moves a div by the specified top / left values", function () {
		var myPlacement = placement($('#qunit-fixture')),
			preNudgePos;

		myPlacement.left($('#container'));
		preNudgePos = $('#container').offset().left;		
		myPlacement.nudge($('#container'), {'left' : 10, 'top' : 0});

		equal(preNudgePos + 10, $('#container').offset().left - $('#container').outerWidth());
	});	
});
