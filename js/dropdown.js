/*!
 * Dropdown
 * 
 * We define a dropdown as being a trigger and a container. When the trigger is clicked the container appears.
 * If the trigger is clicked again the container disappears. Clicking outside of the container also causes the 
 * Container to disappear.
 *
 * A container will always appear aligned to the bottom left of the trigger, unless otherwise specified.
 */
define(['jquery', 'eventHandlers/visibilityHandler', 'mixins/relativePositionMixin'], function ($, visibility, positioning, listNavigation) {
    var trigger = '[data-trigger~="dropdown"]',
        settings = {
            dropdownClass : 'aui-dropdown'
        };

    var Dropdown = function (element) {
        $(element).delegate(trigger, 'click.dropdown', this.toggle);
        this.close();
    };

     Dropdown.prototype = {
        //Inverts whatever state the container is currently in. If displayed then hide, if hidden then display.
        toggle : function (e) {
            var container = $('#' + $(this).attr('aria-owns'));

            if (container.is('.' + settings.dropdownClass) && visibility.isHidden(container)) {
                open.call(this, e);
                return false;
            } else {
                close.call(this, e);
            }

            return true;
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
        var trigger = $(this),
            element = $('#' + trigger.attr('aria-owns')),
            position = positioning(trigger, element),
            width = element.outerWidth(),
            offsetLeft = element.offset().left;

        close();

        if (element.is('.' + settings.dropdownClass)) {
            element.css('width', width);

            position.bottom().left().nudge({"top": 0, "left": width});

            if (width + offsetLeft > $(window).width()) {
                position.right();
                element.addClass('aui-right-aligned');
            }
                
            element.trigger('visibility.show');
            trigger.focus();
        }
    }

    //Closes the container, regardless of it's current state
    function close() {
        $('.' + settings.dropdownClass).not('.aui-hide').each(function () {
            $(this).trigger('visibility.hide');
        });
    }

    //jQuery wrapper. Creates the dropdown plugin. Additionally parses the 
    //Dom looking for dropdowns which it will automatically setup
    $.fn.dropdown = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('dropdown');              
            
            !data && $this.data('dropdown', (data = new Dropdown(this)));
            typeof option == 'string' && data[option].call($this);
        });
    }

    $(function () {
        $('html').bind('click.dropdown.data-api', close);
        $('body').delegate(trigger, 'click.dropdown.data-api', Dropdown.prototype.toggle);
    });

    return Dropdown;
});
