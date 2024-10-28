/***********************************************
 * WIDGET: CONTENT SLIDER
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof Swiper === 'undefined') {
		return;
	}

	PTFJS.contentSlider = {
		init: function () {

			$('.ptf-content-slider').each(function () {

				var $this = $(this),
					anchor = $this.data('navigation-anchor'),
					gap = $this.data('gap') || 0,
					loop = $this.data('loop') || false,
					speed = $this.data('speed') || 1000,
					autoplay = $this.data('autoplay') ? true : false,
					centered = $this.data('slides-centered') ? true : false,
					freemode = $this.data('free-mode') ? true : false,
					slider_offset = $this.data('slider-offset') ? true : false,
					mousewheel = $this.data('mousewheel') ? true : false,
					autoplay_speed = $this.data('autoplay-speed'),
					settings = $this.data('slide-settings');

				var swiper = new Swiper(this, {
					init: false,
					spaceBetween: gap,
					grabCursor: true,
					initialSlide: settings.initial_slide ? settings.initial_slide : 0,
					loop: loop,
					speed: speed,
					centeredSlides: centered,
					freeMode: freemode,
					mousewheel: mousewheel,
					autoplay: autoplay ? {
						delay: autoplay_speed,
						disableOnInteraction: false
					} : false,
					autoHeight: true,
					slidesOffsetBefore: 100,
					slidesOffsetBefore: slider_offset ? $('.container').get(0).getBoundingClientRect().left + 15 : false,
					slidesOffsetAfter: slider_offset ? $('.container').get(0).getBoundingClientRect().left + 15 : false,
					navigation: {
						nextEl: $(anchor).find('.ptf-swiper-button-next'),
						prevEl: $(anchor).find('.ptf-swiper-button-prev'),
					},
					scrollbar: {
						el: $(anchor).find('.ptf-swiper-scrollbar')
					},
					pagination: {
						el: $(anchor).find('.ptf-swiper-pagination'),
						clickable: true
					},
					breakpoints: {
						// when window width is >= 576px
						576: {
							slidesPerView: settings.slides_to_show_mobile || settings.slides_to_show_tablet || settings.slides_to_show || 1,
							slidesPerGroup: settings.slides_to_scroll_mobile || settings.slides_to_scroll_tablet || settings.slides_to_scroll || 1,
						},
						// when window width is >= 768px
						768: {
							slidesPerView: settings.slides_to_show_tablet || settings.slides_to_show || 1,
							slidesPerGroup: settings.slides_to_scroll_tablet || settings.slides_to_scroll || 1,
						},
						// when window width is >= 992px
						992: {
							slidesPerView: settings.slides_to_show || 1,
							slidesPerGroup: settings.slides_to_scroll || 1,
						}
					}
				});

				swiper.init();

			});
		}
	}

	PTFJS.contentSlider.init();

})(jQuery);