/*
 * === Debugging (internal use only) ===
 *
 * Some basic logging for debugging purposes
 *
 */
define(['jquery', 'settings', 'eve'], function ($, settings, eve) {
	$(function () {
		eve.on(settings.appName + '.*', function () { console.log(eve.arguments[0], eve.arguments[1]); });
	});
});