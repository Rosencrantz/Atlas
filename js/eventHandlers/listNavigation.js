/*!
 * listNavigation
 *
 * This module provides simple horizontal and vertical keyboard navigation within a list
 * If the list contains a aria-flowto attribute then the keyboard navigation can work across lists
 */
define(['jquery'], function ($) {
	function listNavigation () {

		function next() {
			var element = $(this),
				listItem = element.closest('li'),
				nextMenu = getFocusable('#' + element.closest('ul').attr('aria-flowto')),
				nextMenuItem = getFocusable(listItem.next());		
			
			if(nextMenuItem.length) {
				element.blur();
				nextMenuItem.focus();
			} else if(nextMenu) {
				nextMenu.focus();
			}
		}

		function previous(e) {
			var element = $(this),
				listItem = element.closest('li'),
				previousMenuItem = getFocusable(listItem.prev()),
				previousMenu = getFocusable($('[aria-flowto="' + element.closest('ul').attr('id') + '"]'), true);
		
			if(previousMenuItem.length) {
				element.blur() 
				previousMenuItem.focus();
			} else if(previousMenu) {
				previousMenu.focus();
			}
		}

		function getFocusable(container, lastChild) {			
			var $container = $(container);
				focusableElements = $('a,input,select,textarea,button', $container).filter(':visible');
			
			if(lastChild) {
				return focusableElements.length && $(focusableElements.get(focusableElements.length-1));
			}

			return focusableElements.length && $(focusableElements.get(0));
		}	

		return {
			vertical : function (e) {
				if(e.keyCode < 37 || e.keyCode > 40) {
					return;
				}

				e.preventDefault();
				e.keyCode == 40 && next.call(e.target);
				e.keyCode == 38 && previous.call(e.target);
			},

			horizontal : function (e) {
				if(e.keyCode < 37 || e.keyCode > 40) {
					return;
				}

				e.preventDefault();
				e.keyCode == 39 && next.call(e.target, e);
				e.keyCode == 37 && previous.call(e.target, e);			
			},

			next : function(current) {
				next.call(current);
			},

			previous : function(current) {
				previous.call(current);
			}
		}
	}

	return listNavigation;
});
