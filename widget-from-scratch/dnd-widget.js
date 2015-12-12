/*
NOTE: DUE TO CROSS-BROWSER COMPATIBILITY ISSUES, I WAS FORCED TO MAKE A DECISION. BECAUSE EACH BROWSER
    HAS DIFFERENT WAYS OF REPRESENTING THE MOUSE POSITION, I HAD TO CHOOSE A BROWSER WHERE THIS PLUGIN
    WOULD WORK. I CHOSE GOOGLE CHROME. BE WARY.
*/
(function ($) {
    function resizeImage(evt){
    //  evt = jQuery.event.fix(evt);
    /*
        newX = evt.clientX || evt.pageX || evt.screenX || evt.offsetX || evt.x || evt.layerX;
        newY = evt.clientY || evt.pageY || evt.screenY || evt.offsetY || evt.y || evt.layerY;
    */
        newX = evt.clientX || evt.pageX || evt.screenX;
        newY = evt.clientY || evt.pageY || evt.screenY;
        id = evt.target.id;
        eval("document."+id+".width=newX");
        eval("document."+id+".height=newY");
        
        console.log(newX + " " + newY);
        console.log(evt);
    }

/*
    document.getElementById('watermelon').addEventListener("dragend", resizeImage, false); 
    document.getElementById('watermelon').addEventListener("drag", resizeImage, false);
*/ 
    $.fn.resizeImage = function () {
        $(".image").each(function(index, element){
            element.addEventListener("dragend", resizeImage, false); 
            element.addEventListener("drag", resizeImage, false);
        })
    };
}(jQuery));
