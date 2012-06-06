/* 
 * === Dispatcher (internal use only) ===
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