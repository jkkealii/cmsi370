/*
NOTE: DUE TO CROSS-BROWSER COMPATIBILITY ISSUES, I WAS FORCED TO MAKE A DECISION. BECAUSE EACH BROWSER
    HAS DIFFERENT WAYS OF REPRESENTING THE MOUSE POSITION, I HAD TO CHOOSE A BROWSER WHERE THIS PLUGIN
    WOULD WORK. I CHOSE GOOGLE CHROME. BE WARY.
*/ // JD: 2
(function ($) {
    function resizeImage(evt){ // JD: 4
    //  evt = jQuery.event.fix(evt); // JD: 3
    /*
        newX = evt.clientX || evt.pageX || evt.screenX || evt.offsetX || evt.x || evt.layerX;
        newY = evt.clientY || evt.pageY || evt.screenY || evt.offsetY || evt.y || evt.layerY;
    */
        newX = evt.clientX || evt.pageX || evt.screenX; // JD: 6
        newY = evt.clientY || evt.pageY || evt.screenY; // JD: 6
        
        eval(evt.target.id+".width=newX"); // JD: 5
        eval(evt.target.id+".height=newY"); // JD: 5
        
        console.log(newX + " " + newY);
        console.log(evt);
    }

/* // JD: 3
    document.getElementById('watermelon').addEventListener("dragend", resizeImage, false); 
    document.getElementById('watermelon').addEventListener("drag", resizeImage, false);
*/ 
    $.fn.resizeImage = function () {
        $(".image").each(function(index, element){ // JD: 7
            element.addEventListener("dragend", resizeImage, false); 
            element.addEventListener("drag", resizeImage, false);
        })
    };
}(jQuery));
