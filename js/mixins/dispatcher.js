/* 
 * === Dispatcher (internal use only) ===
 *
 * Simple object that executes events against the scoped container. There are a finite number of events that can
 * be called. These are:
 * 
 * show             <- Generates show/shown events
 * hide             <- Generates hide/hidden events 
 * activate         <- Generates activate/activated events
 * deactivate       <- Generates deactivate/deactivated events
 * enable           <- Generates enable/enabled events
 * disable          <- Generates disable/disabled events
 *
 * === Javascript ===
 * This function should be called within the scope of the the trigger meaning that when executed, this should
 * evaluate to the trigger.
 *
 * dispatcher.dispatch(event)
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