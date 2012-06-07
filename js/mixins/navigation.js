define(['jquery', 'eve', 'settings', 'eventHandlers/controlLifecycle', 'mixins/dispatcher'], function ($, eve, settings, control, dispatch) {

	function navigationMixin(container) {
		var container = $(container),
			pluginId = container.data(settings.pluginAttribute),
			children = container.children(),
			activeClass = settings.activeClass;

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
				deactivate(children);
				return this;
			},

			move : function (index) {
				activate(children[index]);
				return this;
			},

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