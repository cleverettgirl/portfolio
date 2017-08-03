$(function(){
  // to test distance of about section from top
  // var distance = $('#slide01').offset().top;
  const $window = $(window)
  // link scrolling
  $('a[href^="#"]').on('click', function(event) {
    const $target = $(this.getAttribute('href'))
    // console.log("***** ", target)
    if( $target.length ) {
      event.preventDefault();
      $('html, body').stop().animate({
        // .stop() -> stops any current animation on 'html' and 'body'
          scrollTop: $target.offset().top
          // offset() -> the .offset() method allows us to retrieve the current position of an element (specifically its border box, which excludes margins)
          // top tells us to bring it all the way to the top. if we had a navbar or didn't want it all the wy at the top, could add `- 80` at the end (or whatever #).
      }, 1000)
    }
  })


  $window.on('scroll resize', function () {

    const $about = $('#aboutSlide')
        , $aboutContent = $('#about-content')
        , $aboutHeader = $('#about-header')
        , $contact = $('#contactSlideOuter')
        , $contactText = $('#contact-text')
        , $contactHeader = $('#contact-header')

    //#about
    let aboutTop = $about.offset().top
      , aboutBottom = $about.height() + aboutTop
      , aboutHeaderTop = $aboutContent.height() - $window.height()

    // $contact
    let contactTop = $contact.offset().top
      , contactBottom = $contact.height() + contactTop
      , contactHeaderTop = $contactText.height() - $window.height()

    //window
    let windowTop = $window.scrollTop()
      , windowBottom = $window.height() + windowTop

    if($window.width() >= 768){
      if (windowBottom > aboutBottom) {
        $aboutHeader.removeClass('fixed-header')
        $aboutHeader.css('top', aboutHeaderTop)
        $aboutContent.removeClass('float-right')
      }
      else if (windowTop > aboutTop) {
        $aboutHeader.addClass('fixed-header');
        $aboutHeader.css('top', 0);
          $aboutContent.addClass('float-right');
      }
      else {
        $aboutHeader.removeClass('fixed-header');
        $aboutHeader.css('top', 0);
        $aboutContent.removeClass('float-right');
      }

      if(windowBottom > contactBottom){
        $contact.removeClass('fixed-header');
        $contact.css('top', contactHeaderTop)
        // $contact.removeClass('float-right');
      }

      else if (windowTop > contactTop) {
        $contactHeader.addClass('fixed-header');
        $contactHeader.css('top', 0);
        $contactText.addClass('float-right');
      }
      else {
        $contactHeader.removeClass('fixed-header');
        $contactHeader.css('top', 0);
        $contactText.removeClass('float-right');
      }
    }

    if($window.width() < 768){
      controller.enabled(false)
      $('#menuToggle').css('visibility', 'visible')
    }
    else{
      controller.enabled(true)
      $('#menuToggle').css('visibility', 'hidden')
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
    return `${nums.slice(5, 7)} / ${nums.slice(8)} / ${nums.slice(0, 4)}`
  }

  function handleResponse(response){
    let image
      , url
      , title
      , author
      , date
      , content = response.items[0].content
      , imgContent = findImg(content)

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
    $('#read-more').attr('href', `${url}`)
  }

  $.get("https://www.googleapis.com/blogger/v3/blogs/905598030170974301/posts?callback=handleResponse&key=AIzaSyDBW5kUdiR1AndhWteFJwmDEJnjkrXNepA")
    .then(data => {
      let dataObj = JSON.parse(data.slice(31, -2))
      handleResponse(dataObj)
    })

  $(".menu-nav-link").click(function(){
    $("input[type=checkbox]").click()
  })

  function link_is_external(link_element){
    return(link_element.host !== window.location.host);
  }

  function link_kne(a){
    let $a = $(a)
    if($a[0].id === 'kneCode'){
      a.click()
    }
    if($a[0].id === 'kneDemo'){
      a.click()
    }
  }

  if($window.width() >= 768) {
    document.addEventListener('click',
    ({clientX, clientY}) => Array.from($('a'))
      .map(a => ({a, box: a.getBoundingClientRect()}))
      .filter(({box}) =>
              clientX >= box.left &&
              clientX <= box.right &&
              clientY >= box.top &&
              clientY <= box.bottom)
      .filter(({a}) =>  {
        if(link_is_external(a)){
          if($(a)[0].id.startsWith('kne')) link_kne(a)
          else a.click()
        }
        else{
          a.click()
        }
      }))
  }

})
