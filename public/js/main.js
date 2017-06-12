$(function(){

  // to test distance of about section from top
  // var distance = $('#slide01').offset().top;

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





// scroll magic:

  var controller = new ScrollMagic.Controller(); // init scrollMagic

    var pinScene02 = new ScrollMagic.Scene({
      triggerElement: '#slide01',
      triggerHook: 0, // 0 is the top of the viewport, 0.5 is middle and 1 is bottom of view port
      duration: '100%' // user needs to scroll 100% of the view port height to unpin this section.
    })
    .setPin("#slide01 .pin-wrapper") // pass it the ID of the element we want to pin
    .addTo(controller)

        // Scene 2 - pin the third section
    var pinScene03 = new ScrollMagic.Scene({
      triggerElement: '#slide01',
      triggerHook: 0, // 0 is the top of the viewport, 0.5 is middle and 1 is bottom of view port --> this new scene doesn't get pinned until it is at the top of the view port!
      duration: '200%' // user needs to scroll 100% of the view port height to unpin this section.
    })
    .setPin("#slide02 .pin-wrapper") // pass it the ID of the element we want to pin
    .addTo(controller)

    var pinScene04 = new ScrollMagic.Scene({
      triggerElement: '#slide02',
      triggerHook: 0,
      duration: '100%'
    })
    .setPin('#slide03 .pin-wrapper')
    .addTo(controller)




})




