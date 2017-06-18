$(document).ready(function(){
    var $leftEye = $('.left-eye');
    var $rightEye = $('.right-eye');
    var $rightEyebrow = $('.right-eyebrow');
    var $leftEyebrow = $('.left-eyebrow');

    $rightEye.css('transform-origin','50% 50%');
    $leftEye.css('transform-origin','50% 50%');

    var delay = Math.floor(Math.random() * 6000) + 1000;

    function blink(){

        $rightEye.velocity({scaleY : 0.1},{delay:300, duration:0});
        $leftEye.velocity({scaleY : 0.1},{delay:300, duration:0});
        $rightEye.velocity({scaleY : 1},{delay:100, duration:0});
        $leftEye.velocity({scaleY : 1},{delay:100, duration:0});

        $rightEye.velocity({scaleY : 0.1},{delay:100, duration:0});
        $leftEye.velocity({scaleY : 0.1},{delay:100, duration:0});
        $rightEye.velocity({scaleY : 1},{delay:200, duration:0});
        $leftEye.velocity({scaleY : 1},{delay:200, duration:0});

      var blinking = setTimeout(blink,delay);
      delay = delay + 300;
    }
    blink();

    $('svg').on('mouseenter',function(){
      $rightEyebrow.velocity({translateY : -10},{delay:0, duration:300});
      $leftEyebrow.velocity({translateY : 2.5},{delay:0, duration:300});
    });
    $('svg').on('mouseleave',function(){
      $rightEyebrow.velocity({translateY:0},{delay:0, duration:200});
      $leftEyebrow.velocity({translateY:0},{delay:0, duration:200});
    });
  });
