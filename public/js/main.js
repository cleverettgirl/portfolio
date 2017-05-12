$(function(){

  // to test distance of about section from top
  var distance = $('section#about').offset().top;

  // link scrolling
  $('a[href^="#"]').on('click', function(event) {
    var $target = $(this.getAttribute('href'));
    // console.log("***** ", target)
    if( $target.length ) {
        // event.preventDefault();
        $('html, body').stop().animate({
          // .stop() -> stops any current animation on 'html' and 'body'
            scrollTop: $target.offset().top
            // offset() -> the .offset() method allows us to retrieve the current position of an element (specifically its border box, which excludes margins)
            // top tells us to bring it all the way to the top. if we had a navbar or didn't want it all the wy at the top, could add `- 80` at the end (or whatever #).

        }, 1000);
    }
  });

  // when we get to about, want to disable scrolling, until the chapter-content goes all the way to the bottom. then resume scrolling.
  var stopScroll = function(){
    $(window).scroll(function(){
      if($(this).scrollTop() >= distance){
        console.log(distance);
        console.log("HOORAY")
        disableScroll();
      }
    })
  }


})



  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
  }

  function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
          preventDefault(e);
          return false;
      }
  }

  function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
  }

  function enableScroll() {
      if (window.removeEventListener)
          window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.onmousewheel = document.onmousewheel = null;
      window.onwheel = null;
      window.ontouchmove = null;
      document.onkeydown = null;
  }
