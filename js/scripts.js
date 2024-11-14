/*================
 Template Name: AppBeats App Landing Page Template
 Description: AppBeats is app and product landing page template.
 Version: 1.0
 Author: https://themeforest.net/user/themetags
=======================*/

// TABLE OF CONTENTS
// 1. preloader
// 2. fixed navbar
// 3. closes the responsive menu on menu item click
// 4. back to top
// 5. magnify popup video
// 6. magnify gallery popup
// 7. client-testimonial one item carousel
// 8. client logo item carousel
// 9. wow js
// 10. Screenshots slider
// 11. countdown or coming soon

function toastMessage(type, message) {
	let background = "";
	if(type == 'success') {
		background = 'linear-gradient(to right, #00b09b, #96c93d)';
	}else if (type == 'error') {
		background = 'linear-gradient(to right, #ff5f6d, #ffc371)';
	}

	let options = {
	    text: message,
	    duration: 5000,
	    close: true,
	    style: {
	        background: background,
	    },
	    offset: {x:0, y: 70},
	};
	Toastify(options).showToast();
}

jQuery(function ($) {
	'use strict';
  
	const windowHeight = () => {
	    const doc = document.documentElement;
	    doc.style.setProperty('--window-height', `${window.innerHeight}px`);
	}
	window.addEventListener('resize', windowHeight);
	windowHeight();
	
	$("input[type=text].not-allow-zoom, textarea.not-allow-zoom").on({ 'touchstart' : function() {
		zoomDisable();
	}});
	$("input[type=text].not-allow-zoom, textarea.not-allow-zoom").on({ 'touchend' : function() {
		setTimeout(zoomEnable, 500);
	}});
	
	function zoomDisable(){
		$('head meta[name=viewport]').remove();
		$('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0" />');
	}
	function zoomEnable(){
		$('head meta[name=viewport]').remove();
		$('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=1" />');
	}

	// 1. preloader
	$(window).ready(function () {
		$(window).trigger('scroll');
		$('#preloader').delay(200).fadeOut('fade');
	});
  
	$(document).on('click', '.btn-show-timeline-modal', function(){
		$('#biiTimelineModal').modal('show');
	});
  
	lazyload();
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
	const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

	
	$(document).on('show.bs.modal', '.modal', function(e){
		var scrollbarSize = window.innerWidth - $('html')[0].clientWidth;
		if(scrollbarSize){
			$('html').css('overflow', 'hidden');
			$('nav,html,header').css('padding-right', scrollbarSize + 'px');
		}
	});
	
	$(document).on('hidden.bs.modal', '.modal', function(e){
		$('html').css('overflow', 'auto');
		$('nav,html,header').css('padding-right', '0');
	});
	
	$(document).on('show.bs.offcanvas', '.offcanvas', function(e){
		var scrollbarSize = window.innerWidth - $('html')[0].clientWidth;
		if(scrollbarSize){
			$('html').css('overflow', 'hidden');
			$('nav,html,header').css('padding-right', scrollbarSize + 'px');
		}
	});
	$(document).on('hidden.bs.offcanvas', '.offcanvas', function(e){
		$('html').css('overflow', 'auto');
		$('nav,html,header').css('padding-right', '0');
	});
  // 2. fixed navbar
  $(window).on('scroll', function () {
    // checks if window is scrolled more than 500px, adds/removes solid class
    if ($(this).scrollTop() > 58) {
      $('.navbar').addClass('affix');
      //$('.scroll-to-target').addClass('open');
    } else {
      $('.navbar').removeClass('affix');
      //$('.scroll-to-target').removeClass('open');
    }
  });

  // 2. page scrolling feature - requires jQuery Easing plugin
  $(function () {
    $(document).on('click', 'a.page-scroll', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 58
      }, 600, 'easeInOutExpo');
      event.preventDefault();
    });
  });
  
  $(document).on('click', ".menu .dropdown > a", function(e) {
  	e.preventDefault();
  });


  // 4. back to top
  //if ($('.scroll-to-target').length) {
  //  $(".scroll-to-target").on('click', function () {
  //    var target = $(this).attr('data-target');
  //    // animate
  //    $('html, body').animate({
  //      scrollTop: $(target).offset().top
  //    }, 500);

  //  });
  //}

  // 7. client-testimonial one item carousel
  $('.client-testimonial').owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    dots: false,
    responsiveClass: true,
    autoplay: true,
    autoplayHoverPause: true,
    lazyLoad: true,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 1
      },
      600: {
        items: 2
      },
      800: {
        items: 2
      },
      1200: {
        items: 3
      }
    }
  });

    // 8. client logo item carousel
  $('.clients-carousel').owlCarousel({
    autoplay: true,
    loop: true,
    margin: 15,
    dots: false,
    slideTransition: 'linear',
    autoplayTimeout: 4500,
    autoplayHoverPause: true,
    autoplaySpeed: 4500,
    responsive: {
      0: {
        items: 2
      },
      500: {
        items: 3
      },
      600: {
        items: 4
      },
      800: {
        items: 5
      },
      1200: {
        items: 6
      }

    }
  });


  // 9. wow js
  function wowAnimation() {
    new WOW({
      offset: 100,
      mobile: true
    }).init()
  }

  wowAnimation()

  // 10. Screenshots slider
  $('.screen-carousel').owlCarousel({
    loop: true,
    margin: 0,
    center: true,
    dots: true,
    nav: false,
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 3
      },
      991: {
        items: 4
      },
      1200: {
        items: 4
      },
      1920: {
        items: 4
      }
    }
  });

}); // JQuery end