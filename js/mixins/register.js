define(['jquery'], function ($) {
    return function (pluginName, plugin) {
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

