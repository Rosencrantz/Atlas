/*
 * === Register (Internal use only)===
 *
 * The register object contains a convienience method which registers an object
 * As a jquery plugin
 *
 *
 * === Javascript ===
 * 
 * register(pluginName, plugin); 
 *
 */
define(['jquery'], function ($) {
    return function _register(pluginName, plugin) {
        $.fn[pluginName] = function (option) {
            return this.each(function () {
                var $this = $(this),
                    data = $this.data(pluginName);              
                
                !data && $this.data(pluginName, (data = new plugin(this)));
                typeof option == 'string' && data[option].call($this);
            });
        }
    }
});

