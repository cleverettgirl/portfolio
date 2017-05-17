// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
(function(){
    var controller = new ScrollMagic.Controller();
    var aboutController = new ScrollMagic.Controller();

    var aboutScene = new ScrollMagic.Scene({
      triggerElement: '#about',
      triggerHook: 'onLeave',
      duration: $(window).height(),
      offset: $("#about").scrollTop()
    })
    .setPin('.about.chapter-title')
    .addIndicators()
    .addTo(controller

    // var aboutSceneImg = new ScrollMagic.Scene({
    //   triggerElement: '#about',
    //   triggerHook: 'onLeave',
    //   duration: $(window).height(),
    //   offset: $("#about").scrollTop()
    // })
    // .setPin('img')
    // .addIndicators()
    // .addTo(aboutController);

    var workScene = new ScrollMagic.Scene({
      triggerElement: '#work',
      triggerHook: 'onLeave',
      duration: $('.chapter-content').height(),
      offset: $('#work').scrollTop()
    })
    .setPin('.work.chapter-title')
    .addIndicators()
    .addTo(controller);


})();
