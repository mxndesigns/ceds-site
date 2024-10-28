/***********************************************
 * WIDGET: NEWS SLIDER
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof Swiper === 'undefined') {
		return;
	}

	PTFJS.newsSlider = {
		init: function () {

			$('.ptf-news-slider').each(function () {

				var $this = $(this),
					anchor = $this.data('navigation-anchor');

				var swiper = new Swiper(this, {
					init: false,
					grabCursor: true,
					loop: true,
					speed: 1000,
					navigation: {
						nextEl: $(anchor).find('.ptf-swiper-button-next'),
						prevEl: $(anchor).find('.ptf-swiper-button-prev'),
					},
					scrollbar: {
						el: $(anchor).find('.ptf-swiper-scrollbar')
					},
					pagination: {
						el: $(anchor).find('.ptf-swiper-pagination'),
						clickable: false
					},
				});

				swiper.init();

			});
		}
	}

	PTFJS.newsSlider.init();

})(jQuery);