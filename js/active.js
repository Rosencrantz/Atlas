define(['jquery'], function ($) {
	var Activate = function(element) {
		$(element).delegate('li', 'focus.active', this.active);
		$(element).delegate('li', 'blur.active', this.inactive);
	}
	
	Activate.prototype = {
		activate : function () {
			$(this).addClass('active');
		},

		deactivate: function () {
			$(this).removeClass('active');
		}
	}

	$.fn.activate = function (option) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('activate');

			!data && $this.data('activate', (data = new Activate(this)));
			typeof option == 'string' && data[option].call($this);
		});
	}

	$(function() {
		$('body').delegate('ul[role~="menu"] li', 'mouseover.activate', Activate.prototype.active);
		$('body').delegate('ul[role~="menu"] li', 'mouseout.activate', Activate.prototype.inactive);
		$('body').delegate('ul[role~="menu"] li', 'click.activate', Activate.prototype.active);
	});
});
