/***********************************************
* WIDGET: SHOWCASE 3
 ***********************************************/
(function ($) {

	'use strict';

// check if plugin defined
	if (typeof Swiper === 'undefined') {
		return;
	}

	PTFJS.showcase3 = {

		init: function () {

			var showcaseSlider = $('.ptf-showcase-3');

			showcaseSlider.each(function () {

				var currentSlider = $(this);

				var swiper = new Swiper(this, {
					init: false,
					loop: false,
					spaceBetween: 0,
					speed: 1000,
					resistance: true,
					resistanceRatio: 0.5,
					parallax: true,
					grabCursor: true,
					navigation: {
						nextEl: $(this).find('.ptf-swiper-button-next'),
						prevEl: $(this).find('.ptf-swiper-button-prev'),
					},
					pagination: {
						el: $(this).find('.ptf-swiper-pagination'),
						clickable: true
					}
				});

				swiper.on('init slideChange', function () {
					var current = swiper.realIndex + 1,
						total = currentSlider.find('.swiper-slide').not('.swiper-slide-duplicate').length;

					currentSlider.find('.ptf-swiper-fraction .current').text(current);
					currentSlider.find('.ptf-swiper-fraction .total').text(total);
				});

				PTFJS.window.on('load resize', function () {

					var highestBox = 0;

					currentSlider.find('.ptf-showcase-slide').each(function(){

						if ($(this).height() > highestBox) {
							highestBox = $(this).height();
						}

					});

					currentSlider.find('.ptf-showcase-slide').height(highestBox);

				});

				swiper.init();

			});

		}
	};

	PTFJS.showcase3.init();

})(jQuery);