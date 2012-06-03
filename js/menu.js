/*!
 * Menu
 *
 * Add keyboard navigation to your menus. Provides vertical navigation using the up/down tab/shift+tab keys
 * Supports moving between multiple menus through the the use of the aria-flowto attribute. 
 */
define('menu',['jquery', 'mixins/navigationMixin', 'mixins/keycodeMixin','mixins/registerPluginMixin'], function ($, navigation, keycode, registerPlugin) {
    var trigger = '[data-trigger="menu"]';

    var Menu = function (element) {
        var element = $(element),
            nav = navigation($(element));

        element.data('nav', nav);
        element.on('mouseover', this.keyboardNavigation);
        element.on('keydown', this.mouseNavigation);
    };

    //Provide suitable keyboard navigation for the specified container
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

    registerPlugin('menu', Menu);
    
    $(function () {
        $('[data-trigger="menu"]').each(function () {
            var that = $(this),
                nav = navigation(that);

            that.data('nav', nav);
            that.on('mouseover', function (event) { mouseNavigation.apply(that, [event]) });
            that.on('keyup', function (event) { keyboardNavigation.apply(that, [event]) });
        });
    });

    return Menu;
});
