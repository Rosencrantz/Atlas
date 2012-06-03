define(['jquery', 'eventHandlers/visibilityHandler', 'mixins/registerPluginMixin'], function ($, visibility, registerPlugin) {
    var trigger = '[aria-owns]';

    var Panel = function (element) {
        this.container = $('#' + element.attr('aria-owns'));
    };

    Panel.prototype = {
        open : function (func) {
            open.call(this, func);
        },
        close : function (func) {
            close.call(this, func);
        }
    };

    function open(func) {
        if(typeof func == "function") {
            func.call(this);
        }

        this.container.trigger('visibility.show');
        return false;
    }

    function close(func) {
        this.container.trigger('visibility.hide');
    }

    registerPlugin('panel', Panel);
    
    $(function () {
        $('[aria-owns]').each(function () {
            var that = $(this),
                panel = new Panel(that);

            that.data('panel', panel);
        });
    });

    return Panel;
});