$(function(){

  // to test distance of about section from top
  // var distance = $('#slide01').offset().top;
  let $window = window;
  // link scrolling
  $('a[href^="#"]').on('click', function(event) {
    var $target = $(this.getAttribute('href'));
    // console.log("***** ", target)
    if( $target.length ) {
      event.preventDefault();
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


  // Blogger posts

  function findImg(str){
    let imgContent = str.slice(str.indexOf('<img'))
        imgContent = imgContent.slice(0, imgContent.indexOf('>'))
        imgContent = imgContent.slice(imgContent.indexOf('src="'))
        imgContent = imgContent.slice(5)
        imgContent = imgContent.slice(0, imgContent.indexOf('"'))
    return imgContent
  }

  function formatDate(x){
    let nums = x.slice(0, x.indexOf('T'))
    console.log(nums)
    return `${nums.slice(5, 7)} / ${nums.slice(8)} / ${nums.slice(0, 4)}`
  }


  function handleResponse(response){

    let image, url, title, author, date;

    let content = response.items[0].content
    let imgContent = findImg(content)
    title = response.items[0].title
    url = response.items[0].url
    author = response.items[0].author.displayName;
    date = formatDate(response.items[0].published)


    document.getElementById('post1').style.backgroundImage = imgContent === '' ? `url('img/stock.png')` : `url("${image}")`

    $('#post1').click(function(){
      window.location = `${url}`
    })
    $('#blog-title').text(`${title}`)
    $('#blogpost-author').text(`${author}`)
    $('#blogpost-date').text(`${date}`)
  }

  $.get("https://www.googleapis.com/blogger/v3/blogs/905598030170974301/posts?callback=handleResponse&key=AIzaSyBKlnzrE10UrA-90id4JfkwYa830CyzGAM")
  .then(data => {
    let dataObj = JSON.parse(data.slice(31, -2))
    handleResponse(dataObj)
  })

})




