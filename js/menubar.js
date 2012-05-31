define(['jquery', 'listNavigation'], function($, listNavigation) {
	$(function () {
		var navigation = listNavigation();
		$('body').delegate('.aui-menu-bar .aui-menu', 'keydown.menubar.data-api', navigation.horizontal); 

		$('body').delegate('.aui-menu-bar .aui-menu', 'keydown.menubar.data-api', function (e) {
			var dropdown = $('#' + $(e.target).attr('aria-owns'));

			if(e.keyCode == 40) {
				dropdown && $($('a,input,select,textarea,button', dropdown).filter(':visible')[0]).focus();
			} else {
				dropdown.dropdown('close');
			}	
		});

	function parentNavigation(e) {
		var item = $('[aria-owns="' + $(e.currentTarget).closest('.' + settings.dropdownClass + '[id]').attr('id') + '"]'),
			navigation = listNavigation();

		if(item.length) {
			item.focus();
			close();
			e.keyCode == 39 && navigation.next(item);
			e.keyCode == 37 && navigation.previous(item);
		}	
	}
		//If you press left or right from inside a dropdown that is in a menu then navigate to the next menu item and close 
		//the dopdown
		$('body').delegate('.aui-dropdown3 .aui-menu', 'keydown.menubar.data-api', function (e) {
			switch(e.keyCode) {
				case 39:
				case 37:
					close(); 
					parentNavigation(e);
					break;
				case 27:
					close();
					break;
			}
		}); 
	});
});
