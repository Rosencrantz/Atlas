/*!
 * Dropdown
 * 
 * We define a dropdown as being a trigger and a container. When the trigger is clicked the container appears.
 * If the trigger is clicked again the container disappears. Clicking outside of the container also causes the 
 * Container to disappear.
 *
 * A container will always appear aligned to the bottom left of the trigger, unless otherwise specified.
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

    //jQuery wrapper. Creates the dropdown plugin. Additionally parses the 
    //Dom looking for dropdowns which it will automatically setup
    /*$.fn.dropdown = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('dropdown');              
            
            !data && $this.data('dropdown', (data = new Dropdown(this)));
            typeof option == 'string' && data[option].call($this);
        });
    }*/
    registerPlugin('dropdown', Dropdown);

    $(function () {
        $('html').on('click.dropdown.data-api', close);
        $('body').on('click.dropdown.data-api', trigger, Dropdown.prototype.toggle);
    });

    return Dropdown;
});