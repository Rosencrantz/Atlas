/*
 * === Helptip ===
 *
 * === Markup ===
 * 
 * <a data-trigger="helptip" aria-owns="myhelptip">Trigger</a>
 * <div id="myhelptip">Container</div>
 *
 * === Javascript ===
 * 
 * var selector = $('#somehelptip')
 * selector.helptip();
 *
 * selector.helptip('open');
 * selector.helptip('close');
 * selector.helptip('toggle');
 *
 * === Events ===
 * 
 * appName.show.helptip -> raised before the panel is displayed to the user
 * appName.shown.helptip -> raised after the panel is displayed to the user
 * appName.hide.helptip -> raised before the panel is hidden from the user 
 * appName.hidden.helptip -> raised after the panel is hidden from the user
 *
 */
define(['jquery', 'eve', 'settings',
    'eventHandlers/controlLifecycle', 
    'mixins/dispatcher', 
    'mixins/relativePosition', 
    'mixins/register'], 
    function ($, eve, settings, control, dispatcher, positioning, register) {
        var trigger = '[data-' + settings.pluginAttribute + '="helptip"]';

        var Helptip = function (element) {
            $(element).on('click', trigger, this.toggle);
        };

        Helptip.prototype = {
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

            return !isHidden;
        }

        function position() {
            var container = eve.arguments[1],
                trigger = $('[' + settings.panelAttribute + '="' + container.attr('id') + '"]'),
                align = (trigger.data('valign') || 'middle'),
                valign = (trigger.data('align') || 'farRight'),
                pos = positioning(trigger);

                pos[align]();
                pos[valign]();
        }

        register('helptip', Helptip);

        $(function () {
            $('body').on('click', close);
            $('body').on('click', trigger, toggle);

            eve.on(settings.appName + '.show.helptip', position);
        });

        return Helptip;
});