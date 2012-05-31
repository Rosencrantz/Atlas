/*!
 * Menu
 * 
 */
define('menu',['jquery', 'mixins/navigationMixin', 'mixins/keycodeMixin'], function ($, navigation, keycode) {
    var trigger = '[data-trigger="menu"]',
        nav;

    var Menu = function (element) {
        nav = navigation($(element));
        $(element).on('mouseover', this.keyboardNavigation);
        $(element).on('keydown', this.mouseNavigation);
    };

    function keyboardNavigation (nav, event) { 
        var key = event.keyCode,
            shiftKey = event.shiftKey;

        event.preventDefault();
        
        if(key && (key == $.keycode.DOWN || (!shiftKey && key == $.keycode.TAB))) {
            nav.next();
        }

        if(key && (key == $.keycode.UP || (shiftKey && key == $.keycode.TAB))) { 
            nav.previous();
        }
        
        return this;
    }

    function mouseNavigation(nav, event) { }

    Menu.prototype = {
    }

    $.fn.menu = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('menu');              
            
            !data && $this.data('menu', (data = new Menu(this)));
            typeof option == 'string' && data[option].call($this);
        });
    }

    $(function () {
        $('[data-trigger="menu"]').each(function () {
            var that = this;
            nav = navigation($(this));
            $(this).on('mouseover', function (nav) { return function (event) { mouseNavigation.apply(that, [nav, event]) } }(nav));
            $(this).on('keyup', function (nav) { return function (event) { keyboardNavigation.apply(that, [nav, event]) } }(nav));
        });
    });

    return Menu;
});