require(['mixins/navigation'], function (navigationMixin) {
	var menu,
		navigation;

	module("Navigation tests", {
		setup : function () {
			$('body').append('<div id="myMenu"><ul id="menu">' +
				'<li><a href="#one">one</a></li>' +
				'<li><a href="#two">two</a></li>' +
				'<li><a href="#three">three</a></li>' +
				'<li><a href="#four">four</a></li>' +
				'<li><a href="#five">five</a></li></ul></div>');

			menu= $('#menu');
			navigation = navigationMixin(menu);
		},
		
		teardown : function () {
			while($('#myMenu').length) {
				$('#myMenu').remove();
			}
		}
	});

	test("The navigation function is created", function () {
		equal(typeof navigationMixin, "function");
	});

	test("The navigation, when called, returns an object", function () {
		equal(typeof navigation, "object");
	});

	test("First will focus the first (focusable) element within the specified container", function () {
		navigation.first();
		equal($('#menu li.atlas-active').text(), $('#menu li:first-child').text());
	});

	test("next will focus the next (focusable) element within the specified container", function () {
		navigation.first().next();
		equal($('#menu li.atlas-active').text(), $('#menu li:nth-child(2) a').text());
	});

	test("next cannot take you past the last (focusable) element within the specified container", function () {
		navigation.next().next().next().next().next().next();
		equal($('#menu li.atlas-active').text(), $('#menu li:nth-child(5) a').text());
	});

	test("preivous will focus the previous (focusable) element within the specified container", function () {
		navigation.next().next().next().previous();
		equal($('#menu li.atlas-active').text(), $('#menu li:nth-child(2)').text());
	});

	test("preivous cannot take you past the first element within the specified container", function () {
		navigation.next().previous().previous();
		equal($('#menu li.atlas-active').text(), $('#menu li:first-child').text());
	});

	test("move will move focus to the given index", function () {
		navigation.move(4);
		equal($('#menu li.atlas-active').text(), $('#menu li:nth-child(5)').text());

	});

	test("Clear will remove focus from the container altogether", function () {
		navigation.first();
		navigation.clear();
		ok(navigation.activeIndex() < 0);
	});

	test("activeIndex will return the position of the currently active item", function () {
		navigation.next().next().next();
		equal(navigation.activeIndex(), 2);
	});	
});