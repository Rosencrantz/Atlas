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
        var that = this;
        if(typeof func == "function") {
            func.call(that);
        }

        that.container.trigger('visibility.show');

        setTimeout(function () {
            that.container.trigger('visibility.shown');
        }, 0);

        return false;
    }

    function close(func) {
        var that = this;

        that.container.trigger('visibility.hide');
        
        setTimeout(function () {
            that.container.trigger('visibility.hidden');
        }, 0);
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