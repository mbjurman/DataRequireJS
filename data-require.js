define(
    function () {

        "use strict";

        var dataRequireModules = [];

        function toArray(nodeList) {
            var array = [];
            for (var i=0 ; i<nodeList.length ; i++) {
                array.push(nodeList[i]);
            }
            return array;
        }

        function hasDataRequireAttribute(element) {
            return element.getAttribute("data-require") !== null;
        }
        
        function initRequiredModules(element) {
            var modules = element.getAttribute("data-require").split(' ');

            require(modules, function () {
                toArray(arguments).map(function(arg) {
                    dataRequireModules.push(arg.init.apply(element));
                });
            });
        }

        function getDataRequireElements(data) {
            var allElements = toArray(data.getElementsByTagName('*')),
                dataRequireElements = [];

            allElements.push(data);

            allElements.map(function(e) {
                if (hasDataRequireAttribute(e)) {
                    dataRequireElements.push(e);
                }
            });

            return dataRequireElements;
        }

        function init(data) {
            var dataRequireElements = getDataRequireElements(data);

            dataRequireElements.map(function(e) {
                initRequiredModules(e);
            });
         }

        function dispose() {
            dataRequireModules.map(function(module){
                if (typeof(module.dispose) === 'function') {
                    module.dispose();
                }
            });

            dataRequireModules = [];
        }

        return {
            init: init,
            dispose: dispose
        };
    }
);