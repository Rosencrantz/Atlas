define(['jquery', 'eventHandlers/visibilityHandler', 'mixins/panelMixin', 'mixins/relativePositionMixin', 'mixins/registerPluginMixin'], function ($, visibility, panel, positioning, registerPlugin) {
    var trigger = '[data-trigger~="tab"]';

    var Tab = function (element) {
        $(element).delegate(trigger, 'click.tab', this.open);
    };

     Tab.prototype = {
        //Inverts whatever state the container is currently in. If displayed then hide, if hidden then display.        
        open : function (e) {
            open.call(this, e);
        },

        close : function (e) {
            close.call(this, e);
        }
    };

    //Always opens the container, regardless of it's current state
    function open(e) {
        var trigger = $(this),
            panel = trigger.data('panel');

        debugger;
        panel.open();
    }

    //Closes the container, regardless of it's current state
    function close(e) {
        var trigger = $(this),
            panel = trigger.data('panel');

        panel.close();
    }

    registerPlugin.call(this, 'tab', Tab);

    $(function () {
        $('body').delegate(trigger, 'click.tab.data-api', Tab.prototype.open);
    });

    return Tab;
});