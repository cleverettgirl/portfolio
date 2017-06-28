$(function(){

  // to test distance of about section from top
  // var distance = $('#slide01').offset().top;
  let $window = window;
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


// MAKE WORK & ABOUT SECTION STICKY
  $(window).on('scroll resize', function () {

    const $about = $('#aboutSlide'),
          $aboutContent = $('#about-content'),
          $window = $(window),
          $aboutHeader = $('#about-header')

    //#about
    let aboutTop = $about.offset().top;
    let aboutBottom = $about.height() + aboutTop;
    let aboutHeaderTop = $aboutContent.height() - $window.height();

    //window
    let windowTop = $window.scrollTop();
    let windowBottom = $window.height() + windowTop;

    if (windowBottom > aboutBottom) {
      $aboutHeader.removeClass('fixed-header');
      $aboutHeader.css('top', aboutHeaderTop);
    }
    else if (windowTop > aboutTop) {
      $aboutHeader.addClass('fixed-header');
      $aboutHeader.css('top', 0);
    }
    else {
      $aboutHeader.removeClass('fixed-header');
      $aboutHeader.css('top', 0);
    }

  });


  // Init ScrollMagic
  var controller = new ScrollMagic.Controller();

  // Scene 1 - pin the second section
  var pinScene01 = new ScrollMagic.Scene({
    triggerElement: '#slides01',
    triggerHook: 0,
    duration: '100%'
  })
  .setPin('#slides01 .pin-wrappers')
  .addTo(controller);

  // Scene 2 - pin the third section
  var pinScene02 = new ScrollMagic.Scene({
    triggerElement: '#slides01',
    triggerHook: 0,
    duration: '200%'
  })
  .setPin('#slides02 .pin-wrappers')
  .addTo(controller);

  // Scene 3 - pin the fourth section
  var pinScene03 = new ScrollMagic.Scene({
    triggerElement: '#slides02',
    triggerHook: 0,
    duration: '100%'
  })
  .setPin('#slides03 .pin-wrappers')
  .addTo(controller);

})




