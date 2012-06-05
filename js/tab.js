define(['jquery', 'settings', 'mixins/panelMixin', 'mixins/relativePositionMixin', 'mixins/registerPluginMixin'], function ($, settings, panel, positioning, registerPlugin) {
    var trigger = '[data-' + settings.pluginAttribute + '="tab"]';

    var Tab = function (element) {
        $(element).delegate(trigger, 'click.tab', this.open);
    };

     Tab.prototype = {        
        open : function (e) {
            open.call(this, e);
        }
    };

    function open(e) {
        var trigger = $('[' + settings.panelAttribute + ']', this),
            panel = $(e.target).data('panel');

        close.call(this);
        panel.open();
    }

    function close(e) {
        var trigger = $('['+ settings.panelAttribute + ']', this).each(function () {
            var panel = $(this).data('panel');
            panel.close();
        });
    }

    registerPlugin.call(this, 'tab', Tab);

    $(function () {
        $('body').on('click.tab', trigger, Tab.prototype.open);
    });

    return Tab;
});