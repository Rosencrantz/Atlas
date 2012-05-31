/*!
 * dialog
 * 
 * We define a dialog as being a trigger and a container. When the trigger is clicked the container appears.
 * If the trigger is clicked again the container disappears. Clicking outside of the container also causes the 
 * Container to disappear.
 *
 * A container will always appear aligned to the bottom left of the trigger, unless otherwise specified.
 */
define(['jquery', 'eventHandlers/visibilityHandler', 'mixins/relativePositionMixin'], function ($, visibility, positioning, listNavigation) {
    var trigger = '[data-trigger~="dialog"]',
        settings = {
            dialogClass : 'aui-dialog'
        };

    var Dialog = function (element) {
        $(element).delegate(trigger, 'click.dialog', this.toggle);
        this.close();
    };

     Dialog.prototype = {
        //Inverts whatever state the container is currently in. If displayed then hide, if hidden then display.
        toggle : function (e) {
            var container = $('#' + $(this).attr('aria-owns'));

            if (container.is('.' + settings.dialogClass) && visibility.isHidden(container)) {
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
            position = positioning($(document), element),
            width = element.outerWidth(),
            offsetLeft = element.offset().left;

        close();

        if (element.is('.' + settings.dialogClass)) {
            element.css('width', width);
            position.center().middle();               
            element.trigger('visibility.show');
            trigger.focus();
        }
    }

    //Closes the container, regardless of it's current state
    function close() {
        $('.' + settings.dialogClass).not('.aui-hide').each(function () {
            $(this).trigger('visibility.hide');
        });
    }


    //jQuery wrapper. Creates the dialog plugin. Additionally parses the 
    //Dom looking for dialogs which it will automatically setup
    $.fn.dialog = function (option) {
    	console.log('err');
        return this.each(function () {
            var $this = $(this),
                data = $this.data('dialog');              
            
            !data && $this.data('dialog', (data = new Dialog(this)));
            typeof option == 'string' && data[option].call($this);
        });
    }

    $(document).ready(function () {
        $('body').delegate(trigger, 'click.dialog.data-api', Dialog.prototype.toggle);
    });

    return Dialog;
});
