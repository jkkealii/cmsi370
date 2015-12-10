(function ($) {
    /**
     * Tracks a box as it is rubberbanded or moved across the drawing area.
     */
    var trackDrag = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            // Don't bother if we aren't tracking anything.
            if (touch.target.movingBox) {
                var potLeft = touch.pageX - touch.target.deltaX;
                var potTop = touch.pageY - touch.target.deltaY;
                
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
            }
        });

        // Don't do any touch scrolling.
        event.preventDefault();
    };

    /**
     * Concludes a drawing or moving sequence.
     */
    var endDrag = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            if (touch.target.movingBox) {
                // Change state to "not-moving-anything" by clearing out
                // touch.target.movingBox.
                touch.target.movingBox = null;
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
            touch.target.movingBox = jThis;
            touch.target.deltaX = touch.pageX - startOffset.left;
            touch.target.deltaY = touch.pageY - startOffset.top;
            
            // Height and width of target (box)
            touch.target.height = jThis.height();
            touch.target.width = jThis.width();
            
            // Store the measurements of the boundaries
            touch.target.boxHeight = $(touch.target).parent().height();
            touch.target.boxWidth = $(touch.target).parent().width();
            touch.target.boxOffset = $(touch.target).parent().offset();
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
            });
            
        jQueryElements
            .find("div.circleBase").each(function (index, element) {
                element.addEventListener("touchstart", startMove, false);
                element.addEventListener("touchend", unhighlight, false);
            });
    };

    $.fn.boxesTouch = function () {
        setDrawingArea(this);
    };
}(jQuery));
