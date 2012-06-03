/*!
 * Menu
 * 
 */
define('menu',['jquery', 'mixins/navigationMixin', 'mixins/keycodeMixin', 'mixins/registerPluginMixin'], function ($, navigation, keycode, registerPlugin) {
    var trigger = '[data-trigger="menubar"]';

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

        if(key && (key == keycode.RIGHT || (!shiftKey && key == keycode.TAB))) {
            if(nav.activeIndex() == nav.length()-1) {
                nav.clear();
                $('#' + nav.container().attr('aria-flowto')).data('nav').first();
            } else {
                nav.next();
            }
        }

        if(key && (key == keycode.LEFT || (shiftKey && key == keycode.TAB))) { 
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

    registerPlugin('menu', Menu);

    $(function () {
        $('[data-trigger="menubar"]').each(function () {
            var that = this,
                nav = navigation($(this));

            $(that).data('nav', nav);
            $(this).on('mouseover', function (event) { mouseNavigation.apply(that, [event]) });
            $(this).on('keyup', function (event) { keyboardNavigation.apply(that, [event]) });
        });
    });

    return Menu;
});