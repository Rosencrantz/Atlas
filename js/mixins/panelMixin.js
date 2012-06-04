define(['jquery', 'eve', 'settings','eventHandlers/visibilityHandler', 'mixins/registerPluginMixin'], function ($, eve, settings,visibility, registerPlugin) {

    var Panel = function (element) {
        this.trigger = $(element);
        this.container = $('#' + element.attr(settings.panelAttribute));
    };

    Panel.prototype = {
        open : function () {
            dispatch.call(this, 'show', 'shown', false);
        },
        close : function () {
            dispatch.call(this, 'hide', 'hidden', true);
        }
    };

    function dispatch(pre, post, ret) {
        var that = this,
            triggerName = that.trigger.data(settings.pluginAttribute);

        if(typeof func == "function") {
            func.call(that);
        }

        eve(['atlas', pre, triggerName, 'panel'].join('.'), that.container);

        setTimeout(function () {
            eve(['atlas', post, triggerName, 'panel'].join('.'), that.container);
        }, 0);

        return ret;        
    }

    registerPlugin('panel', Panel);
    
    $(function () {
        $('[' + settings.panelAttribute + ']').each(function () {
            var that = $(this),
                panel = new Panel(that);

            that.data('panel', panel);
        });
    });

    return Panel;
});