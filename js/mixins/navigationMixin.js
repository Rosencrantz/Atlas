define(['jquery', 'eve', 'settings', 'eventHandlers/controlLifecycle'], function ($, eve, settings, control) {

	function navigationMixin(container) {
		var container = $(container),
			pluginId = container.data(settings.pluginAttribute),
			children = container.children(),
			activeClass = settings.activeClass;

		function dispatch(preEvent, postEvent, element) {   
        	eve(preEvent, element);

        	setTimeout(function () {
        		eve(postEvent, element);
        	}, 0);
		}

        function activate(element) {
            var preEvent = [settings.appName, 'activate', pluginId, 'item'].join('.'),
            	postEvent = [settings.appName, 'activated', pluginId, 'item'].join('.');

            children.filter(':not.' + activeClass).each(function () {
            	control.deactivate(this);
            });

            dispatch(preEvent, postEvent, element);
        };

		function deactivate(element) {
            var preEvent = [settings.appName, 'deactivate', pluginId, 'item'].join('.'),
            	postEvent = [settings.appName, 'deactivated', pluginId, 'item'].join('.');
	
            dispatch(preEvent, postEvent, element);
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