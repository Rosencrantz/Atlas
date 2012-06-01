define('mixins/navigationMixin',['jquery'], function ($) {

	function navigationMixin(container) {
		var container = $(container),
			children = container.children(),
			activeClass = 'aui-active';

		function clearActive() {
			$('.' + activeClass, container).removeClass(activeClass);
		}

        function setActive(element) {
            var focusable = ['a','input','select','textarea','button'].join();
            
            clearActive();
            element.addClass(activeClass);
            $($(focusable, element)[0]).focus();            
        }

		function getActiveIndex(children) {
			for(var i=0, ii=children.length; i < ii; i++) {
				if ($(children[i]).is('.' + activeClass)) {
					return i;
				}
			}
			return -1;
		}

		return {
			first : function () {
				clearActive();
				$(children[0]).addClass(activeClass);
				return this;
			},

			next : function () {
				var activeIndex = getActiveIndex(children),
					nextIndex = ((activeIndex + 1) >= children.length) ? activeIndex : activeIndex+1;

				setActive($(children[nextIndex]));

                return this;
			},

			previous : function () {
				var activeIndex = getActiveIndex(children),
					previousIndex = (activeIndex <= 0) ? 0 : activeIndex - 1;

				setActive($(children[previousIndex]));

				return this;
			},

			move : function (index) {
				clearActive();
				$(children[index]).addClass(activeClass);
				return this;
			}
		}
	}

	return navigationMixin;
});