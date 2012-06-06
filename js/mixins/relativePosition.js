/*!
 * Placement
 * places one element in relation to another
 */
define(['jquery'], function($) {
	var fixedElement, container, fixedLeft, fixedTop, containerLeft, containerTop;

	function relativePosition(element, container) {
		fixedElement = $(element);
		container = container || $('#' + fixedElement.attr('aria-owns'));
		fixedTop = fixedElement.offset() ? fixedElement.offset().top : 0;
		fixedLeft = fixedElement.offset() ? fixedElement.offset().left : 0;

		function setContainer(element) {
			element = ($(element).length && $(element)) || container;
			element.css('position') != 'absolute' && element.css('position', 'absolute');
			return element;
		}

		return {
			top : function (item) {
				container = setContainer(item);
				containerTop = fixedTop - container.outerHeight();
				container.css('top', containerTop);
				return this;
			},

			bottom : function (item) {
				container = setContainer(item);
				containerTop = fixedTop + fixedElement.outerHeight()
				container.css('top', containerTop);
				return this;
			},

			left : function (item) {
				container = setContainer(item);
				containerLeft =  fixedLeft - container.outerWidth();
				container.css('left', containerLeft);
				return this;
			},

			right : function (item) {
				container = setContainer(item);
				containerLeft = fixedLeft + fixedElement.outerWidth();
				container.css('left', containerLeft);
				return this;
			},

			middle : function (item) {
				container = setContainer(item);
				containerTop = fixedTop + Math.floor((fixedElement.outerHeight() - container.outerHeight()) / 2);
				container.css('top', containerTop);
				return this;
			},

			center : function (item) {
				container = setContainer(item);
				containerLeft = fixedLeft + Math.floor((fixedElement.outerWidth() - container.outerWidth()) / 2);
				container.css('left', containerLeft);
				return this;
			},

			nudge : function (item, position) {
				
				if(!position && typeof item == "object") {
					position = item;
					item = undefined;
				} 

				if (position) {
					position.left = position.left || 0;
					position.top = position.top || 0;
				} else {
					position = {"left": 0, "top" : 0};
				}

				container = setContainer(item);
				containerLeft = containerLeft + position.left;
				containerTop = containerTop + position.top;
				container.css({"left" : containerLeft, "top" : containerTop});
				return this;
			}
		};
	}

	return relativePosition;
});
