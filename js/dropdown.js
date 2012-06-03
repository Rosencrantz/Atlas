/*!
 * Dropdown
 * 
 * Markup
 * 
 * <a data-trigger="dropdown" aria-owns="container">Trigger</a>
 * <div id="container">Container</div>
 *
 * Javascript
 *
 * $('<a data-trigger="dropdown" aria-owns="container">Trigger</a>').dropdown();
 *
 * A dropdown is a trigger that, when clicked, displays a container below and aligned to the left edge
 * of the trigger. The container can be any element on the page, and can contain any markup as long as 
 * the aria-owns values matches the id of the container.
 */
define(['jquery', 'eventHandlers/visibilityHandler', 'mixins/panelMixin', 'mixins/relativePositionMixin', 'mixins/registerPluginMixin'], function ($, visibility, panel, positioning, registerPlugin) {
    var trigger = '[data-trigger~="dropdown"]';

    var Dropdown = function (element) {
        $(element).on('click.dropdown', trigger, this.toggle);
        pop = element;
    };

     Dropdown.prototype = {
        //Inverts whatever state the container is currently in. If displayed then hide, if hidden then display.
        toggle : function (e) {
            var that = $(this),
                container = $('#' + that.attr('aria-owns')),
                isHidden = visibility.isHidden(container);

            if(isHidden) {                
                open.call(this, e);
            } else {
                close.call(this, e);
            }

            return !isHidden;
        },
        
        open : function (e) {
            open.call(this, e);
        },

        close : function (e) {
            close.call(this, e);
        }
    };

    //Always opens the container, regardless of it's current state
    function open(e) {
        var element = $(this),
            panel = element.data('panel');
        
        debugger;
        panel.open(function () {
            var position = positioning(panel.container);
            position.bottom().left().nudge({"left" : panel.container.outerWidth()});
        });
    }

    //Closes the container, regardless of it's current state
    function close(e) {
        $(trigger).each(function () {
            var that = $(this),
                panel = that.data('panel');

            panel.close();   
        });
        return false;
    }

    registerPlugin('dropdown', Dropdown);

    $(function () {
        $('html').on('click.dropdown.data-api', close);
        $('body').on('click.dropdown.data-api', trigger, Dropdown.prototype.toggle);
    });

    return Dropdown;
});