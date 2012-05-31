/*!
 * popover
 * 
 * We define a popover as being a trigger and a container. When the trigger is clicked the container appears.
 * If the trigger is clicked again the container disappears. Clicking outside of the container also causes the 
 * Container to disappear.
 *
 * A container will always appear aligned to the bottom left of the trigger, unless otherwise specified.
 */
define(['jquery', 'eventHandlers/visibilityHandler', 'mixins/relativePositionMixin'], function ($, visibility, positioning, listNavigation) {
    var trigger = '[data-trigger~="popover"]',
        settings = {
            popoverClass : 'aui-popover'
        };

    var Popover = function (element) {
        $(element).delegate(trigger, 'click.popover', this.toggle);
        this.close();
    };

     Popover.prototype = {
        //Inverts whatever state the container is currently in. If displayed then hide, if hidden then display.
        toggle : function (e) {
            var container = $('#' + $(this).attr('aria-owns'));

            if (container.is('.' + settings.popoverClass) && visibility.isHidden(container)) {
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

        if (element.is('.' + settings.popoverClass)) {
            element.css('width', width);
            position.right().middle();               
            element.trigger('visibility.show');
            trigger.focus();
        }
    }

    //Closes the container, regardless of it's current state
    function close() {
        $('.' + settings.popoverClass).not('.aui-hide').each(function () {
            $(this).trigger('visibility.hide');
        });
    }


    //jQuery wrapper. Creates the popover plugin. Additionally parses the 
    //Dom looking for popovers which it will automatically setup
    $.fn.popover = function (option) {
    	console.log('err');
        return this.each(function () {
            var $this = $(this),
                data = $this.data('popover');              
            
            !data && $this.data('popover', (data = new Popover(this)));
            typeof option == 'string' && data[option].call($this);
        });
    }

    $(document).ready(function () {
        //$('body').delegate(trigger, 'mouseover.popover.data-api', open);
        //$('body').delegate(trigger, 'mouseout.popover.data-api', close);
        $('body').delegate(trigger, 'click.popover.data-api', Popover.prototype.toggle);
        $('html').bind('click.popover.data-api', close);
    });

    return Popover;
});
