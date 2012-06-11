/*
 * === Dialog ===
 *
 * === Markup ===
 * 
 * <a data-trigger="dialog" aria-owns="mydialog">Trigger</a>
 * <div id="mydialog">
 *     <a data-trigger="dialog" aria-owns="mydialog">Close trigger</a>
 * </div>
 *
 * === Javascript ===
 * 
 * var selector = $('#sometrigger')
 * selector.dialog();
 *
 * selector.dialog('open');
 * selector.dialog('close');
 * selector.dialog('toggle');
 *
 * === Events ===
 * 
 * appName.show.dropdown -> raised before the dialog is displayed to the user
 * appName.shown.dropdown -> raised after the dialog is displayed to the user
 * appName.hide.dropdown -> raised before the dialog is hidden from the user 
 * appName.hidden.dropdown -> raised after the dialog is hidden from the user
 *
 */
define(['jquery', 'eve', 'settings',
    'eventHandlers/controlLifecycle', 
    'mixins/dispatcher', 
    'mixins/relativePosition', 
    'mixins/register'], 
    function ($, eve, settings, control, dispatcher, positioning, register) {
        var trigger = '[data-' + settings.pluginAttribute + '="' + settings.pluginIdentifier.dialog + '"]';

        var Dialog = function (element) {
            $(element).on('click', trigger, this.toggle);
        };

        Dialog.prototype = {
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
            var container = eve.arguments[1],
                trigger = $('[' + settings.panelAttribute + '="' + container.attr('id') + '"]'),
                align = (trigger.data('valign') || 'middle'),
                valign = (trigger.data('align') || 'center'),
                pos = positioning($('body'), container);

                pos[align]();
                pos[valign]();
        }

        register(settings.pluginIdentifier.dialog, Dialog);

        $(function () {
            $('body').on('click', trigger, toggle);

            eve.on(settings.appName + '.show.' + settings.pluginIdentifier.dialog, position);
        });

        return Dialog;
});