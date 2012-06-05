define(['jquery', 'eve', 'settings', 'eventHandlers/controlLifecycle'], function ($, eve, settings, control) {

	function navigationMixin(container) {
		var container = $(container),
			children = container.children(),
			activeClass = settings.activeClass;

		function deactivate(element) {
			dispatch('deactivate', 'deactivated', true)
            element.each(function () {
	            eve(settings.appName + '.menu.deactivate.item', element);

	            setTimeout(function () {
	            	eve(settings.appName + '.menu.deactivated.item', element);
	            }, 0);
			});
        }

        function activate(element) {
            deactivate($('.' + activeClass, container));

            element.each(function () {
	            eve(settings.appName + '.menu.activate.item', this);

	            setTimeout(function () {
	            	eve(settings.appName + '.menu.activated.item', this);
	            }, 0);
        	}
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
				activate($(children[0]));;
				return this;
			},

			last : function () {
				activate($(children[children.length-1]));;
				return this;
			},

			next : function () {
				var activeIndex = getActiveIndex(children),
					nextIndex = ((activeIndex + 1) >= children.length) ? activeIndex : activeIndex+1;

				activate($(children[nextIndex]));
                return this;
			},

			previous : function () {
				var activeIndex = getActiveIndex(children),
					previousIndex = (activeIndex <= 0) ? 0 : activeIndex - 1;

				activate($(children[previousIndex]));
				return this;
			},

			clear: function() {
				deactivate();
				return this;
			},

			move : function (index) {
				deactivate();
				$(children[index]).addClass(activeClass);
				return this;
			},

			//Unsure about the following three functions
			container : function () {
				return container;
			},

			length : function () {
				return children.length;
			},

			activeIndex : function() {
				return getActiveIndex(children);
			}
		}
	}

	return navigationMixin;
});