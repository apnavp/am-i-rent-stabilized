// code credit: http://jsfiddle.net/rvuayqeo/1/
//& http://stackoverflow.com/questions/15084675/how-to-implement-swipe-gestures-for-mobile-devices

var app = app || {};

app.swipe = (function(w,d){
  return function(el,func) {
      swipe_det = {};
      swipe_det.sX = 0;
      swipe_det.sY = 0;
      swipe_det.eX = 0;
      swipe_det.eY = 0;
      var min_x = 20;  //min x swipe for horizontal swipe
      var max_x = 40;  //max x difference for vertical swipe
      var min_y = 40;  //min y swipe for vertical swipe
      var max_y = 50;  //max y difference for horizontal swipe
      var direc = "";
      ele = d.getElementsByClassName(el);
      function detectSwipe(e) {
        e.preventDefault();
      }
      // ele = d.getElementById(el);
      for (var i=0; i<ele.length; i++) {
        ele[i].addEventListener('touchstart',function(e){
          var t = e.touches[0];
          swipe_det.sX = t.screenX; 
          swipe_det.sY = t.screenY;
        },false);
        ele[i].addEventListener('touchmove',function(e){
          e.preventDefault();
          var t = e.touches[0];
          swipe_det.eX = t.screenX; 
          swipe_det.eY = t.screenY;    
        },false);
        ele[i].addEventListener('touchend',function(e){
          //horizontal detection
          if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
            if(swipe_det.eX > swipe_det.sX) direc = "r";
            else direc = "l";
          }
          //vertical detection
          if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x)))) {
            if(swipe_det.eY > swipe_det.sY) direc = "d";
            else direc = "u";
          }
      
          if (direc != "") {
            if(typeof func == 'function') func(el,direc);
          }
          direc = "";
        },false);  
      }      
    };

    // sample code...
    // function myfunction(el,d) {
    //   alert("you swiped on element with id '"+el+"' to "+d+" direction");
    // }

    // detectswipe('swipeme',myfunction);

})(window, document);