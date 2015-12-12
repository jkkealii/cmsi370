(function ($) {
    /**
     * Tracks a box as it is rubberbanded or moved across the drawing area.
     */
    var trackDrag = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            // Don't bother if we aren't tracking anything.
            if (touch.target.movingBox) {
                var priorOffset = touch.target.movingBox.offset();
                var potLeft = touch.pageX - touch.target.deltaX;
                var potTop = touch.pageY - touch.target.deltaY;
                
                // make sure we are within the boundaries
                if (potTop < touch.target.boxOffset.top) {
                    potTop = touch.target.boxOffset.top;
                }
                if (potLeft < touch.target.boxOffset.left) {
                    potLeft = touch.target.boxOffset.left;
                }
                if (potTop + touch.target.height > touch.target.boxOffset.top + touch.target.boxHeight) {
                    potTop = touch.target.boxOffset.top + touch.target.boxHeight - touch.target.height;
                }
                if (potLeft + touch.target.width > touch.target.boxOffset.left + touch.target.boxWidth) {
                    potLeft = touch.target.boxOffset.left + touch.target.boxWidth - touch.target.width;
                }
                // Reposition the object.
                touch.target.movingBox.offset({
                    left: potLeft,
                    top: potTop
                });
                
                var timePassed = event.timeStamp - touch.target.priorTime;
                
                touch.target.YVelocity = (potTop - priorOffset.top) / timePassed;
                touch.target.XVelocity = (potLeft - priorOffset.left) / timePassed;
                
                touch.target.priorTime = event.timeStamp;
            }
        });

        // Don't do any touch scrolling.
        event.preventDefault();
    };
    
    var flick = function (element, acc) {
        if (!element.isMoved) {
            var priorOffset = element.movingBox.offset();
            var potTop = priorOffset.top + (element.YVelocity * 13);
            var potLeft = priorOffset.left + (element.XVelocity * 13);

            if (potTop < element.boxOffset.top) {
                potTop = element.boxOffset.top;
                element.YVelocity *= -0.981;
            }
            if (potLeft < element.boxOffset.left) {
                potLeft = element.boxOffset.left;
                element.XVelocity *= -0.981;
            }
            if (potTop + element.height > element.boxOffset.top + element.boxHeight) {
                potTop = element.boxOffset.top + element.boxHeight - element.height;
                element.YVelocity *= -0.981;
            }
            if (potLeft + element.width > element.boxOffset.left + element.boxWidth) {
                potLeft = element.boxOffset.left + element.boxWidth - element.width;
                element.XVelocity *= -0.981;
            }
            // Reposition the object.
            element.movingBox.offset({
                left: potLeft,
                top: potTop
            });
            element.YVelocity -= (acc.y * 0.0333);
            element.XVelocity += (acc.x * 0.0333);
        }    
    }
    
    var trackFlick = function (event, element) {
        element.each(function (index, coco) {
            flick(coco, event.accelerationIncludingGravity);
        });
        event.preventDefault();
    }
    
    var initialiseVelocity = function (element) {
        element.YVelocity = 0.00;
        element.XVelocity = 0.00;
    }

    /**
     * Concludes a drawing or moving sequence.
     */
    var endDrag = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            if (touch.target.movingBox) {
                // Change state to "not-moving-anything" by clearing out
                // touch.target.movingBox.
                // touch.target.movingBox = null;
                touch.target.isMoved = false;
            }
        });
    };

    /**
     * Indicates that an element is unhighlighted.
     */
    var unhighlight = function () {
        $(this).removeClass("box-highlight");
    };

    /**
     * Begins a box move sequence.
     */
    var startMove = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            // Highlight the element.
            $(touch.target).addClass("box-highlight");

            // Take note of the box's current (global) location.
            var jThis = $(touch.target),
                startOffset = jThis.offset();

            // Set the drawing area's state to indicate that it is
            // in the middle of a move.
            // touch.target.movingBox = jThis;
            touch.target.deltaX = touch.pageX - startOffset.left;
            touch.target.deltaY = touch.pageY - startOffset.top;
            
            // Height and width of target (box)
            touch.target.height = jThis.height();
            touch.target.width = jThis.width();
            touch.target.isMoved = true;
            
            // Store the measurements of the boundaries
/*
            touch.target.boxHeight = $(touch.target).parent().height();
            touch.target.boxWidth = $(touch.target).parent().width();
            touch.target.boxOffset = $(touch.target).parent().offset();
*/
        });

        // Eat up the event so that the drawing area does not
        // deal with it.
        event.stopPropagation();
    };

    /**
     * Sets up the given jQuery collection as the drawing area(s).
     */
    var setDrawingArea = function (jQueryElements) {
        // Set up any pre-existing box elements for touch behavior.
        jQueryElements
            .addClass("drawing-area")
            
            // Event handler setup must be low-level because jQuery
            // doesn't relay touch-specific event properties.
            .each(function (index, element) {
                element.addEventListener("touchmove", trackDrag, false);
                element.addEventListener("touchend", endDrag, false);
            })
            
            .find("div.box").each(function (index, element) {
                element.addEventListener("touchstart", startMove, false);
                element.addEventListener("touchend", unhighlight, false);
                element.movingBox = $(element);
                element.boxOffset = $(jQueryElements).offset();
                element.boxHeight = $(jQueryElements).height();
                element.boxWidth = $(jQueryElements).width();
                element.height = $(element).height();
                element.width = $(element).width();
                initialiseVelocity(element);
            });
            
        jQueryElements
            .find("div.circleBase").each(function (index, element) {
                element.addEventListener("touchstart", startMove, false);
                element.addEventListener("touchend", unhighlight, false);
                element.movingBox = $(element);
                element.boxOffset = $(jQueryElements).offset();
                element.boxHeight = $(jQueryElements).height();
                element.boxWidth = $(jQueryElements).width();
                element.height = $(element).height();
                element.width = $(element).width();
                initialiseVelocity(element);
            });
        window.addEventListener("devicemotion", function (event) {
            trackFlick(event, jQueryElements.find("div.box"));
        }, true);
        window.addEventListener("devicemotion", function (event) {
            trackFlick(event, jQueryElements.find("div.circleBase"));
        }, true);
    };

    $.fn.boxesTouch = function () {
        setDrawingArea(this);
    };
}(jQuery));
