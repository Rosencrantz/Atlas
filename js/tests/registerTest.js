require(['mixins/register'], function (register) {
	var menu,
		navigation;

	module("Register plugin tests", {
		setup : function () {
			var TestPlugin = function _TestPlugin() {

			}

			TestPlugin.prototype = {
				test : function _test() {
					$('#qunit-fixture').text('testplugin.test')
				}
			}

			register('testplugin', TestPlugin);
		},
		
		teardown : function () {
			$.testplugin = undefined;
		}
	});

	test("The register function is created", function () {
		equal(typeof register, "function");
	});

	test("Passing a name and function to the register plugin creates a jquery plugin", function () {
		ok($('body').testplugin());
	});

	test("Passing an argument to a registered plugin will cause the appropriate function to be executed", function () {
		$('body').testplugin('test');
		equal($('#qunit-fixture').text(), 'testplugin.test');
	})
});