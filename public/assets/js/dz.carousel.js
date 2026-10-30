/**
	Template Name 	 : W3Grocery
	Author			 : DexignZone
	Version			 : 1.0
	File Name		 : dz.carousel.js
	Author Portfolio : https://themeforest.net/user/dexignzone/portfolio
	
	Core script to handle the entire theme and core functions
	
**/

/* JavaScript Document */
// React recreates page nodes on navigation. Reuse scripts, initialize each new node.
window.VMenuCarousels = (function () {
  function init() {
    if (typeof window.Swiper !== 'function') return [];
    var instances = [];
    function createSwiper(selector, options) {
      var matches = Array.from(document.querySelectorAll(selector)).map(function (element) {
        var instance = element.swiper;
        if (!instance || instance.destroyed) instance = new window.Swiper(element, options);
        else instance.update();
        instances.push(instance);
        return instance;
      });
      return matches.length === 1 ? matches[0] : matches;
    }
    'use strict';
	
    // Get Started ==========
    if(jQuery('.get-started').length > 0){
		var swiperGetStarted = createSwiper('.get-started', {
			speed: 1500,
			parallax: true,
			slidesPerView: "auto",
			spaceBetween: 0,
			autoplay: true,
			loop:false,
			pagination: {
                el: ".swiper-pagination",
                clickable: true,
			},
		});
	}
	
	if(jQuery('.recomand-swiper').length > 0){
		var swiperRecomandSwiper = createSwiper('.recomand-swiper', {
			speed: 500,
			parallax: true,
			slidesPerView: 1.2,
			spaceBetween: 10,
            centeredSlides: true,
			loop: true,
			navigation: {
				nextEl: '.swiper-btn-next',
				prevEl: '.swiper-btn-prev',
            },
			pagination: {
                el: ".swiper-pagination",
                clickable: true,
			},
			breakpoints: {
				1024: {
				  slidesPerView: 3,
				},
				768: {
				  slidesPerView: 2,
				},
				576: {
				  slidesPerView: 1.5,
				},
			},
		});
	}
    
	if(jQuery('.categorie-swiper').length > 0){
		var swiper4 = createSwiper('.categorie-swiper', {
			speed: 1500,
			parallax: true,
			slidesPerView: "auto",
			spaceBetween: 0,
			loop:true,
		});
	}
	
	if(jQuery('.recomanded-swiper').length > 0){
		var swiperGetStarted = createSwiper('.recomanded-swiper', {
			speed: 500,
			parallax: true,
			slidesPerView: 'auto',
			spaceBetween: 20,
			loop: false,
			navigation: {
				nextEl: '.swiper-btn-next',
				prevEl: '.swiper-btn-prev',
            },
			pagination: {
                el: ".swiper-pagination",
                clickable: true,
			},
		});
	}
	
	// Team Swiper
	if(jQuery('.demo-swiper').length > 0){
		var swiper4 = createSwiper('.demo-swiper', {
			speed: 1500,
			parallax: true,
			slidesPerView: "auto",
			spaceBetween: 0,
			autoplay: true,
			loop:false,
            navigation: {
				nextEl: '.swiper-btn-next',
				prevEl: '.swiper-btn-prev',
            },
			pagination: {
                el: ".swiper-pagination",
                clickable: true,
			},
		});
	}
	
	if(jQuery('.offer-swiper').length > 0){
		var swiperGetStarted = createSwiper('.offer-swiper', {
			speed: 500,
			parallax: true,
			slidesPerView: 'auto',
			spaceBetween: 20,
			loop: false,
		});
	}
	
	if(jQuery('.team-swiper-4').length > 0){
		var swiper4 = createSwiper('.team-swiper-4', {
			speed: 1500,
			parallax: true,
			slidesPerView: "auto",
			spaceBetween: 10,
			loop:false,
		});
	}
	
	//Ecommerce Swiper ===
	if(jQuery('.ecommerce-swiper1').length > 0){
		var swiperRecomandSwiper = createSwiper('.ecommerce-swiper1', {
			speed: 500,
			parallax: true,
			slidesPerView: 1.2,
			spaceBetween: 10,
            centeredSlides: true,
			loop: true,
			navigation: {
				nextEl: '.swiper-btn-next',
				prevEl: '.swiper-btn-prev',
            },
			pagination: {
                el: ".swiper-pagination",
                clickable: true,
			},
		});
	}
	
	//Milk Swiper ===
	if(jQuery('.milk-swiper').length > 0){
		var swiperRecomandSwiper = createSwiper('.milk-swiper', {
			speed: 500,
			parallax: true,
			slidesPerView: 1,
			spaceBetween: 0,
            centeredSlides: true,
			loop: true,
			navigation: {
				nextEl: '.swiper-btn-next',
				prevEl: '.swiper-btn-prev',
            },
			pagination: {
                el: ".swiper-pagination",
                clickable: true,
			},
		});
	}
	
	//Milk Swiper ===
	if(jQuery('.milk-swiper2').length > 0){
		var swiperRecomandSwiper = createSwiper('.milk-swiper2', {
			speed: 500,
			parallax: true,
			slidesPerView: 1,
			spaceBetween: 0,
            centeredSlides: true,
			loop: false,
			navigation: {
				nextEl: '.swiper-btn-next',
				prevEl: '.swiper-btn-prev',
            },
			pagination: {
                el: ".swiper-pagination",
                clickable: true,
			},
		});
	}
	
	
	
	//Fruit Swiper ===
	if(jQuery('.fruit-swiper').length > 0){
		var swiperRecomandSwiper = createSwiper('.fruit-swiper', {
			speed: 500,
			parallax: true,
			slidesPerView: 1.2,
			spaceBetween: 12,
            centeredSlides: true,
			loop: true,
			navigation: {
				nextEl: '.swiper-btn-next',
				prevEl: '.swiper-btn-prev',
            },
			pagination: {
                el: ".swiper-pagination",
                clickable: true,
			},
		});
	}
	
	//Fruit Swiper2 ===
	if(jQuery('.fruit-swiper2').length > 0){
		var swiperRecomandSwiper = createSwiper('.fruit-swiper2', {
			speed: 500,
			parallax: true,
			slidesPerView: 1,
			spaceBetween: 0,
            centeredSlides: true,
			loop: false,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
            },
			pagination: {
                el: ".swiper-pagination",
                clickable: true,
			},
		});
	}
	
	//Meat Swiper ===
	if(jQuery('.meat-swiper').length > 0){
		var swiperMeatSwiper = createSwiper('.meat-swiper',{
			speed: 500,
			parallax: true,
			slidesPerView: 'auto',
			spaceBetween: 0,
			loop: false,
			autoplay: {
				delay: 2000,
			},
			navigation: {
				nextEl: '.meat-swiper-button-next',
				prevEl: '.meat-swiper-button-prev',
            },
			pagination: {
                el: ".meat-swiper-pagination",
                clickable: true,
			},
		});
	}
	
	if(jQuery('.product-swiper').length > 0){
		var swiperRecomandSwiper = createSwiper('.product-swiper', {
			speed: 500,
			parallax: true,
			slidesPerView: 'auto',
			spaceBetween: 0,
			loop: false,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
            },
			pagination: {
                el: ".swiper-pagination",
                clickable: true,
			},
		});
	}
	
	if(jQuery('.item-swiper').length > 0){
		var swiper4 = createSwiper('.item-swiper', {
			speed: 1500,
			parallax: true,
			slidesPerView: "auto",
			spaceBetween: 10,
			loop:false,
		});
	}
	
	if(jQuery('.item-swiper2').length > 0){
		var swiper = createSwiper(".item-swiper2", {
			direction: "vertical",
			loop: false,
			slidesPerView: 'auto',
			spaceBetween: 0,
			freeMode: true,
			watchSlidesProgress: true,
		});
		var swiper2 = createSwiper(".item-swiper3", {
			loop: true,
			spaceBetween: 0,
			thumbs: {
			  swiper: swiper,
			},
		});
	}
	
	//Restaurant Swiper ====
	if(jQuery('.offer-swiper1').length > 0){
		var swiperRecomandSwiper = createSwiper('.offer-swiper1', {
			speed: 500,
			parallax: true,
			slidesPerView: 'auto',
			spaceBetween: 0,
			loop: false,
		});
	}
	
	//Offer Swiper ====
	if(jQuery('.offer-swiper2').length > 0){
		var swiperRecomandSwiper = createSwiper('.offer-swiper2', {
			speed: 500,
			parallax: true,
			slidesPerView: 'auto',
			spaceBetween: 0,
			loop: false,
		});
	}
	
	// Welcome page Work Strat ======
	//Package swiper ===
	if(jQuery('.package-swiper').length > 0){
		var swiperRecomandSwiper = createSwiper('.package-swiper', {
			speed: 500,
			parallax: true,
			slidesPerView: 'auto',
			spaceBetween: 0,
			loop: false,
		});
	}
	
	//Client swiper ===
	if(jQuery('.client-swiper').length > 0){
		var swiperRecomandSwiper = createSwiper('.client-swiper', {
			speed: 500,
			parallax: true,
			slidesPerView: 'auto',
			spaceBetween: 0,
			loop: false,
		});
	} 
    return instances;
  }
  return { init: init };
})();
jQuery(document).ready(function () { window.VMenuCarousels.init(); });
/* Document .ready END */
