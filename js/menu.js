/*!
 * Dropdown
 * 
 * We define a dropdown as being a trigger and a container. When the trigger is clicked the container appears.
 * If the trigger is clicked again the container disappears. Clicking outside of the container also causes the 
 * Container to disappear.
 *
 * A container will always appear aligned to the bottom left of the trigger, unless otherwise specified.
 */
define(['jquery', 'mixins/navigationMixin'], function ($, navigation) {
    var trigger = '[data-trigger="menu"]';

    var Menu = function (element) {
        var nav = navigation(element);
        $(element).delegate('mousedown.menu', this.keyboardNavigation);
        $(element).delegate('keydown.menu', this.mouseNavigation);
        this.close();
    };

    function keyboardNavigation () { console.log('foo');}
    function mouseNavigation() { console.log('bar');}

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

    $('[aria-role="menu"]').each(function () {
        $(this).delegate('mouseover.menu.data-api', console.log('meh'));
        $(this).delegate('mouseover.menu.data-api', console.log('moh'));
    });

    return Menu;
});
