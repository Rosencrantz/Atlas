/*!
 * Dropdown
 * 
 * We define a dropdown as being a trigger and a container. When the trigger is clicked the container appears.
 * If the trigger is clicked again the container disappears. Clicking outside of the container also causes the 
 * Container to disappear.
 *
 * A container will always appear aligned to the bottom left of the trigger, unless otherwise specified.
 */
define('menu',['jquery', 'mixins/navigationMixin', 'mixins/keycodeMixin'], function ($, navigation, keycode) {
    var trigger = '[data-trigger="menu"]',
        nav;

    var Menu = function (element) {
        nav = navigation($(element));
        $(element).on('mouseover', this.keyboardNavigation);
        $(element).on('keydown', this.mouseNavigation);
        console.log(element);
    };

    function keyboardNavigation (nav, event) { 
        var key = event.keyCode;
        key && key == keycode.DOWN && nav.next();
        key && key == keycode.UP && nav.previous();
    }

    function mouseNavigation(nav, event) { console.log('bar');}

    Menu.prototype = {
    }

    //jQuery wrapper. Creates the dropdown plugin. Additionally parses the 
    //Dom looking for dropdowns which it will automatically setup
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
            $(this).on('keydown', function (nav) { return function (event) { keyboardNavigation.apply(that, [nav, event]) } }(nav));
            $(this).on('focusin', $(this), function () { console.log('focus') });
            $(this).on('focusout', $(this), function () { console.log('blur') });
        });
    });

    return Menu;
});