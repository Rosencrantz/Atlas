/*!
 * visibilityHandler (internal use only)
 *
 * The visibilityHandler is designed to handle show/hide requests for any plugin which requires them
 * The eventHandler watches for show/hide/invisible events that are generated on a container.
 * When an event is captured the appropriate action is taken.
 */
define(['jquery', 'eve', 'settings'], function ($, eve, settings) {
	var controlLifecycle = function _controlLifecycle () {
		
		//Convienence method to verify whether the given element has the
		//appropriate hidden class applied to it
		function isHidden(element) {
			return element.is('.' + settings.hiddenClass);
		}

		//Convienence method to verify whether the given element has the
		//appropriate invisible class applied to it.
		function isVisible(element) {
			return !element.is('.' + settings.invisibleClass);
		}

		function isActive(element) {
			return !element.is('.' + settings.activeClass);
		}

		//Remove any existing visibility class making the given element
		//visible
		function show(element) {
			element
				.removeClass(settings.invisibleClass)
				.removeClass(settings.hiddenClass)
				.addClass(settings.visibleClass);

			return element;
		}

		//Remove any existing visibility class and add the hiddenClass
		//to the specified element
		function hide(element) {
			element
				.removeClass(settings.visibleClass)
				.removeClass(settings.invisibleClass)
				.addClass(settings.hiddenClass);
			
			return element;
		}

		function activate(element) {
			element
				.removeClass(settings.deactiveClass)
				.addClass(settings.activeClass);
			
			return element;
		}

		function deactivate(element) {
			element
				.removeClass(settings.activeClass)
				.addClass(settings.deactiveClass);

			return element;
		}

		//Remove any existing visibility class and add the invisibleClass
		//to the specified element
		function invisible(element) {
			element
				.removeClass(settings.visibleClass)
				.removeClass(settings.hiddenClass)
				.addClass(settings.invisibleClass);

			return element;
		}

		//Return a public interface to the methods listed above
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

			invisible : function (element) {
				invisible(element);
			},

			focus : function (element) {
				if (!isHidden(element) && isVisible(element)) {
					$($('a,input,select,textarea,button', element)[0]).focus();
				}
			},

			isHidden : function (element) {
				return isHidden(element);
			},

			isVisible : function (element) {
				return isVisible(element);
			},

			isActive : function (element) {
				return isActive(element);
			}
		};
	}();

	//Setup event handlers for the visibility events and what they should do when called.
	$(document).ready(function () {
		eve.on(settings.appName + '.show.*.panel', function () { controlLifecycle.show(eve.arguments[1]);});
		eve.on(settings.appName + '.hide.*.panel', function () { controlLifecycle.hide(eve.arguments[1]);});
		eve.on(settings.appName + '.invisible.*.item', function () { controlLifecycle.invisible(eve.arguments[1]);});
		eve.on(settings.appName + '.activate.*.item', function () { controlLifecycle.activate(eve.arguments[1]);});
		eve.on(settings.appName + '.deactivate.*.item', function () { controlLifecycle.deactivate(eve.arguments[1]);});
	});

	return visibilityHandler;
});
