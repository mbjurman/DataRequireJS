define(
    function () {

        "use strict";

        var dataRequireModules = [];

        function hasDataRequireAttribute(elm) {
            return elm.getAttribute("data-require") !== null;
        }
        
        function initRequiredModules(el) {

            var modulesToRequire = el.getAttribute("data-require"),
                modules = modulesToRequire.split(' ');

            require(modules, function () {
                var i;

                for (i = 0; i < arguments.length; i++) {
                    dataRequireModules.push(arguments[i].init.apply(el));
                }
            });
        }

        function getElementsWithDataRequireAttribute(data) {
            var allElements = data.getElementsByTagName('*'),
                dataRequireElements = [],
                i,
                e;

            for (i = 0; i < allElements.length; i++) {
                e = allElements[i];

                if (hasDataRequireAttribute(e)) {
                    dataRequireElements.push(e);
                }
            };

            return dataRequireElements;
        }

        function init(data) {
            var elements = getElementsWithDataRequireAttribute(data);

            var i;
            for (i = 0; i < elements.length; i++) {
                initRequiredModules(elements[i], function (e) {
                    elements.splice(elements.indexOf(e), 1);
                });
            }
         }

        function dispose() {
            var length = dataRequireModules.length;
            
            while (length--) {

                if (dataRequireModules[length] !== undefined && dataRequireModules[length] !== null && typeof dataRequireModules[length].dispose === "function") {
                    dataRequireModules[length].dispose();
                }
                
                dataRequireModules.splice(length, 1);
            }
        }

        return {
            init: init,
            dispose: dispose
        };
    }
);