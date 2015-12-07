function resizeImage(evt){
//     evt = jQuery.event.fix(evt);
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

$(function () {
   document.getElementById('watermelon').addEventListener("dragend", resizeImage, false); 
   document.getElementById('watermelon').addEventListener("drag", resizeImage, false); 
});