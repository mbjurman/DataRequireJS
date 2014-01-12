(function() {

	var insertedElement = null;
	var requiredModules = [];

	// This is a module that will be required in the test
	var moduleA = function() {
		function ModuleA(el) {
			insertedElement = el;
		}

		function init() {
			return new ModuleA(this);
		}

		return {
			init: init
		};
	};

	// this is a fake implementation of require that will be called by data-require to load 
	// module a
	var requireStubName = "require-stub";
	define(requireStubName, [], function() { 
		return function(modules, callback) {
			requiredModules = modules;
			callback(moduleA());
		}
	});
	
	// Mock the dependency to require 
	require.config({
		baseUrl: 'src/',
		map: {
	        '*': {
	            req: requireStubName
	        }
	    }
	});

	require(["data-require"], function(sut) {

		describe("data-require", function() {
			it("can load one module", function() {
				var el = document.createElement();
				el.setAttribute("data-require", "a");

				sut.init(el);

				expect(requiredModules.length).toBe(1);
				expect(requiredModules[0]).toBe("a");
			});

			it("can load multiple modules", function() {
				var el = document.createElement();
				el.setAttribute("data-require", "a b c");

				sut.init(el);

				expect(requiredModules.length).toBe(3);
				expect(requiredModules[0]).toBe("a");
				expect(requiredModules[1]).toBe("b");
				expect(requiredModules[2]).toBe("c");
			});

			it("inserts correct element to loaded modules", function() {
				var el = document.createElement();
				el.setAttribute("data-require", "a");
				el.className = "b";

				sut.init(el);

				expect(insertedElement.className).toBe("b");
			});
		});	
	});
})();