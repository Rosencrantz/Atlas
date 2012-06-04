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
 * var selector = $('<a data-trigger="dropdown" aria-owns="container">Trigger</a>')
 * selector.dropdown();
 *
 * selector.dropdown('open');
 * selector.dropdown('close');
 * selector.dropdown('toggle');
 *
 * A dropdown is a trigger that when clicked, displays a container below and aligned to the left edge
 * of the trigger. The container can be any element on the page and can contain any markup as long as 
 * the aria-owns values matches the id of the container.
 */
define(['jquery', 
    'eventHandlers/visibilityHandler', 
    'mixins/panelMixin', 
    'mixins/relativePositionMixin', 
    'mixins/registerPluginMixin'], 
    function ($, visibility, panel, positioning, registerPlugin) {
        var trigger = '[data-trigger~="dropdown"]';

        var Dropdown = function (element) {
            $(element).on('click.dropdown', trigger, this.toggle);
            pop = element;
        };

         Dropdown.prototype = {
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

        function open(e) {
            var element = $(this),
                panel = element.data('panel');
            
            panel.open();
        }

        function close(e) {
            $(trigger).each(function () {
                var that = $(this),
                    panel = that.data('panel');

                panel.close();   
            });
            return false;
        }

        function position(e) {
            var container = $(e.target),
                trigger = $('[aria-owns="' + container.attr('id') + '"]'),
                panel = trigger.data('panel'),
                position = positioning(trigger);

                debugger;
                position.bottom().left().nudge({"left" : panel.container.outerWidth()});
        }

        registerPlugin('dropdown', Dropdown);

        $(function () {
            $('html').on('click.dropdown.data-api', close);
            $('body').on('visibility.show', position);
            $('body').on('click.dropdown.data-api', trigger, Dropdown.prototype.toggle);
        });

        return Dropdown;
});