define(
    [
        "data-require"
    ], 
    function(dataRequire) {

        function AjaxLoaderModule(el) {
            var me = this;
            me.$el = $(el);
        
            me.$load = me.$el.find(".load");
        }

        AjaxLoaderModule.prototype.init = function() {
            var me = this;

            me.$load.on("click", function() {
                $.ajax("http://localhost/color-module.html")
                    .done(function(data) {
                        var $data = $(data);
                        $("body").append($data);
                        dataRequire.init($data.get(0));
                    }
                );
            });

            return me;
        };

        AjaxLoaderModule.prototype.dispose = function() {
            this.$load.off("click");
        };

        function init() {
            return new AjaxLoaderModule(this).init();
        }

        return {
            init: init
        };
    }
);