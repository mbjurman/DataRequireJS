define(
    "size-module",
    function() {

        function SizeModule(el) {
            var me = this;
            me.$el = $(el);
        
            me.$content = me.$el.find("p");
            me.$grow = me.$el.find(".grow");
            me.$shrink = me.$el.find(".shrink");
            me.fontSize = parseInt(me.$content.css("font-size"));
        }

        SizeModule.prototype.init = function() {
            var me = this;

            me.$grow.on("click", function() {
                me.fontSize = me.fontSize + 3;
                me.$content.css("font-size", me.fontSize + "px");
            });

            me.$shrink.on("click", function() {
                me.fontSize = me.fontSize - 3;
                me.$content.css("font-size", me.fontSize + "px");
            });

            return me;
        };

        SizeModule.prototype.dispose = function() {
            this.$grow.off("click");
            this.$shrink.off("click");
        };

        function init() {
            return new SizeModule(this).init();
        }

        return {
            init: init
        };
    }
);