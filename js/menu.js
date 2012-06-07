/*
 * === Menu ===
 *
 * The menu is a small addition that provides vertical navigation via the up and down arrow keys.
 *
 * === Markup ===
 * 
 * <div data-trigger="menu">
 *     <a href="">Item 1</a>
 *     <a href="">Item 2</a>
 * </div>
 *
 * <ul data-trigger="menu">
 *     <li><a href="">Item 1</a></li>
 *     <li><a href="">Item 2</a></li>
 * </ul>
 * 
 * === Javascript ===
 *
 * TBC
 *
 * === Events ===
 * 
 * appName.activate.menu -> raised before an item in the menu is made active
 * appName.activated.menu -> raised after an item in the menu is made active
 * appName.deactivate.menu -> raised before an item in the menu is made deactive
 * appName.deactivated.menu -> raised after an item in the menu is made deactive
 *
 */
define(['jquery', 'eve', 'settings', 'mixins/navigation', 'mixins/keycodes','mixins/register'], function ($, eve, settings, navigation, keycode, register) {
    var trigger = '[' + settings.pluginAttribute + '="menu"]';

    var Menu = function (element) {
        var element = $(element),
            nav = navigation($(element));

        element.data('nav', nav);
        element.on('mouseover', this.keyboardNavigation);
        element.on('keydown keypress', function(event) { event.preventDefault(); });
        element.on('keyup', this.mouseNavigation);
    };

    //Provide suitable keyboard navigation for the specified container
    function keyboardNavigation (event) { 
        var key = event.keyCode,
            shiftKey = event.shiftKey,
            nav = $(this).data('nav'),
            previousMenu = $('[aria-flowto="' + nav.container().attr('id') + '"]').data('nav'),
            nextMenu = $('#' + nav.container().attr('aria-flowto')).data('nav');

        event.preventDefault();

        if(key && (key == keycode.DOWN || (!shiftKey && key == keycode.TAB))) {
            if(nav.activeIndex() == nav.length()-1) {
                nav.clear();
                if(nextMenu) {
                    nextMenu.first();
                } else {
                    nav.move(nav.length()-1);
                }
            } else {
                nav.next();
            }
        }

        if(key && (key == keycode.UP || (shiftKey && key == keycode.TAB))) { 
            if(nav.activeIndex() > 0) {
                nav.previous();
            } else {
                if(previousMenu) {
                    previousMenu.last();
                } else {
                    nav.move(0);
                } 
            }
        }
        
        return this;
    }

    function mouseNavigation(event, container, index) {
        var nav = $(container).data('nav');
        event.type == "mouseenter" && nav.move(index);
    }

    register('menu', Menu);
    
    $(function () {
        $('[data-' + settings.pluginAttribute + '="menu"]').each(function () {

            var that = $(this),
                nav = navigation(that);

            that.data('nav', nav);
            that.on('keydown keypress', function(event) { event.preventDefault(); });
            that.on('keyup', function (event) { keyboardNavigation.apply(that, [event]) });
            that.on('mouseleave', function () { $(this).data('nav').clear() });

            for(var i=0, ii=that.children().length; i < ii; i++) {
                activeItem = $(that.children()[i]);
                activeItem.on('mouseenter', function (item, container, index) { return function(event) { mouseNavigation.apply(item, [event, container, index]) } }(activeItem, that, i));
            }
        });
    });

    return Menu;
});