/*
 * === relativePosition (internal use only) ===
 *
 * The relativePosition object contains a number of convienence methods for positioning one element 
 * relative to another. This is especially useful for plugins such as dropdown or dialog where there 
 * are usually strong associations between the position of the trigger and its container
 *
 * Positioning can be chained if you need to align an element to the bottom left of top right of a container:
 *
 * positioning.top().left();
 * positioning.bottom().right();
 *
 * === Javascript ===
 * 
 * var positioning = relative(element, [element]);
 * 
 * positioning.top(element);
 * positioning.veryTop(element);
 * positioning.bottom(element);
 * positioning.veryBottom(element);
 * positioning.left(element);
 * positioning.farLeft(element);
 * positioning.right(element);
 * positioning.farRight(element);
 * positioning.nudge(element, {'top' : val, 'left' : val});
 *
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
				containerTop = fixedTop;
				container.css('top', containerTop);
				return this;
			},

			above : function (item) {
				container = setContainer(item);
				containerTop = fixedTop - container.outerHeight();
				container.css('top', containerTop);
				return this;
			},

			bottom : function (item) {
				container = setContainer(item);
				containerTop = fixedTop + fixedElement.outerHeight() - container.outerHeight();
				container.css('top', containerTop);
				return this;
			},

			below : function (item) {
				container = setContainer(item);
				containerTop = fixedTop + fixedElement.outerHeight()
				container.css('top', containerTop);
				return this;
			},
			
			left : function (item) {
				container = setContainer(item);
				containerLeft =  fixedLeft;
				container.css('left', containerLeft);
				return this;
			},

			farLeft : function (item) {
				container = setContainer(item);
				containerLeft =  fixedLeft - container.outerWidth();
				container.css('left', containerLeft);
				return this;
			},

			right : function (item) {
				container = setContainer(item);
				containerLeft = fixedLeft + (fixedElement.outerWidth() - container.outerWidth());
				container.css('left', containerLeft);
				return this;
			},

			farRight : function (item) {
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
