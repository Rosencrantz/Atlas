define(['jquery', 'eve', 'settings', 'mixins/navigationMixin', 'mixins/keycodeMixin','mixins/registerPluginMixin'], function ($, eve, settings, navigation, keycode, registerPlugin) {
    var trigger = '[data-trigger="menubar"]';

    var Menubar = function (element) {
        var element = $(element),
            nav = navigation($(element));

        element.data('nav', nav);
        element.on('mouseover', this.keyboardNavigation);
        element.on('keyup', this.mouseNavigation);
    };

    //Provide suitable keyboard navigation for the specified container
    function keyboardNavigation (event) { 
        var key = event.keyCode,
            shiftKey = event.shiftKey,
            nav = $(this).data('nav');

        event.preventDefault();

        if(key && (key == keycode.RIGHT || (!shiftKey && key == keycode.TAB))) {
            if(nav.activeIndex() == nav.length()-1) {
                nav.clear();
                $('#' + nav.container().attr('aria-flowto')).data('nav').first();
            } else {
                nav.next();
            }
        }

        if(key && (key == keycode.LEFT || (shiftKey && key == keycode.TAB))) { 
            if(nav.activeIndex() > 0) {
                nav.previous();
            } else {
               $('[aria-flowto="' + nav.container().attr('id') + '"]').data('nav').last(); 
            }
        }
        
        return this;
    }

    function mouseNavigation(event, container, index) {
        var nav = $(container).data('nav');
        event.type == "mouseenter" && nav.move(index);
    }

    registerPlugin('menubar', Menu);
    
    $(function () {
        $('[data-trigger="menubar"]').each(function () {
            var that = $(this),
                nav = navigation(that);

            that.data('nav', nav);
            that.on('keyup', function (event) { keyboardNavigation.apply(that, [event]) });
            that.on('mouseleave', function () { $(this).data('nav').clear() });

            for(var i=0, ii=that.children().length; i < ii; i++) {
                activeItem = $(that.children()[i]);
                activeItem.on('mouseenter', function (item, container, index) { return function(event) { mouseNavigation.apply(item, [event, container, index]) } }(activeItem, that, i));
            }
        });
    });

    return Menubar;
});
