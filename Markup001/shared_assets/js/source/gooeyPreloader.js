/*
 * Gooey Preloader
 * Requires jquery.js & TweenMax.js
 */
$(function() {
    gooPreloader();

    function gooPreloader() {
        var $gooDot = $(".gooPreloader > .goo-dot"),
            $indicatorDots = $(".goo-dot");
        TweenMax.to($gooDot, 0.6, {
            scale: 0.5,
            ease: Back.easeOut,
            onComplete: function() {
                var filter = "url(#goo)";
                $(".gooPreloader").css({
                    webkitFilter: filter,
                    mozFilter: filter,
                    filter: filter,
                });
            }
        });
        $indicatorDots.each(function(i) {
            startCircleAnim($(this), 45, 0.1, 1 + (i * 0.2), 1.1 + (i * 0.3));
        })

        function setupCircle($obj) {
            if (typeof($obj.data("circle")) == "undefined") {
                $obj.data("circle", {
                    radius: 0,
                    angle: 0
                });

                function updateCirclePos() {
                    var circle = $obj.data("circle");
                    TweenMax.set($obj, {
                        x: Math.cos(circle.angle) * circle.radius,
                        y: Math.sin(circle.angle) * circle.radius,
                    })
                    requestAnimationFrame(updateCirclePos);
                }
                updateCirclePos();
            }
        }

        function startCircleAnim($obj, radius, delay, startDuration, loopDuration) {
            setupCircle($obj);
            $obj.data("circle").radius = 0;
            $obj.data("circle").angle = 0;
            TweenMax.to($obj.data("circle"), startDuration, {
                delay: delay,
                radius: radius,
                ease: Quad.easeInOut
            });
            TweenMax.to($obj.data("circle"), loopDuration, {
                delay: delay,
                angle: Math.PI * 2,
                ease: Linear.easeNone,
                repeat: -1
            });
        }
    }
})