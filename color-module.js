define(
    "color-module",
    function() {

        function ColorModule(el) {
            var me = this;
            me.$el = $(el);
        
            me.$content = me.$el.find("p");
            me.$black = me.$el.find(".black");
            me.$white = me.$el.find(".white");
            me.$purple = me.$el.find(".purple");
        }

        ColorModule.prototype.init = function() {
            var me = this;

            me.$black.on("click", function() {
                me.$content.css("color", "black");
            });

            me.$white.on("click", function() {
                me.$content.css("color", "white");
            });

            me.$purple.on("click", function() {
                me.$content.css("color", "purple");
            });

            return me;
        };

        ColorModule.prototype.dispose = function() {
            this.$black.off("click");
            this.$white.off("click");
            this.$purple.off("click");
        };

        function init() {
            return new ColorModule(this).init();
        }

        return {
            init: init
        };
    }
);