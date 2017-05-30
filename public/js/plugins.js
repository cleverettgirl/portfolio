// Avoid `console` errors in browsers that lack a console.
// (function() {
//     var method;
//     var noop = function () {};
//     var methods = [
//         'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
//         'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
//         'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
//         'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
//     ];
//     var length = methods.length;
//     var console = (window.console = window.console || {});

//     while (length--) {
//         method = methods[length];

//         // Only stub undefined methods.
//         if (!console[method]) {
//             console[method] = noop;
//         }
//     }
// }());

// Place any jQuery/helper plugins in here.
$(function(){
    const controller = new ScrollMagic.Controller();

    const aboutScene = new ScrollMagic.Scene({
      triggerElement: '#about',
      triggerHook: 'onCenter',
      duration: $('.text').height() * .83, // until bottom of '.text' enters screen.
      offset: $("#about").scrollTop()
    })
    .setPin('.about.chapter-title')
    .addIndicators()
    .addTo(controller);

    const workScene = new ScrollMagic.Scene({
      triggerElement: '#work',
      triggerHook: 'onCenter',
      duration: $('.projects').height() * .83,
      offset: $('#work').scrollTop()
    })
    .setPin('.work.chapter-title')
    .addIndicators()
    .addTo(controller);

    const scale_tween = TweenMax.to("#riddikulus", 1, {
      ease: Linear.easeNone
    })

    const bg_tween = TweenMax.to("#snakes", 1, {
      ease:Linear.easeNone
    })

    const scale_scene = new ScrollMagic.Scene({
      triggerElement: "#riddikulus"
    })
    .setTween(scale_tween);

    const bg_scene = new ScrollMagic.Scene({
      triggerElement: "#snakes"
    })
    .setTween(bg_tween);

    controller.addScene([scale_scene, bg_scene]);


});
