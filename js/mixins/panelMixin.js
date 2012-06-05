/* 
 * === Panel (internal use only) ===
 *
 * Panel is an internal convienence object for handling the visibility of trigger/container style plugins.
 * Panel iterates over the dom and finds all instances of 'panelAttribute' (aria-owns is the default) for
 * each of these it creates a new panel object which it attaches to the trigger element as a data-attribute.
 * 
 * Panel objects are used in plugins like the dropdown for displaying the panel on click/keydown etc. Calling 
 * panel.show or panel.hide generates events that can then be hooked by the plugin to add extra functionality 
 * such as positioning or validation.
 *
 * === Markup ===
 * 
 * <a aria-owns="panel">Trigger</a>
 * <div id="panel">Panel</div>
 *
 * === Javascript ===
 *
 * var panel = Panel(element);
 * panel.open();
 * panel.close();
 *
 * === Events ===
 * 
 * appName.show.pluginName.panel
 * appName.shown.pluginName.panel
 * appName.hide.pluginName.panel
 * appName.hidden.pluginName.panel
 * 
 */ 
define(['jquery', 'eve', 'settings','eventHandlers/controlLifecycle', 'mixins/registerPluginMixin'], function ($, eve, settings, control, registerPlugin) {

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