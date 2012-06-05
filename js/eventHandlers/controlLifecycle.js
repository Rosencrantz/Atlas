/*
 * === ControlLifecycle (internal use only) ===
 *
 * The controlLifecycle object is designed to handle to events common to most user
 * interfaces. Showing, hiding, activating and disabling are all in the pervue of 
 * the controlLifecycle.
 *
 *
 * === Events ===
 * 
 * show -> Removes any hidden or invisible class from the given element
 * hide -> Adds a hidden class to the element 
 * activate -> Adds an active class to the element. Focuses the first child element
 * deactivate -> Removes an active class from an element
 * disable -> Disables the given element
 * enable -> Enables the given element. Focuses the first child element
 *
 */
define(['jquery', 'eve', 'settings'], function ($, eve, settings) {
	var controlLifecycle = function _controlLifecycle () {
		
		function isHidden(element) {
			return $(element).is('.' + settings.hiddenClass);
		}

		function isVisible(element) {
			return !$(element).is('.' + settings.invisibleClass);
		}

		function isActive(element) {
			return !$(element).is('.' + settings.activeClass);
		}

		function isDisabled(element) {
			return $(element).is('.' + settings.disabledClass);
		}

		function show(element) {
			$(element)
				.removeClass(settings.invisibleClass)
				.removeClass(settings.hiddenClass);

			return element;
		}

		function hide(element) {
			$(element)
				.removeClass(settings.invisibleClass)
				.addClass(settings.hiddenClass);
			
			return element;
		}

		function invisible(element) {
			$(element)
				.removeClass(settings.hiddenClass)
				.addClass(settings.invisibleClass);

			return element;
		}

		function activate(element) {
			$(element)
				.addClass(settings.activeClass);
			
			return element;
		}

		function deactivate(element) {
			$(element)
				.removeClass(settings.activeClass);

			return element;
		}

		function disable(element) {
			$(element)
				.addClass(settings.disabledClass);
		}

		function enable(element) {
			$(element)
				.removeClass(settings.disabledClass);
		}

		return {
			show : function (element) {
				show(element);
			},

			hide : function (element) {
				hide(element);
			},

			activate : function (element) {
				activate(element);
			},

			deactivate : function (element) {
				deactivate(element);
			},

			disable : function(element) {
				disable(element);
			},

			enable : function(element) {
				enable(element);
			},

			invisible : function (element) {
				invisible(element);
			},

			focus : function (element) {
				if(!isHidden(element) && !isDisabled(element)) {
					$($('a,input,select,textarea,button', element)[0]).focus();
				}
			},

			blur : function (element) {
				$($('a,input,select,textarea,button', element)[0]).blur();
			},
			
			isHidden : function (element) {
				return isHidden(element);
			},

			isVisible : function (element) {
				return isVisible(element);
			},

			isActive : function (element) {
				return isActive(element);
			},

			isDisabled : function (element) {
				return isDisabled(element);
			}
		};
	}();

	$(document).ready(function () {
		eve.on(settings.appName + '.show.*.panel', function () { controlLifecycle.show(eve.arguments[1]);});
		eve.on(settings.appName + '.hide.*.panel', function () { controlLifecycle.hide(eve.arguments[1]);});
		eve.on(settings.appName + '.invisible.*.item', function () { controlLifecycle.invisible(eve.arguments[1]);});
		eve.on(settings.appName + '.activate.*.item', function () { controlLifecycle.activate(eve.arguments[1]);});
		eve.on(settings.appName + '.activated.*.item', function () { controlLifecycle.focus(eve.arguments[1]);})
		eve.on(settings.appName + '.deactivate.*.item', function () { controlLifecycle.deactivate(eve.arguments[1]);});
		eve.on(settings.appName + '.deactivated.*.item', function () { controlLifecycle.blur(eve.arguments[1]);});
		eve.on(settings.appName + '.disable.*.item', function () { controlLifecycle.disable(eve.arguments[1]);});
		eve.on(settings.appName + '.enable.*.item', function () { controlLifecycle.enable(eve.arguments[1]);});
	});

	return controlLifecycle;
});