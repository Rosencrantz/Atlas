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
define(['jquery', 'eve', 'settings', 'eventHandlers/controlLifecycle'], function ($, eve, settings, control) {
    return {
        dispatch : function _dispatch(eventName) {
            var trigger = $(this),
                triggerName = trigger.data(settings.pluginAttribute),
                container = $('#' + trigger.attr(settings.panelAttribute)),
                events = {
                    show : { pre : 'show', post : 'shown'},
                    hide : { pre : 'hide', post : 'hidden'},
                    activate : { pre : 'activate', post : 'activated'},
                    deactivate : {pre : 'deactivate', post : 'deactivated'},
                    enable : {pre : 'enable', post : 'enabled'},
                    disable : {pre : 'disable', post : 'disabled'}
                };

            eve([settings.appName, events[eventName].pre, triggerName, 'panel'].join('.'), container);

            setTimeout(function () {
                eve([settings.appName, events[eventName].post, triggerName, 'panel'].join('.'), container);
            }, 0);        
        }
    }
});