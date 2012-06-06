define(['jquery', 'settings', 'eventHandlers/controlLifecycle', 'mixins/dispatcher', 'mixins/relativePosition', 'mixins/register'], function ($, settings, control, dispatcher, position, register) {
    var trigger = '[data-' + settings.pluginAttribute + '="tab"]';

    var Tab = function (element) {
        $(element).on('click', trigger, this.open);
    };

     Tab.prototype = {        
        open : function () {
            open.call(this);
        }
    };

    function open() {
        if($(this).is('[' + settings.panelAttribute + ']')) {
            close.call($(this).parents(trigger));
            dispatcher.dispatch.call(this, 'show');
        }
    }

    function close() {
        $('[' + settings.panelAttribute + ']', this).each(function () {
            control.hide($('#' + $(this).attr(settings.panelAttribute)));
        });

        return false;
    }

    register.call(this, 'tab', Tab);

    $(function () {
        $('body').on('click', trigger, function(e) { debugger; Tab.prototype.open.call(e.target); });
    });

    return Tab;
});