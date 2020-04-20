/**
 * little orphan animator
 * just fadeIn and fadeOut (for now?), similar to jQuery's
 * but is easily extendable to handle any animation that happens over a set time
 *
 * Uses requestAnimationFrame, so IE10+, or use the polyfill https://gist.github.com/paulirish/1579671
 *
 * see examples at bottom
 *
 * by Todd Zebert
 */

var loa = (function () {
  var loa = {};

  function animateOverTime(dur, cb, fin) {
    var timeStart;
    
    // create closure
    function _animateOverTime(time) {
      if (!timeStart) timeStart = time;
      var timeElapsed = time - timeStart;
      var completion = Math.min(timeElapsed / dur, 1); // cap completion at 1 (100%)
      
      cb(completion);
      
      if (timeElapsed < dur) {
        requestAnimationFrame(_animateOverTime);
      } else {
        if (typeof fin === 'function') fin();
      }
    };
    
    return _animateOverTime;
  }


  loa.fadeOut = function(el, dur, fin) {
    // el.style.opacity = 1; is assumed
    
    // create closure
    var _fadeOut = function(completion) {
      el.style.opacity = 1 - completion;
      if (completion === 1) {
        el.style.display = 'none';
      }
    };
    
    var ani = animateOverTime(dur, _fadeOut, fin);
    requestAnimationFrame(ani); // and go
  }


  loa.fadeIn = function(el, dur, display, fin) {
    // el.style.opacity = 0; is assumed
    el.style.display = display || 'block';
  
    // create closure
    var _fadeIn = function(completion) {
      el.style.opacity = completion; // this is easy since both 0 - 1 decimal
    };
    
    var ani = animateOverTime(dur, _fadeIn, fin);
    requestAnimationFrame(ani); // and go
  }
  
  return loa;
}());

/*
Examples:

var myDiv = document.getElementById('myDiv');
loa.fadeOut(myDiv, 1000, function() { console.log('done'); });
loa.fadeIn(myDiv, 500, 'block', function() { console.log('done'); });
*/