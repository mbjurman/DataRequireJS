define(
    [
        "jquery"
    ],
    
    function ($) {

        "use strict";

        var dataRequireModules = [];

        if (!Array.indexOf) {
            Array.prototype.indexOf = function (obj, start) {
                for (var i = (start || 0); i < this.length; i++) {
                    if (this[i] === obj) {
                        return i;
                    }
                }
                return -1;
            };
        }

        function hasDataRequireAttribute(elm) {
            var dataAttr = elm.getAttribute("data-require");
            return dataAttr !== null;
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
                i;

            for (i = 0; i<allElements.length ; i++) {
                var e = allElements[i];
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