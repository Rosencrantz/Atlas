define(['jquery', 'eve', 'settings',
    'eventHandlers/controlLifecycle', 
    'mixins/panelMixin', 
    'mixins/relativePositionMixin', 
    'mixins/registerPluginMixin'], 
    function ($, eve, settings, control, panel, positioning, registerPlugin) {
        var trigger = '[data-' + settings.pluginAttribute + '="dialog"]';

        var Dropdown = function (element) {
            $(element).on('click.dialog', trigger, this.toggle);
        };

         Dropdown.prototype = {
            toggle : function (e) {
                var that = $(this),
                    container = $('#' + that.attr(settings.panelAttribute)),
                    isHidden = control.isHidden(container);

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
            var container = eve.arguments[1],
                trigger = $('[' + settings.panelAttribute + '="' + container.attr('id') + '"]'),
                panel = trigger.data('panel'),
                position = positioning(trigger);
                position.center().middle();
        }

        registerPlugin('dropdown', Dropdown);

        $(function () {
            $('html').on('click.dropdown', close);
            $('body').on('click.dropdown', trigger, Dropdown.prototype.toggle);

            eve.on(settings.appName + '.show.dialog', position);

        });

        return Dropdown;
});