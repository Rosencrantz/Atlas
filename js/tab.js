define(['jquery', 'eventHandlers/visibilityHandler', 'mixins/panelMixin', 'mixins/relativePositionMixin', 'mixins/registerPluginMixin'], function ($, visibility, panel, positioning, registerPlugin) {
    var trigger = '[data-trigger~="tab"]';

    var Tab = function (element) {
        $(element).delegate(trigger, 'click.tab', this.open);
    };

     Tab.prototype = {        
        open : function (e) {
            open.call(this, e);
        }
    };

    function open(e) {
        var trigger = $('[aria-owns]', this),
            panel = $(e.target).data('panel');

        close.call(this);
        panel.open();
    }

    function close(e) {
        var trigger = $('[aria-owns]', this).each(function () {
            var panel = $(this).data('panel');
            panel.close();
        });
    }

    registerPlugin.call(this, 'tab', Tab);

    $(function () {
        $('body').delegate(trigger, 'click.tab.data-api', Tab.prototype.open);
    });

    return Tab;
});