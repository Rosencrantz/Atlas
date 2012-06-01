/*!
 * Menu
 * 
 */
define('menu',['jquery', 'mixins/navigationMixin', 'mixins/keycodeMixin'], function ($, navigation, keycode) {
    var trigger = '[data-trigger="menu"]';

    var Menu = function (element) {
        var nav = navigation($(element));
        $(element).data('nav', nav);
        $(element).on('mouseover', this.keyboardNavigation);
        $(element).on('keydown', this.mouseNavigation);
    };

    function keyboardNavigation (event) { 
        var key = event.keyCode,
            shiftKey = event.shiftKey,
            nav = $(this).data('nav');

        event.preventDefault();

        if(key && (key == keycode.DOWN || (!shiftKey && key == keycode.TAB))) {
            if(nav.activeIndex() == nav.length()-1) {
                nav.clear();
                $('#' + nav.container().attr('aria-flowto')).data('nav').first();
            } else {
                nav.next();
            }
        }

        if(key && (key == keycode.UP || (shiftKey && key == keycode.TAB))) { 
            if(nav.activeIndex() > 0) {
                nav.previous();
            } else {
               $('[aria-flowto="' + nav.container().attr('id') + '"]').data('nav').last(); 
            }
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
            var that = this,
                nav = navigation($(this));

            $(that).data('nav', nav);
            $(this).on('mouseover', function (event) { mouseNavigation.apply(that, [event]) });
            $(this).on('keyup', function (event) { keyboardNavigation.apply(that, [event]) });
        });
    });

    return Menu;
});