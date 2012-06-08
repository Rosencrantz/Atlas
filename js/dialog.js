define(['jquery', 'eve', 'settings',
    'eventHandlers/controlLifecycle', 
    'mixins/dispatcher', 
    'mixins/relativePosition', 
    'mixins/register'], 
    function ($, eve, settings, control, dispatcher, positioning, register) {
        var trigger = '[data-' + settings.pluginAttribute + '="dialog"]';

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

        register('dialog', Dialog);

        $(function () {
            $('body').on('click', trigger, toggle);

            eve.on(settings.appName + '.show.dialog', position);
        });

        return Dialog;
});