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


})




