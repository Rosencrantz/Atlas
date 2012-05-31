/*!
 * visibilityHandler
 *
 * The visibilityHandler is designed to handle show/hide requests for any plugin which requires them
 * The eventHandler watches for show/hide/invisible events that are generated on a container.
 * When an event is captured the appropriate action is taken.
 */
define(['jquery'], function ($) {
	var visibilityHandler = function _visibiltyHandler () {
		
		//This defines the hidden/invisble classes that you want to use
		//You'll need to ensure that each class has the appropriate css
		var settings = {
				hiddenClass : 'aui-hide',
				invisibleClass : 'aui-invisible'
			};

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

		//Remove any existing visibility class making the given element
		//visible
		function show(element) {
			element
				.removeClass(settings.invisibleClass)
				.removeClass(settings.hiddenClass);
			
			return element;
		}

		//Remove any existing visibility class and add the hiddenClass
		//to the specified element
		function hide(element) {
			if (!isHidden(element)) {
				element
					.removeClass(settings.invisibleClass)
					.addClass(settings.hiddenClass);
			}
			
			return element;
		}

		//Remove any existing visibility class and add the invisibleClass
		//to the specified element
		function invisible(element) {
			if (isVisible(element)) {
				element
					.removeClass(settings.hiddenClass)
					.addClass(settings.invisibleClass);
			}

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
			}
		};
	}();

	//Setup event handlers for the visibility events and what they should do when called.
	$(document).ready(function () {
		$('body').on('visibility.show', function (event) { visibilityHandler.show($(event.target)); });
		$('body').on('visibility.hide', function (event) { visibilityHandler.hide($(event.target)); });
		$('body').on('visibility.invisible', function (event) { visibilityHandler.invisible($(event.target)); });
	});

	return visibilityHandler;
});
