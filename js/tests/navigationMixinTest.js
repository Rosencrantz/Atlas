require(['../mixins/navigationMixin'], function (navigationMixin) {
	var menu,
		navigation;

	module("navigationMixin tests", {
		setup : function () {
			$('body').append('<div><ul id="menu">' +
				'<li><a href="#one">one</a></li>' +
				'<li><a href="#two">two</a></li>' +
				'<li><a href="#three">three</a></li>' +
				'<li><a href="#four">four</a></li>' +
				'<li><a href="#five">five</a></li></ul></div>');

			menu= $('#menu');
			navigation = navigationMixin(menu);

		},
		teardown : function () {
			$('#menu').remove();
		}
	});

	test("The navigationMixin function is created", function () {
		equal(typeof navigationMixin, "function");
	});

	test("The navigationMixin, when called, returns an object", function () {
		equal(typeof navigation, "object");
	});

	test("First will focus the first (focusable) element within the specified container", function () {
		navigation.first();
		equal($('#menu li.aui-active').text(), $('#menu li:first-child').text());
	});

	test("next will focus the next (focusable) element within the specified container", function () {
		navigation.first().next();
		equal($('#menu li.aui-active').text(), $('#menu li:nth-child(2) a').text());
	});

	test("next cannot take you past the last (focusable) element within the specified container", function () {
		navigation.next().next().next().next().next().next();
		equal($('#menu li.aui-active').text(), $('#menu li:nth-child(5) a').text());
	});

	test("preivous will focus the previous (focusable) element within the specified container", function () {
		navigation.next().next().next().previous();
		equal($('#menu li.aui-active').text(), $('#menu li:nth-child(2)').text());
	});

	test("preivous cannot take you past the first element within the specified container", function () {
		navigation.next().previous().previous();
		equal($('#menu li.aui-active').text(), $('#menu li:first-child').text());
	});

	test("move will move focus to the given index", function () {
		navigation.move(4);
		equal($('#menu li.aui-active').text(), $('#menu li:nth-child(5)').text());

	})
});