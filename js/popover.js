define(['jquery', 'eve', 'settings',
    'eventHandlers/controlLifecycle', 
    'mixins/dispatcher', 
    'mixins/relativePosition', 
    'mixins/register'], 
    function ($, eve, settings, control, dispatcher, positioning, register) {
        var trigger = '[data-' + settings.pluginAttribute + '="popover"]';

        var Popover = function (element) {
            $(element).on('click', trigger, this.toggle);
        };

        Popover.prototype = {
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

            return false;
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
                align = (trigger.data('valign') || 'above'),
                valign = (trigger.data('align') || 'center'),
                pos = positioning(trigger);

                pos[align]();
                pos[valign]();
        }

        register('popover', Popover);

        $(function () {
            $('body').on('mouseleave', trigger, close);
            $('body').on('mouseenter', trigger, open);

            eve.on(settings.appName + '.show.popover', position);
        });

        return Popover;
});