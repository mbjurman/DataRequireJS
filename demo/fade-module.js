define(
    "fade-module",
    [],
    function() {

        function FadeModule(el) {
            var me = this;
            me.$el = $(el);
        
            me.$content = me.$el.find("p");
            me.$fadeIn = me.$el.find(".fade-in");
            me.$fadeOut = me.$el.find(".fade-out");
            me.opacity = parseInt(me.$content.css("opacity"));
        }

        FadeModule.prototype.init = function() {
            var me = this;

            me.$fadeIn.on("click", function() {
                me.opacity = me.opacity + 0.1;
                me.$content.css("opacity", me.opacity);
            });

            me.$fadeOut.on("click", function() {
                me.opacity = me.opacity - 0.1;
                me.$content.css("opacity", me.opacity);
            });

            return me;
        };

        FadeModule.prototype.dispose = function() {
            this.$grow.off("click");
            this.$shrink.off("click");
        };

        function init() {
            return new FadeModule(this).init();
        }

        return {
            init: init
        };
    }
);