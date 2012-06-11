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
    'eventHandlers/controlLifecycle', 
    'mixins/dispatcher', 
    'mixins/relativePosition', 
    'mixins/register'], 
    function ($, eve, settings, control, dispatcher, positioning, register) {
        var trigger = '[data-' + settings.pluginAttribute + '="dropdown"]';

        var Dropdown = function _Dropdown(element) {
            $(element).on('click', trigger, this.toggle);
        };

        Dropdown.prototype = {
            toggle : function () {
                toggle.call(this)
            },
            
            open : function () {
                open.call(this);
                
            },

            close : function () {
                close.call(this);
            }
        };

        function open() {
            dispatcher.dispatch.call(this, 'show');
        }

        function close() {
            $(trigger).each(function () {
                control.hide('#' + $(this).attr(settings.panelAttribute));
            });
        }

        function toggle() {
            var that = $(this),
                container = $('#' + that.attr(settings.panelAttribute)),
                isHidden = control.isHidden(container);

            close.call(this);
            isHidden && open.call(this);

            return false;
        }

        function position() {
            var container = $(this),
                trigger = $('[' + settings.panelAttribute + '="' + container.attr('id') + '"]'),
                align = (trigger.data('valign') || 'below'),
                valign = (trigger.data('align') || 'left'),
                pos = positioning(trigger);

                pos[align]();
                pos[valign]();
        }

        register('dropdown', Dropdown);

        $(function () {
            $(document).on('click', function () { close() });
            $('body').on('click', trigger, toggle);

            eve.on(settings.appName + '.show.dropdown', position);
        });

        return Dropdown;
});