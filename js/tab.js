/*
 * === Tabs ===
 *
 * Tabs can be described as a collection of panels with a trigger associated with each. If a trigger is 
 * activated then the associated panel is displayed (hiding all other panels). There is always one panel
 * open.
 *
 * === Markup ===
 * <div id="myTab" data-trigger="tab">
 *     <a aria-owns="panel1">Panel 1 trigger</a>
 *     <a aria-owns="panel2">Panel 2 trigger</a>
 *     <a aria-owns="panel3">Panel 3 trigger</a>
 *     <div id="panel1">Panel 1</div>
 *     <div id="panel2">Panel 2</div>
 *     <div id="panel3">Panel 3</div>
 * </div>
 *
 * === Javascript ===
 * 
 * Note: In this example the selector is assumed to contain the appropriate 
 * triggers and panels.
 *
 * var selector = $('#myTab');
 * selector.tab();
 *
 * === Events ===
 * 
 * appName.show.tab -> raised before the panel is displayed to the user
 * appName.shown.tab -> raised after the panel is displayed to the user
 * appName.hide.tab -> raised before the panel is hidden from the user 
 * appName.hidden.dtab -> raised after the panel is hidden from the user
 *
 */
define(['jquery', 'settings', 'eventHandlers/controlLifecycle', 'mixins/dispatcher', 'mixins/relativePosition', 'mixins/register'], function ($, settings, control, dispatcher, position, register) {
    var trigger = '[data-' + settings.pluginAttribute + '="' + settings.pluginIdentifier.tab + '"]';

    var Tab = function (element) {
        $(element).on('click', trigger, this.open);
    };

     Tab.prototype = {        
        open : function () {
            return open.call(this);
        }
    };

    function open() {
        if($(this).is('[' + settings.panelAttribute + ']')) {
            close.call($(this).parents(trigger));
            dispatcher.dispatch.call(this, 'show');
        }
    }

    function close() {
        $('[' + settings.panelAttribute + ']', this).each(function () {
            control.hide($('#' + $(this).attr(settings.panelAttribute)));
        });
    }

    register.call(this, settings.pluginIdentifier.tab, Tab);

    $(function () {
        $('body').on('click', trigger, function(e) { e.preventDefault(); return Tab.prototype.open.call(e.target); });
    });

    return Tab;
});