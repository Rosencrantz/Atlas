/*
 * === Dropdown ===
 *
 * A dropdown is a trigger that when clicked, displays a container below and aligned to the left edge
 * of the trigger. The container can be any element on the page and can contain any markup as long as 
 * the aria-owns values matches the id of the container.
 *
 * === Markup ===
 * 
 * <a data-trigger="dropdown" aria-owns="container">Trigger</a>
 * <div id="container">Container</div>
 *
 * === Javascript ===
 * 
 * var selector = $('<a data-trigger="dropdown" aria-owns="container">Trigger</a>')
 * selector.dropdown();
 *
 * selector.dropdown('open');
 * selector.dropdown('close');
 * selector.dropdown('toggle');
 *
 * === Events ===
 * 
 * appName.show.dropdown -> raised before the panel is displayed to the user
 * appName.shown.dropdown -> raised after the panel is displayed to the user
 * appName.hide.dropdown -> raised before the panel is hidden from the user 
 * appName.hidden.dropdown -> raised after the panel is hidden from the user
 *
 */
define(['jquery', 'eve', 'settings',
    'eventHandlers/visibility', 
    'mixins/panelMixin', 
    'mixins/relativePositionMixin', 
    'mixins/registerPluginMixin'], 
    function ($, eve, settings, visibility, panel, positioning, registerPlugin) {
        var trigger = '[data-' + settings.pluginAttribute + '="dropdown"]';

        var Dropdown = function (element) {
            $(element).on('click', trigger, this.toggle);
        };

        Dropdown.prototype = {
            toggle : function (e) {
                open.call(this, e);
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

        function toggle(e) {
            var that = $(this),
                container = $('#' + that.attr(settings.panelAttribute)),
                isHidden = visibility.isHidden(container);

            if(isHidden) {                
                open.call(this, e);
            } else {
                close.call(this, e);
            }

            return !isHidden;
        }

        function position(e) {
            var container = eve.arguments[1],
                trigger = $('[' + settings.panelAttribute + '="' + container.attr('id') + '"]'),
                panel = trigger.data('panel'),
                position = positioning(trigger);

                position.bottom().left().nudge({'left' : panel.container.outerWidth()});
        }

        registerPlugin('dropdown', Dropdown);

        $(function () {
            $('html').on('click', close);
            $('body').on('click', trigger, toggle);

            eve.on(settings.appName + '.show.dropdown', position);
        });

        return Dropdown;
});